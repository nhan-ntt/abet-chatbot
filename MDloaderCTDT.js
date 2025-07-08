import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. --- INITIALIZE CLIENTS ---
const pinecone = new PineconeClient({
    apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(process.env.PINECONE_PROD_INDEX_ABET);

const embedding = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004",
    apiKey: process.env.GEMINI_API_KEY,
});

// 2. --- FUNCTION TO EXTRACT ALL COURSES FROM JSON STRUCTURE ---
function extractAllCourses(curriculum) {
    const allCourses = [];
    
    // Process each knowledge block
    curriculum.khoi_kien_thuc.forEach(block => {
        const blockName = block.ten_khoi;
        
        // Process direct courses in the block
        if (block.hoc_phan) {
            block.hoc_phan.forEach(course => {
                if (course.lua_chon) {
                    // Handle multiple choice courses
                    course.lua_chon.forEach(choiceCourse => {
                        allCourses.push({
                            ...choiceCourse,
                            khoi_kien_thuc: blockName,
                            is_choice: true
                        });
                    });
                } else {
                    allCourses.push({
                        ...course,
                        khoi_kien_thuc: blockName
                    });
                }
            });
        }
        
        // Process courses in specialized groups
        if (block.cac_nhom_hoc_phan) {
            block.cac_nhom_hoc_phan.forEach(group => {
                const groupName = group.ten_nhom;
                
                // Process direct courses in group
                if (group.hoc_phan) {
                    group.hoc_phan.forEach(course => {
                        allCourses.push({
                            ...course,
                            khoi_kien_thuc: blockName,
                            nhom_hoc_phan: groupName
                        });
                    });
                }
                
                // Process specialization tracks
                if (group.dinh_huong) {
                    group.dinh_huong.forEach(track => {
                        const trackName = track.ten_dinh_huong;
                        track.hoc_phan.forEach(course => {
                            allCourses.push({
                                ...course,
                                khoi_kien_thuc: blockName,
                                nhom_hoc_phan: groupName,
                                dinh_huong: trackName
                            });
                        });
                    });
                }
                
                // Process sub-groups
                if (group.cac_nhom_con) {
                    group.cac_nhom_con.forEach(subGroup => {
                        const subGroupName = subGroup.ten_nhom_con;
                        if (subGroup.hoc_phan) {
                            subGroup.hoc_phan.forEach(course => {
                                allCourses.push({
                                    ...course,
                                    khoi_kien_thuc: blockName,
                                    nhom_hoc_phan: groupName,
                                    nhom_con: subGroupName
                                });
                            });
                        }
                    });
                }
                
                // Process thesis replacement courses
                if (group.thay_the_khoa_luan) {
                    if (group.thay_the_khoa_luan.hoc_phan_bat_buoc) {
                        allCourses.push({
                            ...group.thay_the_khoa_luan.hoc_phan_bat_buoc,
                            khoi_kien_thuc: blockName,
                            nhom_hoc_phan: groupName,
                            loai: 'thesis_replacement_required'
                        });
                    }
                }
            });
        }
    });
    
    return allCourses;
}

// 3. --- MAIN EXECUTION FUNCTION ---
async function main() {
    const filePath = join(__dirname, 'cntt.json');
    console.log(`Starting to process file: ${filePath}`);

    try {
        // Check if file exists
        if (!existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return;
        }

        // // Clear existing data from namespace
        // console.log('Clearing existing data from namespace...');
        // await pineconeIndex.namespace(process.env.PINECONE_PROD_NAMESPACE).deleteAll();
        // console.log('Namespace cleared successfully!');

        // Read and parse JSON file
        const jsonData = readFileSync(filePath, 'utf-8');
        const curriculum = JSON.parse(jsonData);
        
        // Extract all courses from the nested structure
        const allCourses = extractAllCourses(curriculum);
        
        console.log(`Found ${allCourses.length} courses in JSON file`);
        console.log(`Program name: ${curriculum.ten_chuong_trinh}`);

        // Process each course
        for (let i = 0; i < allCourses.length; i++) {
            const course = allCourses[i];
            
            try {
                // Extract course information
                const courseCode = course.ma_hoc_phan || `course-${i}`;
                const courseNameVi = course.ten_tieng_viet || 'Unknown Course';
                const courseNameEn = course.ten_tieng_anh || '';
                const credits = course.so_tin_chi || 0;
                const prerequisites = course.mon_hoc_tien_quyet ? course.mon_hoc_tien_quyet.join(', ') : 'None';
                const knowledgeBlock = course.khoi_kien_thuc || '';
                const courseGroup = course.nhom_hoc_phan || '';
                const specialization = course.dinh_huong || '';
                
                // Skip courses without course code
                if (!courseCode) {
                    console.warn(`Skipping course without code: ${courseNameVi}`);
                    continue;
                }

                // Create text content for embedding
                const textToEmbed = `Course: ${courseNameVi}
English Name: ${courseNameEn}
Code: ${courseCode}
Credits: ${credits}
Prerequisites: ${prerequisites}
Knowledge Block: ${knowledgeBlock}
Course Group: ${courseGroup}
Specialization: ${specialization}`;

                console.log(`Processing course ${i + 1}/${allCourses.length}: ${courseCode} - ${courseNameVi}`);

                // Generate embedding
                const vector = await embedding.embedQuery(textToEmbed);

                // Upload to Pinecone
                await pineconeIndex.namespace(process.env.PINECONE_PROD_NAMESPACE).upsert([
                    {
                        id: courseCode,
                        values: vector,
                        metadata: {
                            code: courseCode,
                            name_vi: courseNameVi,
                            name_en: courseNameEn,
                            credits: parseInt(credits, 10) || 0,
                            prerequisites: prerequisites,
                            knowledge_block: knowledgeBlock,
                            course_group: courseGroup,
                            specialization: specialization,
                            text: textToEmbed,
                            source: 'CNTT Curriculum'
                        }
                    }
                ]);

                console.log(`Successfully uploaded: ${courseCode}`);
                
            } catch (error) {
                console.error(`Error processing course ${i}:`, error);
            }
        }

        console.log(`\nCompleted! Processed ${allCourses.length} courses successfully.`);
        
    } catch (error) {
        console.error('Error in main execution:', error);
    }
}

// Execute main function
main().catch(error => {
    console.error('Fatal error occurred:', error);
    process.exit(1);
});
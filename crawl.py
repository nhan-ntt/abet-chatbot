import re
import requests
from bs4 import BeautifulSoup
import time
from urllib.parse import urljoin, urlparse

def extract_urls_from_line(line):
    """Extract URLs from markdown line format"""
    url_pattern = r'\[.*?\]\((https?://[^\)]+)\)'
    matches = re.findall(url_pattern, line)
    return matches

def fetch_content_from_url(url):
    """Fetch content from URL using the 'block-content' class"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        print(f"Fetching: {url}")
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        block_content_elements = soup.find_all(class_='block-content')
        
        if block_content_elements:
            contents = []
            for element in block_content_elements:
                content = element.get_text(strip=True, separator='\n')
                if content.strip():  # Only add non-empty content
                    contents.append(content)
            
            if contents:
                return '\n\n'.join(contents)
            else:
                return f"[Error: Found {len(block_content_elements)} 'block-content' elements but all were empty for {url}]"
        else:
            return f"[Error: Could not find any elements with class 'block-content' for {url}]"
            
    except requests.exceptions.RequestException as e:
        return f"[Error fetching {url}: {str(e)}]"
    except Exception as e:
        return f"[Error processing {url}: {str(e)}]"

def process_markdown_file(input_file, output_file):
    """Process the markdown file and create output with fetched content"""
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found.")
        return
    except Exception as e:
        print(f"Error reading file: {e}")
        return
    
    output_lines = []
    
    for i, line in enumerate(lines, 1):
        output_lines.append(line.rstrip('\n'))
        
        urls = extract_urls_from_line(line)
        
        if urls:
            print(f"Processing line {i}: Found {len(urls)} URL(s)")
            
            for url in urls:
                content = fetch_content_from_url(url)
                
                output_lines.append("")
                output_lines.append(content)
                output_lines.append("")
                
                time.sleep(1)
        else:
            print(f"Line {i}: No URLs found")
    
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(output_lines))
        print(f"✓ Output written to '{output_file}'")
    except Exception as e:
        print(f"Error writing output file: {e}")

if __name__ == "__main__":
    input_file = "extracted_links.md"
    output_file = "abet.md"
    
    print("Starting URL content extraction...")
    process_markdown_file(input_file, output_file)
    print("Process completed!")

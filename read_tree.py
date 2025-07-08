from bs4 import BeautifulSoup

def extract_links_with_levels(html_file_path):
    """
    Extract all <a> tags and their nesting levels from an HTML file
    with nested <ul> and <li> structures.
    
    Args:
        html_file_path (str): Path to the HTML file
    
    Returns:
        list: List of tuples containing (link_text, href, level)
    """
    with open(html_file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    root_ul = soup.find('ul')
    
    if not root_ul:
        print("No <ul> found in the HTML file")
        return []
    
    links_with_levels = []
    
    def traverse_ul(ul_element, level=0):
        """
        Recursively traverse nested ul/li structure
        
        Args:
            ul_element: BeautifulSoup ul element
            level (int): Current nesting level (0-based)
        """
        li_elements = ul_element.find_all('li', recursive=False)
        
        for li in li_elements:
            a_tag = li.find('a', recursive=False)
            
            if a_tag:
                link_text = a_tag.get_text(strip=True)
                link_text = ' '.join(link_text.split())
                href = a_tag.get('href', '')
                
                links_with_levels.append((link_text, href, level))
            
            nested_ul = li.find('ul', recursive=False)
            if nested_ul:
                traverse_ul(nested_ul, level + 1)
    
    traverse_ul(root_ul)
    
    return links_with_levels

def save_to_markdown(links_with_levels, output_file='output.md'):
    """
    Save the extracted links to a Markdown file
    Level is represented as number of '#' characters
    Links are in [text](url) format
    
    Args:
        links_with_levels (list): List of tuples containing (link_text, href, level)
        output_file (str): Path to the output Markdown file
    """
    if not links_with_levels:
        print("No links found to save.")
        return
    
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            for link_text, href, level in links_with_levels:
                heading_level = '#' * (level + 1)
                
                if href:
                    markdown_link = f"[{link_text}]({href})"
                else:
                    markdown_link = link_text  # If no href, just display text

                f.write(f"{heading_level} {markdown_link}\n\n")
        
        print(f"Results saved to '{output_file}'")
        print(f"Found {len(links_with_levels)} links")
        
    except Exception as e:
        print(f"Error saving to file: {e}")

def print_results(links_with_levels):
    """
    Print the extracted links in a formatted way (console output)
    
    Args:
        links_with_levels (list): List of tuples containing (link_text, href, level)
    """
    if not links_with_levels:
        print("No links found.")
        return
    
    print(f"Found {len(links_with_levels)} links:")
    print("-" * 60)
    
    for link_text, href, level in links_with_levels:
        indent = "  " * level
        print(f"{indent}Level {level}: {link_text}")
        if href:
            print(f"{indent}         URL: {href}")
        print()

if __name__ == "__main__":
    html_file = 'input.html'
    
    try:
        results = extract_links_with_levels(html_file)
        
        print_results(results)
        
        save_to_markdown(results, 'extracted_links.md')
        
        print("\nRaw data:")
        for link_text, href, level in results:
            print(f"Text: '{link_text}', URL: '{href}', Level: {level}")
            
    except FileNotFoundError:
        print(f"Error: File '{html_file}' not found.")
    except Exception as e:
        print(f"Error: {e}")

def extract_and_save_to_md(html_file_path, output_md_file='output.md'):
    """
    Extract links from HTML and save directly to Markdown file
    
    Args:
        html_file_path (str): Path to the HTML file
        output_md_file (str): Path to the output Markdown file
    """
    try:
        results = extract_links_with_levels(html_file_path)
        save_to_markdown(results, output_md_file)
        return results
    except Exception as e:
        print(f"Error: {e}")
        return []

def get_links_by_level(html_file_path, target_level):
    """
    Get all links at a specific nesting level
    
    Args:
        html_file_path (str): Path to the HTML file
        target_level (int): The specific level to extract (0-based)
    
    Returns:
        list: List of tuples containing (link_text, href) for the specified level
    """
    all_links = extract_links_with_levels(html_file_path)
    return [(text, href) for text, href, level in all_links if level == target_level]

def get_max_depth(html_file_path):
    """
    Get the maximum nesting depth of the HTML structure
    
    Args:
        html_file_path (str): Path to the HTML file
    
    Returns:
        int: Maximum nesting depth
    """
    all_links = extract_links_with_levels(html_file_path)
    return max(level for _, _, level in all_links) if all_links else 0
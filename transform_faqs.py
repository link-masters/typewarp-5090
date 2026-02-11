import os
import re

directory = '/Users/mac/cursed-app/src/content/tools/'

def transform_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the FAQ section
    # Looking for ## Frequently Asked Questions... up to the next ## heading or end of file
    faq_match = re.search(r'(## Frequently Asked Questions.*?\n)(.*?)(?=\n## |$)', content, re.DOTALL)
    
    if faq_match:
        full_match = faq_match.group(0)
        header = faq_match.group(1)
        faq_body = faq_match.group(2)
        
        # Parse individual FAQs
        # Pattern: ### Q\d+: [Question]\n\nA: [Answer]
        # We need to be careful with newlines and formatting
        items = re.findall(r'### (?:Q\d+: )?(.*?)\n\s*A: (.*?)(?=\n### |$)', faq_body, re.DOTALL)
        
        if items:
            new_faq_section = "<FAQ>\n"
            for q, a in items:
                # Clean up the question and answer
                q_clean = q.strip().replace('"', '&quot;')
                a_clean = a.strip()
                new_faq_section += f'<FAQItem q="{q_clean}">\n\n{a_clean}\n\n</FAQItem>\n'
            new_faq_section += "</FAQ>"
            
            # Replace the old body with the new section
            # Keep the header simple
            final_content = content.replace(full_match, "## Frequently Asked Questions\n\n" + new_faq_section + "\n")
            
            with open(filepath, 'w') as f:
                f.write(final_content)
            return True
    return False

count = 0
for filename in os.listdir(directory):
    if filename.endswith('.mdx'):
        if transform_file(os.path.join(directory, filename)):
            count += 1

print(f"Transformed {count} files.")

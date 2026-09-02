import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace any occurrence of:
#           <button 
#             onClick={() => {
#           <button 
#             onClick={() => {
# with empty string
content = re.sub(r'          <button \n            onClick=\{\(\) => \{\n          <button \n            onClick=\{\(\) => \{\n', '', content)

with open("src/App.tsx", "w") as f:
    f.write(content)

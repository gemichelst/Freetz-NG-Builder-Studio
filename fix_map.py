import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace(match):
    return """                            ))}
                          </div>
                        </div>
                      );
                    })}"""

pattern = re.compile(r'                            \}\)\)\}\s*</div>\s*</div>\s*</div>\s*</div>\s*\);\s*\}\)\}')
content = pattern.sub(replace, content)

with open("src/App.tsx", "w") as f:
    f.write(content)

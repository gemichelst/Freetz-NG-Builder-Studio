import re

with open("src/App.tsx", "r") as f:
    content = f.read()

bad = """                </div>
        ) : viewHistory ? ("""

good = """                </div>
              </div>
            ))
          )
        ) : viewHistory ? ("""

content = content.replace(bad, good)

with open("src/App.tsx", "w") as f:
    f.write(content)

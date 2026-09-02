with open("src/App.tsx", "r") as f:
    content = f.read()

bad = """                ))}
              </div>
      </div>
    </div>
    </div>
  );
})}"""

good = """                ))}
              </div>
            </div>
          );
        })}"""

content = content.replace(bad, good)

with open("src/App.tsx", "w") as f:
    f.write(content)

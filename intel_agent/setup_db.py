import sqlite3
conn = sqlite3.connect('intel.db')
cur = conn.cursor()
cur.execute('''CREATE TABLE IF NOT EXISTS site_history 
               (url TEXT, content TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
conn.commit()
conn.close()
print("Database initialized.")

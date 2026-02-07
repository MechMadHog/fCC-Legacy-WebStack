# 🧱 Learn Bash by Building a Boilerplate

This section introduces core Bash and Unix terminal commands by constructing a simple website boilerplate entirely from the command line.  
Each command includes **what it is short for**, to reinforce meaning and recall.

---

## 🧭 Orientation & Visibility

Understand where you are and what exists around you.

### 📍 `pwd` — *Print Working Directory*
Displays the full path of the current directory.

### 📂 `ls` — *List*
Lists files and folders in the current directory.

- `ls -l` — *long listing format*
- `ls -a` — *all files (including hidden)*
- `ls --help` — *command usage*

### 🧹 `clear` — *Clear screen*
Clears the visible terminal output.

---

## 🚶 Navigation

Move through the filesystem.

### 🔀 `cd` — *Change Directory*
Moves the shell into another directory.

- `cd foldername`
- `cd ..` — *parent directory*
- `cd ~` — *home directory*
- `cd /` — *root directory*

---

## ✍️ File Creation & Output

Create files and write content.

### 🆕 `touch` — *Create empty file*
Originally used to **update file timestamps**, now commonly used to create files.

### 🗣️ `echo` — *Echo text*
Outputs text to the terminal or redirects it to a file.

- `>` — *redirect (overwrite)*
- `>>` — *redirect (append)*

### 📖 `more` — *Paginated file viewer*
Displays file contents one screen at a time.

---

## 🏗️ Directory Management

Create and remove folders.

### 📁 `mkdir` — *Make Directory*
Creates one or more directories.

- `-p` — *parents (create nested folders)*

### 🧱 `rmdir` — *Remove Directory*
Removes **empty** directories only.

---

## 🧰 File & Directory Manipulation

Copy, move, rename, and delete.

### 📄 `cp` — *Copy*
Copies files and directories.

- `-r` — *recursive (include subdirectories)*

### 🔁 `mv` — *Move*
Moves or renames files and directories.

- Renaming is just moving to a new name.

### ❌ `rm` — *Remove*
Deletes files and directories.

- `-r` — *recursive*
- `-f` — *force (no confirmation)*

---

## 🔍 Searching

Locate files and folders.

### 🕵️ `find` — *Find*
Searches through directories for files matching criteria.

- `-name` — *match filename*
- `-type f` — *file*
- `-type d` — *directory*

---

## 🆘 Help & Exit

Get help and end sessions.

### ℹ️ `--help` — *Help flag*
Displays usage information for most commands.

### 🚪 `exit` — *Exit shell*
Closes the current terminal session.

---

## 🧠 Conceptual Flow (Mental Model)

Bash commands build on each other. Each layer assumes you understand the previous one.

---

### 1️⃣ Observe the System (Awareness)
Before acting, you need visibility.

- `pwd` — where am I?
- `ls` — what exists here?
- `ls -l` — what *kind* of things are these?
- `clear` — reduce noise

🧠 *Rule:* never move or delete what you haven’t looked at.

---

### 2️⃣ Navigate the Filesystem (Positioning)
You can only act where you are.

- `cd` — change your working context
- `cd ..` — step back up
- `cd ~` — return to home

🧠 *Rule:* location determines consequence.

---

### 3️⃣ Create Structure (Scaffolding)
Before content, you create containers.

- `mkdir` — define structure
- `mkdir -p` — define hierarchy
- `touch` — reserve filenames

🧠 *Rule:* structure first, content second.

---

### 4️⃣ Add or Inspect Content (Verification)
Once things exist, you check and read them.

- `echo` — generate content
- `>` / `>>` — control where content goes
- `more` — inspect safely

🧠 *Rule:* verify before organising.

---

### 5️⃣ Organise and Re-organise (Control)
This is where **`mv` lives**.

- `mv` — reposition **or rename**
- `cp` — duplicate without risk
- `find` — locate before acting

🧠 *Key insight:*  
In Unix, **renaming *is* moving**.  
There is no separate “rename” command because the file never changes — only its **path** does.

🧠 *Rule:* organisation is path management.

---

### 6️⃣ Validate the Outcome (Confirmation)
After changes, you re-check reality.

- `ls`
- `pwd`
- `find`

🧠 *Rule:* assume nothing — confirm everything.

---

### 7️⃣ Remove What No Longer Belongs (Destruction)
Only after structure and verification.

- `rm` — remove files
- `rm -r` — remove trees
- `rmdir` — remove empty structure

🧠 *Rule:* deletion is irreversible — be deliberate.

---

### 8️⃣ Exit the Context (Closure)
When the session’s work is done.

- `exit`

🧠 *Rule:* leave the environment clean.

---

### 🧩 Where `mv` Fits Conceptually

`mv` is not “just renaming”.

It is:
- moving **within** a structure
- redefining **identity via location**
- correcting mistakes without duplication

If `cp` is *forking reality*,  
`mv` is *rewriting history*.

---

## 🚀 Teleportation & Remote Creation (Path-Based Thinking)

One of the most important mental shifts in Bash is realising that **you do not need to be “in” a directory to operate on it**.

Commands act on **paths**, not places.

---

### 🧠 Files Don’t Move — Paths Change

When you run:

```bash
mv images/footer.jpeg client/assets/images/

Knowing *what the command stands for* makes Bash feel less like magic and more like a readable language.

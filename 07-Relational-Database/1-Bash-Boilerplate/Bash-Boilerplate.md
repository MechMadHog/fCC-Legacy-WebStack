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

## 🧠 Conceptual Flow

1. 👀 **See** → `pwd`, `ls`
2. 🧭 **Move** → `cd`
3. 🛠️ **Create** → `mkdir`, `touch`, `echo`
4. 🔎 **Inspect** → `ls -l`, `more`
5. 🗂️ **Organise** → `cp`, `mv`
6. 🔍 **Search** → `find`
7. 🧨 **Clean up** → `rm`, `rmdir`
8. 🚪 **Exit** → `exit`

---

Knowing *what the command stands for* makes Bash feel less like magic and more like a readable language.

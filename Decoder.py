import tkinter as tk
from tkinter import filedialog, messagebox

PI_DIGITS = "314159265358979323846264338327950288419716939937510"
CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|,:;.-_ /"


def pi_decrypt(encrypted_text):
    output = ""

    for i, char in enumerate(encrypted_text):
        if char not in CHARS:
            output += char
            continue

        index = CHARS.index(char)
        shift = int(PI_DIGITS[i % len(PI_DIGITS)])
        output += CHARS[(index - shift + len(CHARS)) % len(CHARS)]

    return output


def extract_mathcheck(text):
    for line in text.splitlines():
        if line.strip().upper().startswith("MATHCHECK:"):
            return line.split(":", 1)[1].strip()
    return text.strip()


def decode_mathcheck(raw_text):
    encrypted = extract_mathcheck(raw_text)
    decrypted = pi_decrypt(encrypted)
    parts = decrypted.split("|")

    if len(parts) != 4:
        return None, decrypted

    version, date, time, compact = parts
    answers = compact.split(",")

    lines = []
    lines.append("Decoded Math Trainer Result")
    lines.append("===========================")
    lines.append("")
    lines.append(f"Version: {version}")
    lines.append(f"Date: {date}")
    lines.append(f"Time: {time}")
    lines.append("")
    lines.append("Answers:")

    for i, answer in enumerate(answers, start=1):
        result = "yes" if answer == "1" else "no"
        lines.append(f"Question {i}: {result}")

    lines.append("")
    lines.append("Raw decoded line:")
    lines.append(decrypted)

    return "\n".join(lines), decrypted


class TeacherDecryptApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Teacher Decrypt Tool")
        self.root.geometry("760x620")
        self.root.minsize(700, 560)
        self.root.configure(bg="#f1f5f9")

        title = tk.Label(
            root,
            text="Teacher Decrypt Tool",
            font=("Arial", 24, "bold"),
            bg="#f1f5f9",
            fg="#0f172a",
        )
        title.pack(pady=(25, 5))

        subtitle = tk.Label(
            root,
            text="Open a student's result text file or paste the MATHCHECK line.",
            font=("Arial", 12),
            bg="#f1f5f9",
            fg="#475569",
        )
        subtitle.pack(pady=(0, 20))

        button_frame = tk.Frame(root, bg="#f1f5f9")
        button_frame.pack(pady=5)

        open_button = tk.Button(
            button_frame,
            text="Open result file",
            command=self.open_file,
            font=("Arial", 12, "bold"),
            bg="#2563eb",
            fg="white",
            padx=18,
            pady=10,
            relief="flat",
        )
        open_button.grid(row=0, column=0, padx=8)

        decode_button = tk.Button(
            button_frame,
            text="Decode pasted text",
            command=self.decode_pasted_text,
            font=("Arial", 12, "bold"),
            bg="#0f172a",
            fg="white",
            padx=18,
            pady=10,
            relief="flat",
        )
        decode_button.grid(row=0, column=1, padx=8)

        input_label = tk.Label(
            root,
            text="Input",
            font=("Arial", 13, "bold"),
            bg="#f1f5f9",
            fg="#0f172a",
        )
        input_label.pack(anchor="w", padx=45, pady=(18, 5))

        self.input_text = tk.Text(root, height=7, font=("Consolas", 11), wrap="word")
        self.input_text.pack(fill="x", padx=45)

        output_label = tk.Label(
            root,
            text="Decoded result",
            font=("Arial", 13, "bold"),
            bg="#f1f5f9",
            fg="#0f172a",
        )
        output_label.pack(anchor="w", padx=45, pady=(18, 5))

        self.output_text = tk.Text(root, height=14, font=("Consolas", 11), wrap="word")
        self.output_text.pack(fill="both", expand=True, padx=45, pady=(0, 25))

    def open_file(self):
        path = filedialog.askopenfilename(
            title="Open result file",
            filetypes=[("Text files", "*.txt"), ("All files", "*.*")],
        )

        if not path:
            return

        try:
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
        except Exception as error:
            messagebox.showerror("Error", f"Could not read file.\n\n{error}")
            return

        self.input_text.delete("1.0", tk.END)
        self.input_text.insert(tk.END, content)
        self.decode_text(content)

    def decode_pasted_text(self):
        content = self.input_text.get("1.0", tk.END).strip()
        if not content:
            messagebox.showinfo("No input", "Please paste a MATHCHECK line or open a result file.")
            return
        self.decode_text(content)

    def decode_text(self, content):
        decoded, raw = decode_mathcheck(content)

        self.output_text.delete("1.0", tk.END)

        if decoded is None:
            self.output_text.insert(tk.END, "Could not decode this result.\n\n")
            self.output_text.insert(tk.END, "Raw attempt:\n")
            self.output_text.insert(tk.END, raw)
            return

        self.output_text.insert(tk.END, decoded)


if __name__ == "__main__":
    root = tk.Tk()
    app = TeacherDecryptApp(root)
    root.mainloop()

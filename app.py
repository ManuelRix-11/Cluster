# Quiz App — customtkinter  (UI migliorata)
# Dipendenza: pip install customtkinter Pillow
# Impacchettamento .exe: pip install pyinstaller && pyinstaller --onefile --windowed app.py

import json
import os
import math
import customtkinter as ctk
from tkinter import filedialog, messagebox

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")

QUIZ_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "quiz.json")

# ── Palette ───────────────────────────────────────────────────────────────────
BG_DARK    = "#0F1117"
CARD_BG    = "#1A1D2E"
CARD_BG2   = "#222538"
ACCENT     = "#6C63FF"
ACCENT2    = "#FF6584"
TEXT       = "#EAEAEA"
TEXT_MUTED = "#7A7F9A"
SUCCESS    = "#43D98C"
ERROR      = "#FF5C6E"
BTN_HOVER  = "#7B73FF"
BTN_IDLE   = "#2E3150"


class ProgressBar(ctk.CTkCanvas):
    """Slim animated progress bar drawn on canvas."""
    def __init__(self, master, total, **kw):
        super().__init__(master, height=6, bg=CARD_BG, highlightthickness=0, **kw)
        self.total = total
        self._current = 0
        self.bind("<Configure>", lambda _: self._draw())

    def set(self, value):
        self._current = value
        self._draw()

    def _draw(self):
        self.delete("all")
        w = self.winfo_width()
        self.create_rectangle(0, 0, w, 6, fill="#2A2D40", outline="")
        if self.total:
            fill_w = int(w * self._current / self.total)
            # gradient via two overlapping rects (simple approximation)
            self.create_rectangle(0, 0, fill_w, 6, fill=ACCENT, outline="")


class QuizApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("✦ Quiz App")
        self.geometry("720x560")
        self.resizable(False, False)
        self.configure(fg_color=BG_DARK)

        self.domande = []
        self.indice  = 0
        self.punteggio = 0

        self._build_ui()
        self._carica_auto()

    # ── Layout base ───────────────────────────────────────────────────────────

    def _build_ui(self):
        # ── Header strip ────────────────────────────────────────────────
        hdr = ctk.CTkFrame(self, fg_color=CARD_BG, corner_radius=0, height=52)
        hdr.pack(fill="x")
        hdr.pack_propagate(False)

        ctk.CTkLabel(
            hdr, text="✦  Quiz App",
            font=ctk.CTkFont("Segoe UI", 16, "bold"),
            text_color=ACCENT
        ).pack(side="left", padx=20)

        self.lbl_punteggio = ctk.CTkLabel(
            hdr, text="",
            font=ctk.CTkFont("Segoe UI", 13, "bold"),
            text_color=TEXT_MUTED
        )
        self.lbl_punteggio.pack(side="right", padx=20)

        # ── Progress bar ─────────────────────────────────────────────────
        self.progress = ProgressBar(self, total=1, width=720)
        self.progress.pack(fill="x")

        # ── Card centrale ─────────────────────────────────────────────────
        self.card = ctk.CTkFrame(
            self, fg_color=CARD_BG, corner_radius=20,
        )
        self.card.pack(fill="both", expand=True, padx=32, pady=20)

        # num domanda
        self.lbl_num = ctk.CTkLabel(
            self.card, text="",
            font=ctk.CTkFont("Segoe UI", 11),
            text_color=TEXT_MUTED
        )
        self.lbl_num.pack(anchor="nw", padx=24, pady=(18, 0))

        # domanda
        self.lbl_domanda = ctk.CTkLabel(
            self.card, text="", wraplength=620,
            font=ctk.CTkFont("Segoe UI", 20, "bold"),
            text_color=TEXT, justify="left", anchor="w"
        )
        self.lbl_domanda.pack(fill="x", padx=24, pady=(8, 20))

        # area risposte
        self.frame_risposte = ctk.CTkFrame(self.card, fg_color="transparent")
        self.frame_risposte.pack(fill="x", padx=24)

        # feedback
        self.lbl_feedback = ctk.CTkLabel(
            self.card, text="",
            font=ctk.CTkFont("Segoe UI", 14, "bold"),
            text_color=SUCCESS
        )
        self.lbl_feedback.pack(pady=(12, 0))

        # btn carica (solo schermata welcome)
        self.btn_carica = ctk.CTkButton(
            self.card, text="📂  Carica Quiz JSON",
            command=self._carica_da_file,
            width=220, height=46,
            font=ctk.CTkFont("Segoe UI", 14),
            fg_color=ACCENT, hover_color=BTN_HOVER,
            corner_radius=12
        )

    # ── Caricamento ───────────────────────────────────────────────────────────

    def _carica_auto(self):
        if os.path.exists(QUIZ_FILE):
            self._avvia(QUIZ_FILE)
        else:
            self.lbl_domanda.configure(
                text="Nessun quiz.json trovato.\nCarica un file manualmente.",
                text_color=TEXT_MUTED
            )
            self.btn_carica.pack(pady=16)

    def _carica_da_file(self):
        path = filedialog.askopenfilename(filetypes=[("JSON", "*.json")])
        if path:
            self._avvia(path)

    def _avvia(self, path):
        try:
            with open(path, encoding="utf-8") as f:
                self.domande = json.load(f)
            if not isinstance(self.domande, list) or not self.domande:
                raise ValueError("Il file JSON deve contenere un array non vuoto.")
        except Exception as e:
            messagebox.showerror("Errore", str(e))
            return
        self.indice = 0
        self.punteggio = 0
        self.progress.total = len(self.domande)
        self.btn_carica.pack_forget()
        self._mostra_domanda()

    # ── Quiz ──────────────────────────────────────────────────────────────────

    def _mostra_domanda(self):
        for w in self.frame_risposte.winfo_children():
            w.destroy()
        self.lbl_feedback.configure(text="")

        d = self.domande[self.indice]
        n, tot = self.indice + 1, len(self.domande)
        self.lbl_num.configure(text=f"Domanda  {n}  /  {tot}")
        self.lbl_punteggio.configure(text=f"⭐  {self.punteggio}  /  {tot}")
        self.lbl_domanda.configure(text=d["domanda"], text_color=TEXT)
        self.progress.set(self.indice)

        if "risposta1" in d:
            self._build_multipla(d)
        else:
            self._build_aperta(d)

    def _build_multipla(self, d):
        opzioni = [d["risposta1"], d["risposta2"], d["risposta3"], d["risposta4"]]
        labels  = ["A", "B", "C", "D"]
        for lbl, op in zip(labels, opzioni):
            row = ctk.CTkFrame(self.frame_risposte, fg_color=BTN_IDLE, corner_radius=12, height=48)
            row.pack(fill="x", pady=4)
            row.pack_propagate(False)

            ctk.CTkLabel(
                row, text=lbl,
                font=ctk.CTkFont("Segoe UI", 13, "bold"),
                text_color=ACCENT, width=32
            ).pack(side="left", padx=(14, 6))

            ctk.CTkLabel(
                row, text=op,
                font=ctk.CTkFont("Segoe UI", 13),
                text_color=TEXT, anchor="w"
            ).pack(side="left", fill="x", expand=True)

            # click sull'intera riga
            row.bind("<Button-1>", lambda _, o=op, c=d["corretta"], r=row: self._valuta_multipla(o, c))
            for child in row.winfo_children():
                child.bind("<Button-1>", lambda _, o=op, c=d["corretta"], r=row: self._valuta_multipla(o, c))
            row.bind("<Enter>", lambda _, r=row: r.configure(fg_color="#3A3E60"))
            row.bind("<Leave>", lambda _, r=row: r.configure(fg_color=BTN_IDLE))

    def _build_aperta(self, d):
        self._entry = ctk.CTkEntry(
            self.frame_risposte,
            placeholder_text="Scrivi la tua risposta…",
            width=560, height=46,
            font=ctk.CTkFont("Segoe UI", 14),
            border_color=ACCENT, border_width=2,
            fg_color=CARD_BG2, corner_radius=12
        )
        self._entry.pack(pady=(4, 8))
        self._entry.focus_set()
        self._entry.bind("<Return>", lambda _: self._valuta_aperta(d["risposta"]))

        ctk.CTkButton(
            self.frame_risposte, text="Conferma  →",
            width=180, height=44,
            font=ctk.CTkFont("Segoe UI", 14, "bold"),
            fg_color=ACCENT, hover_color=BTN_HOVER,
            corner_radius=12,
            command=lambda: self._valuta_aperta(d["risposta"])
        ).pack()

    def _valuta_multipla(self, scelta, corretta):
        ok = scelta.strip().lower() == corretta.strip().lower()
        self._flash_feedback(ok, corretta)

    def _valuta_aperta(self, corretta):
        scelta = self._entry.get().strip()
        if not scelta:
            return
        ok = scelta.lower() == corretta.strip().lower()
        self._flash_feedback(ok, corretta)

    def _flash_feedback(self, ok, corretta):
        for w in self.frame_risposte.winfo_children():
            try:
                w.configure(state="disabled")
            except Exception:
                pass

        if ok:
            self.punteggio += 1
            self.lbl_feedback.configure(text="✅  Corretto!", text_color=SUCCESS)
            self.card.configure(border_width=2, border_color=SUCCESS)
        else:
            self.lbl_feedback.configure(
                text=f"❌  Sbagliato — risposta: {corretta}", text_color=ERROR
            )
            self.card.configure(border_width=2, border_color=ERROR)

        self.lbl_punteggio.configure(text=f"⭐  {self.punteggio}  /  {len(self.domande)}")
        self.after(1500, self._avanza)

    def _avanza(self):
        self.card.configure(border_width=0)
        self.indice += 1
        if self.indice < len(self.domande):
            self._mostra_domanda()
        else:
            self._schermata_finale()

    def _schermata_finale(self):
        for w in self.frame_risposte.winfo_children():
            w.destroy()
        self.lbl_feedback.configure(text="")
        self.progress.set(len(self.domande))

        tot = len(self.domande)
        pct = self.punteggio / tot * 100

        self.lbl_num.configure(text="Quiz completato!")
        self.lbl_domanda.configure(
            text=f"Risultato finale: {self.punteggio} / {tot}  ({pct:.0f}%)",
            text_color=ACCENT
        )

        commento = "Ottimo lavoro! 🏆" if pct >= 70 else ("Quasi! Riprova 💪" if pct >= 40 else "Studia ancora un po' 📚")
        ctk.CTkLabel(
            self.frame_risposte, text=commento,
            font=ctk.CTkFont("Segoe UI", 15, "bold"),
            text_color="#FFD700"
        ).pack(pady=(0, 16))

        ctk.CTkButton(
            self.frame_risposte, text="🔄  Ricomincia",
            width=200, height=46,
            font=ctk.CTkFont("Segoe UI", 14),
            fg_color=ACCENT, hover_color=BTN_HOVER,
            corner_radius=12,
            command=self._ricomincia
        ).pack(pady=4)

        ctk.CTkButton(
            self.frame_risposte, text="📂  Carica altro quiz",
            width=200, height=46,
            font=ctk.CTkFont("Segoe UI", 14),
            fg_color=BTN_IDLE, hover_color="#3A3E60",
            corner_radius=12,
            command=self._carica_da_file
        ).pack(pady=4)

    def _ricomincia(self):
        self.indice = 0
        self.punteggio = 0
        self.card.configure(border_width=0)
        self._mostra_domanda()


if __name__ == "__main__":
    QuizApp().mainloop()

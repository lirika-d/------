const STORAGE_KEYS = {
  notes: "notes-app-notes",
  theme: "notes-app-theme",
  language: "notes-app-language"
};

const COLOR_OPTIONS = [
  { key: "white", className: "note-color--white" },
  { key: "yellow", className: "note-color--yellow" },
  { key: "green", className: "note-color--green" },
  { key: "blue", className: "note-color--blue" },
  { key: "pink", className: "note-color--pink" },
  { key: "lilac", className: "note-color--lilac" }
];

const TRANSLATIONS = {
  en: {
    appTitle: "Notes",
    switchLanguage: "Switch language",
    languageButton: "RU",
    themeToggle: "Toggle theme",
    noteTitlePlaceholder: "Take a note...",
    noteBodyPlaceholder: "Write your thoughts...",
    noteTitleAria: "Note title",
    noteBodyAria: "Note body",
    newNoteColorsAria: "Pick note color",
    saveNote: "Save Note",
    emptyTitle: "No notes found",
    emptyText: "Create a new note to get started.",
    editModalTitle: "Edit note",
    closeEditor: "Close editor",
    editTitlePlaceholder: "Title",
    editBodyPlaceholder: "Write something beautiful...",
    editColorsAria: "Change note color",
    saveChanges: "Save Changes",
    editNote: "Edit note",
    deleteNote: "Delete note",
    untitled: "Untitled",
    justNow: "Just now",
    minuteAgo: "min ago",
    hourAgo: "h ago",
    yesterday: "Yesterday",
    daysAgo: "days ago",
    colors: {
      white: "Ivory",
      yellow: "Honey",
      green: "Sage",
      blue: "Sky",
      pink: "Rose",
      lilac: "Lilac"
    }
  },
  ru: {
    appTitle: "Заметки",
    switchLanguage: "Сменить язык",
    languageButton: "EN",
    themeToggle: "Сменить тему",
    noteTitlePlaceholder: "Новая заметка...",
    noteBodyPlaceholder: "Запишите свои мысли...",
    noteTitleAria: "Заголовок заметки",
    noteBodyAria: "Текст заметки",
    newNoteColorsAria: "Выбрать цвет заметки",
    saveNote: "Сохранить",
    emptyTitle: "Заметок пока нет",
    emptyText: "Создайте новую заметку, чтобы начать.",
    editModalTitle: "Редактирование заметки",
    closeEditor: "Закрыть редактор",
    editTitlePlaceholder: "Заголовок",
    editBodyPlaceholder: "Напишите что-нибудь красивое...",
    editColorsAria: "Изменить цвет заметки",
    saveChanges: "Сохранить изменения",
    editNote: "Редактировать заметку",
    deleteNote: "Удалить заметку",
    untitled: "Без названия",
    justNow: "Только что",
    minuteAgo: "мин назад",
    hourAgo: "ч назад",
    yesterday: "Вчера",
    daysAgo: "дн. назад",
    colors: {
      white: "Белый",
      yellow: "Желтый",
      green: "Зеленый",
      blue: "Голубой",
      pink: "Розовый",
      lilac: "Сиреневый"
    }
  }
};

const initialLanguage = localStorage.getItem(STORAGE_KEYS.language) || "en";

const elements = {
  html: document.documentElement,
  body: document.body,
  notesGrid: document.getElementById("notes-grid"),
  emptyState: document.getElementById("empty-state"),
  brandName: document.querySelector(".brand__name"),
  noteForm: document.getElementById("note-form"),
  noteTitle: document.getElementById("note-title"),
  noteBody: document.getElementById("note-body"),
  newNoteColors: document.getElementById("new-note-colors"),
  editModal: document.getElementById("edit-modal"),
  editForm: document.getElementById("edit-form"),
  editTitle: document.getElementById("edit-title"),
  editBody: document.getElementById("edit-body"),
  editColors: document.getElementById("edit-note-colors"),
  editModalTitle: document.getElementById("edit-modal-title"),
  closeModalButton: document.querySelector("[data-close-modal][aria-label]"),
  languageToggle: document.querySelector(".language-toggle"),
  themeToggle: document.querySelector(".theme-toggle"),
  noteTemplate: document.getElementById("note-card-template"),
  saveNoteButton: document.querySelector("#note-form .save-note"),
  saveEditButton: document.querySelector("#edit-form .save-note"),
  emptyTitle: document.querySelector("#empty-state h2"),
  emptyText: document.querySelector("#empty-state p")
};

const state = {
  language: initialLanguage,
  notes: loadNotes(initialLanguage),
  theme: localStorage.getItem(STORAGE_KEYS.theme) || "light",
  searchQuery: "",
  draftColor: "white",
  editingId: null,
  editingColor: "white",
  composerExpanded: false
};

function createStarterNotes(language) {
  const isRussian = language === "ru";

  return [
    {
      id: crypto.randomUUID(),
      title: isRussian ? "Утренние размышления" : "Morning Reflections",
      body: isRussian
        ? "Свет из окна ложится длинными косыми полосами, касаясь пылинок в воздухе - будто маленьких планет, вращающихся сами по себе."
        : "The light through the window falls in long oblique shafts, touching the dust motes suspended mid-air - small planets in their own right, orbiting nothing.",
      color: "white",
      updatedAt: Date.now() - 1000 * 60 * 5
    },
    {
      id: crypto.randomUUID(),
      title: isRussian ? "К прочтению" : "To Read",
      body: "Middlemarch - George Eliot\nThe Brothers Karamazov\nEssays of Montaigne\nSebald, Rings of Saturn",
      color: "green",
      updatedAt: Date.now() - 1000 * 60 * 30
    },
    {
      id: crypto.randomUUID(),
      title: isRussian ? "О уединении" : "On Solitude",
      body: isRussian
        ? "Уединение - не одиночество. Это состояние, в котором человек слышит собственные мысли - не внешний шум, а тихий внутренний голос."
        : "Solitude is not loneliness. It is the condition in which one hears oneself think - not the noise one makes, but the quieter underneath.",
      color: "lilac",
      updatedAt: Date.now() - 1000 * 60 * 60 * 2
    },
    {
      id: crypto.randomUUID(),
      title: "",
      body: isRussian
        ? "Купить овсяное молоко, хлеб на закваске, выдержанный комте, инжир по сезону."
        : "Buy oat milk, sourdough, aged comte, figs if in season.",
      color: "yellow",
      updatedAt: Date.now() - 1000 * 60 * 60 * 6
    },
    {
      id: crypto.randomUUID(),
      title: isRussian ? "Идеи" : "Ideas",
      body: isRussian
        ? "Лампа из прессованных ботанических листьев.\nНабор шрифтов, напечатанный на велене.\nЕженедельные письма вместо сообщений."
        : "A lamp made of pressed botanicals.\nType specimen printed on vellum.\nWeekly letters instead of messages.",
      color: "pink",
      updatedAt: Date.now() - 1000 * 60 * 60 * 7
    }
  ];
}

function loadNotes(language) {
  const savedNotes = localStorage.getItem(STORAGE_KEYS.notes);

  if (!savedNotes) {
    return createStarterNotes(language);
  }

  try {
    const parsed = JSON.parse(savedNotes);
    if (!Array.isArray(parsed)) {
      return createStarterNotes(language);
    }

    return parsed.map((note) => ({
      id: note.id || crypto.randomUUID(),
      title: note.title || "",
      body: note.body || "",
      color: COLOR_OPTIONS.some((option) => option.key === note.color) ? note.color : "white",
      updatedAt: typeof note.updatedAt === "number" ? note.updatedAt : Date.now()
    }));
  } catch {
    return createStarterNotes(language);
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(state.notes));
}

function saveLanguage() {
  localStorage.setItem(STORAGE_KEYS.language, state.language);
}

function saveTheme() {
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);
}

function applyTheme() {
  elements.body.classList.toggle("dark-theme", state.theme === "dark");
}

function t(key) {
  return TRANSLATIONS[state.language][key];
}

function getColorLabel(colorKey) {
  return TRANSLATIONS[state.language].colors[colorKey];
}

function createColorPicker(container, selectedColor, onSelect) {
  container.innerHTML = "";

  COLOR_OPTIONS.forEach((option) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = `color-swatch ${option.className}`;
    swatch.dataset.color = option.key;
    swatch.title = getColorLabel(option.key);
    swatch.setAttribute("aria-label", getColorLabel(option.key));
    swatch.classList.toggle("is-selected", option.key === selectedColor);
    swatch.addEventListener("click", () => onSelect(option.key));
    container.appendChild(swatch);
  });
}

function updatePickerSelection(container, selectedColor) {
  container.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.classList.toggle("is-selected", swatch.dataset.color === selectedColor);
  });
}

function formatRelativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return t("justNow");
  }

  if (diff < hour) {
    const minutes = Math.round(diff / minute);
    return `${minutes} ${t("minuteAgo")}`;
  }

  if (diff < day) {
    const hours = Math.round(diff / hour);
    return `${hours} ${t("hourAgo")}`;
  }

  if (diff < day * 2) {
    return t("yesterday");
  }

  const days = Math.round(diff / day);
  return `${days} ${t("daysAgo")}`;
}

function getColorClass(color) {
  const match = COLOR_OPTIONS.find((option) => option.key === color);
  return match ? match.className : COLOR_OPTIONS[0].className;
}

function getFilteredNotes() {
  const query = state.searchQuery.trim().toLowerCase();

  return [...state.notes]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .filter((note) => {
      if (!query) {
        return true;
      }

      return `${note.title} ${note.body}`.toLowerCase().includes(query);
    });
}

function renderNotes() {
  const filteredNotes = getFilteredNotes();
  elements.notesGrid.innerHTML = "";

  filteredNotes.forEach((note, index) => {
    const fragment = elements.noteTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".note-card");
    const title = fragment.querySelector(".note-card__title");
    const body = fragment.querySelector(".note-card__body");
    const time = fragment.querySelector(".note-card__time");
    const editButton = fragment.querySelector(".note-edit");
    const deleteButton = fragment.querySelector(".note-delete");
    const palette = fragment.querySelector(".note-card__palette");

    card.dataset.id = note.id;
    card.classList.add(getColorClass(note.color));
    card.style.animationDelay = `${index * 40}ms`;

    title.textContent = note.title || t("untitled");
    body.textContent = note.body;
    time.textContent = formatRelativeTime(note.updatedAt);
    editButton.setAttribute("aria-label", t("editNote"));
    deleteButton.setAttribute("aria-label", t("deleteNote"));

    editButton.addEventListener("click", () => openEditModal(note.id));
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    createColorPicker(palette, note.color, (color) => changeNoteColor(note.id, color));
    elements.notesGrid.appendChild(fragment);
  });

  elements.emptyState.classList.toggle("hidden", filteredNotes.length > 0);
}

function resetComposer() {
  elements.noteForm.reset();
  state.draftColor = "white";
  state.composerExpanded = false;
  updateComposerState();
  updatePickerSelection(elements.newNoteColors, state.draftColor);
  applyLanguage();
}

function updateComposerState(forceExpand = false) {
  if (forceExpand) {
    state.composerExpanded = true;
  } else {
    state.composerExpanded = Boolean(
      elements.noteTitle.value.trim() || elements.noteBody.value.trim() || document.activeElement === elements.noteTitle || document.activeElement === elements.noteBody
    );
  }

  elements.noteForm.classList.toggle("is-expanded", state.composerExpanded);
}

function addNote(title, body) {
  state.notes.unshift({
    id: crypto.randomUUID(),
    title: title.trim(),
    body: body.trim(),
    color: state.draftColor,
    updatedAt: Date.now()
  });

  saveNotes();
  renderNotes();
  resetComposer();
}

function updateNote(id, updates) {
  state.notes = state.notes.map((note) => {
    if (note.id !== id) {
      return note;
    }

    return {
      ...note,
      ...updates,
      updatedAt: Date.now()
    };
  });

  saveNotes();
  renderNotes();
}

function deleteNote(id) {
  const card = elements.notesGrid.querySelector(`[data-id="${id}"]`);

  if (!card) {
    state.notes = state.notes.filter((note) => note.id !== id);
    saveNotes();
    renderNotes();
    return;
  }

  card.classList.add("is-removing");
  window.setTimeout(() => {
    state.notes = state.notes.filter((note) => note.id !== id);
    saveNotes();
    renderNotes();
  }, 220);
}

function changeNoteColor(id, color) {
  updateNote(id, { color });

  if (state.editingId === id) {
    state.editingColor = color;
    updatePickerSelection(elements.editColors, color);
  }
}

function openEditModal(id) {
  const note = state.notes.find((item) => item.id === id);
  if (!note) {
    return;
  }

  state.editingId = id;
  state.editingColor = note.color;
  elements.editTitle.value = note.title;
  elements.editBody.value = note.body;
  updatePickerSelection(elements.editColors, state.editingColor);
  elements.editModal.classList.remove("hidden");
  elements.editModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  elements.editTitle.focus();
}

function closeEditModal() {
  state.editingId = null;
  elements.editModal.classList.add("hidden");
  elements.editModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function handleCreateSubmit(event) {
  event.preventDefault();
  const title = elements.noteTitle.value.trim();
  const body = elements.noteBody.value.trim();

  if (!title && !body) {
    elements.noteTitle.focus();
    return;
  }

  addNote(title, body);
}

function handleEditSubmit(event) {
  event.preventDefault();

  if (!state.editingId) {
    return;
  }

  updateNote(state.editingId, {
    title: elements.editTitle.value.trim(),
    body: elements.editBody.value.trim(),
    color: state.editingColor
  });

  closeEditModal();
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  applyTheme();
  saveTheme();
}

function applyLanguage() {
  const languagePack = TRANSLATIONS[state.language];

  elements.html.lang = state.language;
  document.title = languagePack.appTitle;
  elements.brandName.textContent = languagePack.appTitle;
  elements.languageToggle.textContent = languagePack.languageButton;
  elements.languageToggle.setAttribute("aria-label", languagePack.switchLanguage);
  elements.themeToggle.setAttribute("aria-label", languagePack.themeToggle);
  elements.noteTitle.placeholder = languagePack.noteTitlePlaceholder;
  elements.noteBody.placeholder = languagePack.noteBodyPlaceholder;
  elements.noteTitle.setAttribute("aria-label", languagePack.noteTitleAria);
  elements.noteBody.setAttribute("aria-label", languagePack.noteBodyAria);
  elements.newNoteColors.setAttribute("aria-label", languagePack.newNoteColorsAria);
  elements.saveNoteButton.textContent = languagePack.saveNote;
  elements.emptyTitle.textContent = languagePack.emptyTitle;
  elements.emptyText.textContent = languagePack.emptyText;
  elements.editModalTitle.textContent = languagePack.editModalTitle;
  elements.closeModalButton.setAttribute("aria-label", languagePack.closeEditor);
  elements.editTitle.placeholder = languagePack.editTitlePlaceholder;
  elements.editBody.placeholder = languagePack.editBodyPlaceholder;
  elements.editColors.setAttribute("aria-label", languagePack.editColorsAria);
  elements.saveEditButton.textContent = languagePack.saveChanges;

  createColorPicker(elements.newNoteColors, state.draftColor, (color) => {
    state.draftColor = color;
    updatePickerSelection(elements.newNoteColors, state.draftColor);
  });

  createColorPicker(elements.editColors, state.editingColor, (color) => {
    state.editingColor = color;
    updatePickerSelection(elements.editColors, state.editingColor);
  });

  renderNotes();
}

function toggleLanguage() {
  state.language = state.language === "en" ? "ru" : "en";
  saveLanguage();
  applyLanguage();
}

function closeSidebarOnMobile() {
  if (window.innerWidth <= 900) {
    document.body.classList.remove("sidebar-open");
  }
}

function seedPickers() {
  createColorPicker(elements.newNoteColors, state.draftColor, (color) => {
    state.draftColor = color;
    updatePickerSelection(elements.newNoteColors, state.draftColor);
  });

  createColorPicker(elements.editColors, state.editingColor, (color) => {
    state.editingColor = color;
    updatePickerSelection(elements.editColors, state.editingColor);
  });
}

function bindEvents() {
  elements.noteForm.addEventListener("submit", handleCreateSubmit);
  elements.editForm.addEventListener("submit", handleEditSubmit);
  elements.noteTitle.addEventListener("focus", () => updateComposerState(true));
  elements.noteBody.addEventListener("focus", () => updateComposerState(true));
  elements.noteTitle.addEventListener("input", () => updateComposerState(true));
  elements.noteBody.addEventListener("input", () => updateComposerState(true));
  elements.noteForm.addEventListener("focusout", () => {
    window.setTimeout(() => updateComposerState(false), 0);
  });
  elements.languageToggle.addEventListener("click", toggleLanguage);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.editModal.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-close-modal")) {
      closeEditModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!elements.editModal.classList.contains("hidden")) {
        closeEditModal();
      }
      closeSidebarOnMobile();
    }
  });

  window.addEventListener("resize", closeSidebarOnMobile);
}

function init() {
  applyTheme();
  seedPickers();
  bindEvents();
  updateComposerState(false);
  applyLanguage();
}

init();

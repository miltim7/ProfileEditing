<template>
  <section class="about-section">
    <div class="about-content">
      <h3>О магазине:</h3>
      <div class="about-content">
        <div class="quill-wrapper" :class="{ error: errors.about }">
          <QuillEditor
            v-model:content="about"
            :options="editorOptions"
            @update:content="onEditorChange"
            contentType="html"
            ref="quillEditor"
          />
          <div class="char-counter">
            {{ getTextLength() }}
          </div>
          <div v-if="errors.about" class="error-message field-error">
            {{ errors.about }}
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно для ссылок -->
    <div v-if="showLinkModal" class="link-modal-overlay" @click="closeLinkModal">
      <div class="link-modal-content" @click.stop>
        <div class="link-modal-header">
          <h3>{{ linkModalData.isEdit ? "Редактировать ссылку" : "Добавить ссылку" }}</h3>
          <button class="link-modal-close" @click="closeLinkModal">✕</button>
        </div>

        <div class="link-modal-body">
          <div class="link-input-group">
            <label class="link-label">Текст ссылки:</label>
            <input
              v-model="linkModalData.text"
              type="text"
              placeholder="Введите текст ссылки"
              class="link-input"
              :class="{ error: errors.linkText }"
              @keyup.enter="saveLinkConnection"
            />
            <div v-if="errors.linkText" class="link-error-message">
              {{ errors.linkText }}
            </div>
          </div>

          <div class="link-input-group">
            <label class="link-label">URL ссылки:</label>
            <input
              v-model="linkModalData.url"
              type="url"
              placeholder="https://example.com"
              class="link-input"
              :class="{ error: errors.linkUrl }"
              @keyup.enter="saveLinkConnection"
            />
            <div v-if="errors.linkUrl" class="link-error-message">
              {{ errors.linkUrl }}
            </div>
          </div>

          <div class="link-actions">
            <button class="link-btn link-save-btn" @click="saveLinkConnection">
              {{ linkModalData.isEdit ? "Обновить" : "Добавить" }}
            </button>
            <button class="link-btn link-cancel-btn" @click="closeLinkModal">Отмена</button>
            <button
              v-if="linkModalData.isEdit"
              class="link-btn link-remove-btn"
              @click="removeLinkConnection"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "AboutSection",
  components: {
    QuillEditor,
  },
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    aboutError: {
      type: String,
      default: ""
    }
  },
  emits: ['update:modelValue', 'validate'],
  data() {
    return {
      about: this.modelValue,
      
      // Настройки Quill Editor для Vue 3
      editorOptions: {
        theme: "snow",
        placeholder: "Расскажите о своем магазине...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["clean"],
          ],
        },
        bounds: document.body,
        scrollingContainer: null,
        formats: [
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "bullet",
          "align",
        ],
      },

      // Переменные для модалки ссылок
      showLinkModal: false,
      linkModalData: {
        text: "",
        url: "",
        isEdit: false,
        range: null,
      },

      errors: {
        about: this.aboutError
      },
    };
  },

  watch: {
    modelValue(newValue) {
      this.about = newValue;
    },
    about(newValue) {
      this.$emit('update:modelValue', newValue);
    },
    aboutError(newError) {
      this.errors.about = newError;
    }
  },

  methods: {
    // Методы для Quill Editor
    onEditorChange() {
      this.validateField("about");
      // Сохраняем позицию скролла
      this.$nextTick(() => {
        const container = document.querySelector(".ql-container");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    getTextLength() {
      if (!this.about) return 0;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = this.about;
      return tempDiv.textContent.trim().length;
    },

    validateField(fieldName) {
      this.clearFieldError(fieldName);

      if (fieldName === "about") {
        // Валидация поля about (можно добавить свои правила)
        // Сейчас убрали лимит символов, но можно добавить другие правила
        
        // Уведомляем родительский компонент о результате валидации
        this.$emit('validate', {
          field: 'about',
          isValid: true,
          error: null
        });
      }
    },

    setFieldError(fieldName, message) {
      this.errors[fieldName] = message;
    },

    clearFieldError(fieldName) {
      delete this.errors[fieldName];
    },

    // Новые методы для обработки ссылок
    openLinkModal() {
      this.linkModalData = {
        text: "",
        url: "",
        isEdit: false,
        range: null,
      };

      this.showLinkModal = true;
      this.clearLinkErrors();

      // Фокус на первое поле после открытия
      this.$nextTick(() => {
        const firstInput = document.querySelector(".link-input");
        if (firstInput) firstInput.focus();
      });
    },

    closeLinkModal() {
      this.showLinkModal = false;
      this.linkModalData = {
        text: "",
        url: "",
        isEdit: false,
        range: null,
        linkElement: null,
      };
      this.clearLinkErrors();
    },

    saveLinkConnection() {
      // Валидация
      this.clearLinkErrors();
      let hasErrors = false;

      if (!this.linkModalData.text.trim()) {
        this.errors.linkText = "Текст ссылки обязателен";
        hasErrors = true;
      }

      if (!this.linkModalData.url.trim()) {
        this.errors.linkUrl = "URL обязателен";
        hasErrors = true;
      } else if (!this.isValidUrl(this.linkModalData.url)) {
        this.errors.linkUrl = "Введите корректный URL";
        hasErrors = true;
      }

      if (hasErrors) return;

      // Простая вставка ссылки в HTML
      const linkHtml = `<a href="${this.linkModalData.url}" target="_blank">${this.linkModalData.text}</a>`;
      this.about += " " + linkHtml;

      this.closeLinkModal();
    },

    removeLinkConnection() {
      this.closeLinkModal();
    },

    clearLinkErrors() {
      delete this.errors.linkText;
      delete this.errors.linkUrl;
    },

    isValidUrl(string) {
      try {
        new URL(string);
        return true;
      } catch (_) {
        // Проверяем, начинается ли с http:// или https://
        const urlPattern = /^https?:\/\/.+/i;
        return urlPattern.test(string);
      }
    },
  },
};
</script>

<style scoped>
.about-section {
  margin-top: 60px;
}

.about-section h3 {
  font-size: 24px;
  font-weight: 700;
  color: #3F3F3F;
  margin-bottom: 15px;
}

.about-content {
  position: relative;
}

/* Универсальная система ошибок для всех полей */
.field-wrapper {
  position: relative;
}

.field-error {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 12px;
  color: #e74c3c;
  margin-top: 4px;
  white-space: nowrap;
  z-index: 10;
}

.error-message {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 12px;
  color: #e74c3c;
  margin-top: 4px;
  white-space: nowrap;
  z-index: 10;
}

/* Стили для Quill Editor */
.quill-wrapper {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  min-height: 180px;
}

.quill-wrapper.error {
  border: 2px solid #e74c3c;
}

/* Кастомизация Quill Editor под ваш дизайн */
.quill-wrapper :deep(.ql-toolbar) {
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
  padding: 10px 15px;
}

.quill-wrapper :deep(.ql-container) {
  border: none;
  font-size: 14px;
  line-height: 1.6;
  min-height: 120px;
  max-height: 300px;
  background: #f8f8fc;
  overflow-y: auto;
  scroll-behavior: smooth;
  position: relative;
}

.quill-wrapper :deep(.ql-editor) {
  padding: 20px;
  color: #3f3f3f;
  min-height: 120px;
}

/* Обычный placeholder без отступа */
.quill-wrapper :deep(.ql-editor.ql-blank::before) {
  color: #9f9f9f;
  font-style: italic;
  margin-left: 5.5px;
}

/* Стили для ссылок в редакторе - делаем синими */
.quill-wrapper :deep(.ql-editor a) {
  color: #5856d2 !important;
  text-decoration: underline;
  transition: color 0.2s ease;
  cursor: pointer;
}

.quill-wrapper :deep(.ql-editor a:hover) {
  color: #5d4ec7 !important;
}

/* СКРЫВАЕМ стандартное модальное окно Quill для ссылок */
.quill-wrapper :deep(.ql-tooltip) {
  display: none !important;
}

/* Стили кнопок тулбара */
.quill-wrapper :deep(.ql-toolbar .ql-formats) {
  margin-right: 15px;
}

.quill-wrapper :deep(.ql-toolbar button) {
  padding: 8px;
  margin: 2px;
  border-radius: 6px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  background: transparent;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quill-wrapper :deep(.ql-toolbar button:hover) {
  background: #e9ecef;
  transform: translateY(-1px);
}

/* Стили для активных кнопок - НЕ закрашиваем, а делаем обводку */
.quill-wrapper :deep(.ql-toolbar button.ql-active) {
  background: #f0f0ff !important;
  border: 2px solid #5856d2 !important;
  color: #5856d2 !important;
  box-shadow: 0 2px 4px rgba(88, 86, 210, 0.2);
}

.quill-wrapper :deep(.ql-toolbar button.ql-active:hover) {
  background: #e8e8ff !important;
  transform: translateY(-1px);
}

/* Стили для dropdown'ов */
.quill-wrapper :deep(.ql-toolbar .ql-picker) {
  color: #3f3f3f;
}

.quill-wrapper :deep(.ql-toolbar .ql-picker-label) {
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 6px;
  transition: all 0.2s ease;
}

.quill-wrapper :deep(.ql-toolbar .ql-picker-label:hover) {
  background: #e9ecef;
}

.quill-wrapper :deep(.ql-toolbar .ql-picker.ql-expanded .ql-picker-label) {
  background: #f0f0ff !important;
  border: 2px solid #5856d2 !important;
  color: #5856d2 !important;
}

/* Счетчик символов */
.char-counter {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: #9f9f9f;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 1000;
  pointer-events: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Стили для скроллбара */
.quill-wrapper :deep(.ql-container::-webkit-scrollbar) {
  width: 6px;
}

.quill-wrapper :deep(.ql-container::-webkit-scrollbar-track) {
  background: #f1f1f1;
  border-radius: 3px;
}

.quill-wrapper :deep(.ql-container::-webkit-scrollbar-thumb) {
  background: #c1c1c1;
  border-radius: 3px;
}

.quill-wrapper :deep(.ql-container::-webkit-scrollbar-thumb:hover) {
  background: #a8a8a8;
}

/* ==================== СТИЛИ ДЛЯ МОДАЛКИ ССЫЛОК ==================== */

/* Оверлей модального окна ссылок */
.link-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Контент модального окна ссылок */
.link-modal-content {
  background: white;
  border-radius: 20px;
  width: 520px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: slideIn 0.3s ease;
  position: relative;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Заголовок модального окна ссылок */
.link-modal-header {
  background: linear-gradient(135deg, #5856d2 0%, #7b7ae8 100%);
  color: white;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.link-modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  flex: 1;
}

.link-modal-close {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.link-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

/* Тело модального окна ссылок */
.link-modal-body {
  padding: 32px;
}

.link-input-group {
  margin-bottom: 24px;
  position: relative;
}

.link-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #3f3f3f;
  margin-bottom: 8px;
}

.link-input {
  width: 100%;
  height: 52px;
  background: #f8f8fc;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 0 16px;
  font-size: 15px;
  color: #3f3f3f;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.link-input::placeholder {
  color: #9f9f9f;
  font-size: 15px;
}

.link-input:focus {
  outline: none;
  border-color: #5856d2;
  background: #fafafa;
  box-shadow: 0 0 0 3px rgba(88, 86, 210, 0.1);
}

.link-input.error {
  border-color: #e74c3c;
  background: #fdf2f2;
}

.link-error-message {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 12px;
  color: #e74c3c;
  margin-top: 4px;
  font-weight: 500;
}

/* Кнопки действий */
.link-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.link-btn {
  flex: 1;
  height: 52px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.link-save-btn {
  background: linear-gradient(135deg, #5856d2 0%, #7b7ae8 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(88, 86, 210, 0.3);
}

.link-save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(88, 86, 210, 0.4);
}

.link-cancel-btn {
  background: #f1f1f5;
  color: #6b6b6b;
}

.link-cancel-btn:hover {
  background: #e8e8ec;
  transform: translateY(-1px);
}

.link-remove-btn {
  background: linear-gradient(135deg, #e74c3c 0%, #ec7063 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.link-remove-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
}

/* Адаптивные стили */
@media (max-width: 768px) {
  .about-section {
    margin-top: 40px;
  }

  .about-section h3 {
    font-size: 22px;
  }

  /* Скрываем тулбар в мобильной версии */
  .quill-wrapper :deep(.ql-toolbar) {
    display: none;
  }

  /* Убираем нижнюю границу у контейнера, так как тулбара нет */
  .quill-wrapper :deep(.ql-container) {
    max-height: 250px;
    border-radius: 10px; /* Добавляем скругление сверху */
  }

  .quill-wrapper :deep(.ql-editor) {
    padding: 20px !important;
    font-size: 13px;
  }

  /* Добавляем такой же отступ для placeholder в мобильной версии */
  .quill-wrapper :deep(.ql-editor.ql-blank::before) {
    margin-left: 5.5px;
  }

  /* Скрываем счетчик в мобильной версии */
  .char-counter {
    display: none;
  }

  .link-modal-content {
    width: 95vw;
    margin: 20px;
    border-radius: 16px;
  }

  .link-modal-header {
    padding: 20px 24px;
  }

  .link-modal-header h3 {
    font-size: 18px;
  }

  .link-modal-close {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  .link-modal-body {
    padding: 24px;
  }

  .link-input-group {
    margin-bottom: 20px;
  }

  .link-input {
    height: 48px;
    font-size: 14px;
  }

  .link-actions {
    margin-top: 24px;
    gap: 10px;
  }

  .link-btn {
    height: 48px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .about-section h3 {
    font-size: 18px;
  }

  .quill-wrapper :deep(.ql-container) {
    max-height: 200px;
  }

  .quill-wrapper :deep(.ql-editor) {
    padding: 12px;
    font-size: 12px;
  }

  .link-modal-header {
    padding: 16px 20px;
  }

  .link-modal-header h3 {
    font-size: 16px;
  }

  .link-modal-body {
    padding: 20px;
  }

  .link-actions {
    flex-direction: column;
    gap: 8px;
  }

  .link-btn {
    width: 100%;
  }
}
</style>
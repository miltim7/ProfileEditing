<!-- src/components/Profile.vue -->
<template>
  <section class="breadcrumb-section">
    <div class="breadcrumb-container">
      <nav class="breadcrumb">
        <a href="#" class="breadcrumb-link">Главная</a>
        <span class="breadcrumb-separator">››</span>
        <span class="breadcrumb-current">Редактирование профиля</span>
      </nav>
    </div>
  </section>

  <section class="edit-profile-section">
    <div class="edit-profile-container">
      <h1 class="edit-title">Редактирование профиля</h1>

      <!-- Блок обложки -->
      <div class="cover-block">
        <div
          class="cover-placeholder"
          :class="{ 'has-image': coverImageUrl }"
          @click="triggerCoverUpload"
          @dragover.prevent
          @drop.prevent="handleCoverDrop"
        >
          <img
            v-if="coverImageUrl"
            :src="coverImageUrl"
            alt="Обложка профиля"
            class="cover-image"
          />
          <span v-else>Изображение обложки размер 1920x400</span>
          <div v-if="!coverImageUrl" class="upload-overlay">
            <span>Нажмите или перетащите изображение</span>
          </div>
          <button
            v-if="coverImageUrl"
            class="remove-btn cover-remove"
            @click.stop="removeCover"
          >
            ✕
          </button>
        </div>

        <!-- Аватар -->
        <div class="avatar-container">
          <div
            class="avatar-placeholder"
            :class="{ 'has-image': avatarImageUrl }"
            @click="triggerAvatarUpload"
            @dragover.prevent
            @drop.prevent="handleAvatarDrop"
          >
            <img
              v-if="avatarImageUrl"
              :src="avatarImageUrl"
              alt="Аватар"
              class="avatar-image"
            />
            <template v-else>
              <img src="/images/famicons_person.png" alt="Аватар" />
              <span class="avatar-note">не менее<br />500x500</span>
            </template>
            <div v-if="!avatarImageUrl" class="upload-overlay avatar-overlay">
              <span>Загрузить</span>
            </div>
            <button
              v-if="avatarImageUrl"
              class="remove-btn avatar-remove"
              @click.stop="removeAvatar"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Скрытые input для загрузки файлов -->
      <input
        ref="coverInput"
        type="file"
        accept="image/*"
        @change="handleCoverUpload"
        style="display: none"
      />
      <input
        ref="avatarInput"
        type="file"
        accept="image/*"
        @change="handleAvatarUpload"
        style="display: none"
      />

      <!-- Инструкции по загрузке -->
      <div class="upload-instructions">
        <ol class="requirements" :class="{ 'tips-expanded': showUploadTips }">
          <h3 class="upload-title">
            Загрузите фотографию:
            <button
              class="tips-toggle"
              @click="toggleUploadTips"
              :class="{ active: showUploadTips }"
            >
              ?
            </button>
          </h3>
          <li class="desktop-tip">
            Рекомендуемое разрешение изображения для аватара не менее 500x500
          </li>
          <li class="desktop-tip">
            Рекомендуемое разрешение изображения для шапки профиля 1920x400
          </li>
          <div class="upload-tips" v-show="showUploadTips">
            <li>Рекомендуемое разрешение изображения для аватара не менее 500x500</li>
            <li>Рекомендуемое разрешение изображения для шапки профиля 1920x400</li>
          </div>
        </ol>
      </div>

      <!-- О магазине -->
      <div class="about-section">
        <h3>О магазине:</h3>
        <div class="about-content">
          <!-- Простая textarea -->
          <textarea
            v-if="!showRichEditor"
            v-model="formData.about"
            placeholder="Расскажите о своем магазине..."
            class="about-textarea"
            @focus="openRichEditor"
          ></textarea>

          <!-- Rich editor -->
          <div v-if="showRichEditor" class="rich-editor-wrapper">
            <div class="editor-toolbar">
  <button @click="execCommand('insertHTML', '<>')" title="Код">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M4.5 3L1 8l3.5 5M11.5 3L15 8l-3.5 5" stroke="currentColor" fill="none" stroke-width="1.5"/>
    </svg>
  </button>
  
  <button @click="execCommand('bold')" title="Жирный">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M4 2h4c2.2 0 4 1.8 4 4 0 1.5-.8 2.8-2 3.4 1.6.5 2.8 2.1 2.8 3.8 0 2.4-1.9 4.3-4.3 4.3H4V2z" fill="currentColor"/>
    </svg>
  </button>
  
  <button @click="execCommand('italic')" title="Курсив">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M6 2h6M4 14h6M9 2L7 14" stroke="currentColor" fill="none" stroke-width="1.5"/>
    </svg>
  </button>
  
  <button @click="execCommand('underline')" title="Подчеркивание">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M4 3v4c0 2.2 1.8 4 4 4s4-1.8 4-4V3M2 14h12" stroke="currentColor" fill="none" stroke-width="1.5"/>
    </svg>
  </button>
  
  <button @click="execCommand('strikeThrough')" title="Зачеркивание">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M12.5 3c-.7-1.2-2.2-2-4.5-2s-3.8.8-4.5 2M1 8h14M12.5 13c-.7 1.2-2.2 2-4.5 2s-3.8-.8-4.5-2" stroke="currentColor" fill="none" stroke-width="1.5"/>
    </svg>
  </button>
  
  <span class="separator">|</span>
  
  <button @click="execCommand('insertUnorderedList')" title="Маркированный список">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="3" cy="4" r="1" fill="currentColor"/>
      <circle cx="3" cy="8" r="1" fill="currentColor"/>
      <circle cx="3" cy="12" r="1" fill="currentColor"/>
      <path d="M7 4h8M7 8h8M7 12h8" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  </button>
  
  <button @click="execCommand('insertOrderedList')" title="Нумерованный список">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <text x="2" y="6" font-size="8" fill="currentColor">1</text>
      <text x="2" y="10" font-size="8" fill="currentColor">2</text>
      <text x="2" y="14" font-size="8" fill="currentColor">3</text>
      <path d="M7 4h8M7 8h8M7 12h8" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  </button>
  
  <button @click="execCommand('outdent')" title="Убрать отступ">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M2 4h12M8 8h6M8 12h6M2 8l3 2-3 2z" stroke="currentColor" fill="currentColor" stroke-width="1.5"/>
    </svg>
  </button>
  
  <button @click="execCommand('indent')" title="Добавить отступ">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M2 4h12M8 8h6M8 12h6M2 12l3-2-3-2z" stroke="currentColor" fill="currentColor" stroke-width="1.5"/>
    </svg>
  </button>
  
  <span class="separator">|</span>
  
  <button @click="insertLink" title="Ссылка">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M6.5 10.5L9.5 7.5M7 5.5L5.5 4C4.7 3.2 3.3 3.2 2.5 4S1.8 6.3 2.5 7l1.5 1.5M9 10.5l1.5 1.5c.8.8 2.2.8 3 0s.8-2.2 0-3L12 7.5" stroke="currentColor" fill="none" stroke-width="1.5"/>
    </svg>
  </button>
  
  <button @click="execCommand('justifyLeft')" title="По левому краю">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M2 4h12M2 6h8M2 8h12M2 10h8M2 12h12" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  </button>
  
  <button @click="execCommand('justifyCenter')" title="По центру">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M2 4h12M4 6h8M2 8h12M4 10h8M2 12h12" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  </button>
  
  <button @click="execCommand('justifyRight')" title="По правому краю">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M2 4h12M6 6h8M2 8h12M6 10h8M2 12h12" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  </button>
  
  <button @click="execCommand('removeFormat')" title="Убрать форматирование">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M4 4h8M8 4v8M6 12h4" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 2l12 12" stroke="red" stroke-width="2"/>
    </svg>
  </button>
  
  <span class="separator">|</span>
  
  <button @click="closeRichEditor" title="Закрыть">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M4 6l4 4 4-4" stroke="currentColor" fill="none" stroke-width="2"/>
    </svg>
  </button>
</div>
            <div
              ref="richEditor"
              contenteditable="true"
              class="rich-editor"
              @input="updateContent"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="auth-section">
    <div class="auth-container">
      <h1 class="auth-title">Данные для авторизации</h1>

      <div class="data-table">
        <div class="data-row">
          <div class="data-label">Имя</div>
          <div class="input-wrapper">
            <input
              v-model="formData.firstName"
              class="data-input"
              :class="{ error: errors.firstName }"
              placeholder="Ваше имя"
              @blur="validateField('firstName')"
            />
            <div v-if="errors.firstName" class="error-message">
              {{ errors.firstName }}
            </div>
          </div>
        </div>
        <div class="data-row">
          <div class="data-label">Фамилия</div>
          <div class="input-wrapper">
            <input
              v-model="formData.lastName"
              class="data-input"
              :class="{ error: errors.lastName }"
              placeholder="Ваша фамилия"
              @blur="validateField('lastName')"
            />
            <div v-if="errors.lastName" class="error-message">{{ errors.lastName }}</div>
          </div>
        </div>
        <div class="data-row">
          <div class="data-label">Отчество</div>
          <div class="input-wrapper">
            <input
              v-model="formData.middleName"
              class="data-input"
              placeholder="Ваше отчество"
            />
          </div>
        </div>
        <div class="data-row">
          <div class="data-label">Телефон</div>
          <div class="input-wrapper">
            <input
              v-model="formData.phone"
              class="data-input"
              :class="{ error: errors.phone }"
              placeholder="+7 (999) 999-99-99"
              @input="formatPhone"
              @blur="validateField('phone')"
              maxlength="18"
            />
            <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
          </div>
        </div>
        <div class="data-row">
          <div class="data-label">Страна</div>
          <div class="input-wrapper">
            <div class="select-wrapper">
              <select
                v-model="formData.country"
                class="data-select"
                :class="{ error: errors.country }"
                @change="onCountryChange"
                @blur="validateField('country')"
              >
                <option value="" disabled>Страна</option>
                <option value="russia">Россия</option>
                <option value="kazakhstan">Казахстан</option>
                <option value="belarus">Беларусь</option>
                <option value="ukraine">Украина</option>
              </select>
            </div>
            <div v-if="errors.country" class="error-message">{{ errors.country }}</div>
          </div>
        </div>
        <div class="data-row">
          <div class="data-label">Город</div>
          <div class="input-wrapper">
            <div class="select-wrapper">
              <select
                v-model="formData.city"
                class="data-select"
                :class="{ error: errors.city }"
                :disabled="!formData.country"
                @blur="validateField('city')"
              >
                <option value="" disabled>Город</option>
                <option
                  v-for="city in availableCities"
                  :key="city.value"
                  :value="city.value"
                >
                  {{ city.label }}
                </option>
              </select>
            </div>
            <div v-if="errors.city" class="error-message">{{ errors.city }}</div>
          </div>
        </div>
        <div class="data-row">
          <div class="data-label">Индекс</div>
          <div class="input-wrapper">
            <input
              v-model="formData.postalCode"
              class="data-input"
              :class="{ error: errors.postalCode }"
              placeholder="123456"
              @input="formatPostalCode"
              @blur="validateField('postalCode')"
              maxlength="6"
            />
            <div v-if="errors.postalCode" class="error-message">
              {{ errors.postalCode }}
            </div>
          </div>
        </div>
        <div class="data-row">
          <div class="data-label">
            Адрес <br />
            (ул., дом, корп., кв.)
          </div>
          <div class="input-wrapper">
            <input
              v-model="formData.address"
              class="data-input"
              :class="{ error: errors.address }"
              placeholder="ул. Пример, д. 1, кв. 1"
              @blur="validateField('address')"
            />
            <div v-if="errors.address" class="error-message">{{ errors.address }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="additional-section">
    <div class="additional-container">
      <h1 class="additional-title">Дополнительная информация</h1>

      <div class="info-content">
        <div class="info-row">
          <div class="info-label">Валюта</div>
          <div class="input-wrapper">
            <div class="select-wrapper">
              <select v-model="formData.currency" class="data-select">
                <option value="" disabled>Выберите валюту</option>
                <option value="USD">USD - Доллар США</option>
                <option value="EUR">EUR - Евро</option>
                <option value="RUB">RUB - Российский рубль</option>
                <option value="KZT">KZT - Казахстанский тенге</option>
              </select>
            </div>
          </div>
        </div>

        <div class="info-row">
          <div class="info-label">Банковская карта</div>
          <div class="input-wrapper">
            <input
              v-model="formData.bankCard"
              class="data-input card-input"
              :class="{ error: errors.bankCard }"
              placeholder="1234 5678 9012 3456"
              @input="formatBankCard"
              @blur="validateField('bankCard')"
              maxlength="19"
            />
            <div v-if="errors.bankCard" class="error-message">{{ errors.bankCard }}</div>
          </div>
        </div>

        <div class="accounts-section">
          <div class="accounts-row">
            <div class="accounts-label">
              Вы можете <br />
              привязать аккаунты:
            </div>
            <div class="accounts-icons">
              <img
                v-for="social in socialNetworks"
                :key="social.name"
                :src="social.icon"
                :alt="social.name"
                class="account-icon"
                :class="{ connected: social.connected }"
                @click="toggleSocialNetwork(social.name)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="save-section">
    <div class="save-container">
      <button
        class="save-btn-bottom"
        :disabled="!isFormValid || isSaving"
        @click="saveProfile"
      >
        <span v-if="isSaving">Сохранение...</span>
        <span v-else>Сохранить</span>
      </button>
    </div>
  </section>

  <!-- Модальное окно для привязки соцсетей -->
  <div v-if="showSocialModal" class="modal-overlay" @click="closeSocialModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Привязать {{ getSocialTitle(currentSocial) }}</h3>
        <button class="modal-close" @click="closeSocialModal">✕</button>
      </div>

      <div class="modal-body">
        <input
          v-model="socialCredentials[currentSocial]"
          type="text"
          :placeholder="getSocialPlaceholder(currentSocial)"
          class="social-input"
          @keyup.enter="saveSocialConnection"
        />

        <button class="modal-btn save-btn" @click="saveSocialConnection">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      showRichEditor: false,

      showUploadTips: false,

      showSocialModal: false,
      currentSocial: null,
      socialCredentials: {
        telegram: "",
        facebook: "",
        vk: "",
        instagram: "",
        pinterest: "",
        website: "",
      },

      // Основные данные
      coverImageUrl: null,
      avatarImageUrl: null,
      isSaving: false,

      // Данные формы
      formData: {
        about: "",
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
        country: "",
        city: "",
        postalCode: "",
        address: "",
        currency: "",
        bankCard: "",
      },

      // Ошибки валидации
      errors: {},

      // Социальные сети
      socialNetworks: [
        { name: "telegram", icon: "/images/telegramm.png", connected: false },
        { name: "facebook", icon: "/images/facebook.png", connected: false },
        { name: "vk", icon: "/images/vk2.png", connected: false },
        { name: "instagram", icon: "/images/instagramm.png", connected: false },
        { name: "pinterest", icon: "/images/pinterest.png", connected: false },
        { name: "website", icon: "/images/internet.png", connected: false },
      ],

      // Города по странам
      citiesData: {
        russia: [
          { value: "moscow", label: "Москва" },
          { value: "spb", label: "Санкт-Петербург" },
          { value: "ekb", label: "Екатеринбург" },
          { value: "nn", label: "Нижний Новгород" },
          { value: "kazan", label: "Казань" },
        ],
        kazakhstan: [
          { value: "almaty", label: "Алматы" },
          { value: "astana", label: "Астана" },
          { value: "shymkent", label: "Шымкент" },
        ],
        belarus: [
          { value: "minsk", label: "Минск" },
          { value: "gomel", label: "Гомель" },
          { value: "brest", label: "Брест" },
        ],
        ukraine: [
          { value: "kiev", label: "Киев" },
          { value: "kharkiv", label: "Харьков" },
          { value: "odessa", label: "Одесса" },
        ],
      },
    };
  },

  computed: {
    availableCities() {
      return this.citiesData[this.formData.country] || [];
    },

    isFormValid() {
      const requiredFields = [
        "firstName",
        "lastName",
        "phone",
        "country",
        "city",
        "postalCode",
        "address",
      ];
      return requiredFields.every(
        (field) =>
          this.formData[field] &&
          this.formData[field].trim() !== "" &&
          !this.errors[field]
      );
    },
  },

  methods: {
    openRichEditor() {
      this.showRichEditor = true;
      this.$nextTick(() => {
        const editor = this.$refs.richEditor;

        // Устанавливаем содержимое ОДИН РАЗ
        editor.innerHTML = this.formData.about || "";

        editor.focus();

        // Ставим курсор в конец
        const range = document.createRange();
        const selection = window.getSelection();

        if (editor.childNodes.length > 0) {
          const lastNode = editor.childNodes[editor.childNodes.length - 1];
          if (lastNode.nodeType === Node.TEXT_NODE) {
            range.setStart(lastNode, lastNode.textContent.length);
          } else {
            range.setStartAfter(lastNode);
          }
        } else {
          range.setStart(editor, 0);
        }

        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      });
    },

    updateContent() {
      // Сохраняем только текстовое содержимое
      this.formData.about = this.$refs.richEditor.innerText;
    },

    closeRichEditor() {
      this.showRichEditor = false;
    },
    // В methods добавить:
    execCommand(command, value = null) {
      document.execCommand(command, false, value);
      this.$refs.richEditor.focus();
    },

    insertLink() {
      const url = prompt("Введите URL:");
      if (url) {
        this.execCommand("createLink", url);
      }
    },

    updateContent() {
      this.formData.about = this.$refs.richEditor.innerHTML;
    },

    // после рич эдитора
    toggleUploadTips() {
      this.showUploadTips = !this.showUploadTips;
    },

    openSocialModal(socialName) {
      this.currentSocial = socialName;
      this.showSocialModal = true;
    },

    closeSocialModal() {
      this.showSocialModal = false;
      this.currentSocial = null;
    },

    saveSocialConnection() {
      const credential = this.socialCredentials[this.currentSocial];
      if (credential.trim()) {
        const network = this.socialNetworks.find((n) => n.name === this.currentSocial);
        if (network) {
          network.connected = true;
          console.log(`${this.currentSocial} подключен: ${credential}`);
        }
      }
      this.closeSocialModal();
    },

    getSocialTitle(socialName) {
      const titles = {
        telegram: "Telegram",
        facebook: "Facebook",
        vk: "VKontakte",
        instagram: "Instagram",
        pinterest: "Pinterest",
        website: "Веб-сайт",
      };
      return titles[socialName] || socialName;
    },

    getSocialPlaceholder(socialName) {
      const placeholders = {
        telegram: "@username или ссылка",
        facebook: "Ссылка на профиль Facebook",
        vk: "Ссылка на профиль VK",
        instagram: "@username или ссылка",
        pinterest: "Ссылка на профиль Pinterest",
        website: "https://example.com",
      };
      return placeholders[socialName] || "Введите данные";
    },

    removeAvatar() {
      this.avatarImageUrl = null;
      this.$refs.avatarInput.value = "";
    },

    removeCover() {
      this.coverImageUrl = null;
      this.$refs.coverInput.value = "";
    },

    // === ЗАГРУЗКА ИЗОБРАЖЕНИЙ ===
    triggerCoverUpload() {
      this.$refs.coverInput.click();
    },

    triggerAvatarUpload() {
      this.$refs.avatarInput.click();
    },

    handleCoverUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.processImage(file, "cover");
      }
    },

    handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.processImage(file, "avatar");
      }
    },

    handleCoverDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        this.processImage(file, "cover");
      }
    },

    handleAvatarDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        this.processImage(file, "avatar");
      }
    },

    processImage(file, type) {
      // Проверка типа файла
      if (!file.type.startsWith("image/")) {
        alert("Пожалуйста, выберите изображение");
        return;
      }

      // Проверка размера файла (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Размер файла не должен превышать 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Проверка разрешения
          // if (type === "avatar" && (img.width < 500 || img.height < 500)) {
          //   if (
          //     !confirm(
          //       "Рекомендуемое разрешение для аватара не менее 500x500. Продолжить?"
          //     )
          //   ) {
          //     return;
          //   }
          // }

          // if (type === "cover" && (img.width < 1920 || img.height < 400)) {
          //   if (!confirm("Рекомендуемое разрешение для обложки 1920x400. Продолжить?")) {
          //     return;
          //   }
          // }

          // Сохранение изображения
          if (type === "cover") {
            this.coverImageUrl = e.target.result;
          } else {
            this.avatarImageUrl = e.target.result;
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    // === ВАЛИДАЦИЯ ===
    validateField(fieldName) {
      this.$delete(this.errors, fieldName);

      const value = this.formData[fieldName]?.trim();

      switch (fieldName) {
        case "firstName":
        case "lastName":
          if (!value) {
            this.$set(this.errors, fieldName, "Это поле обязательно");
          } else if (value.length < 2) {
            this.$set(this.errors, fieldName, "Минимум 2 символа");
          } else if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value)) {
            this.$set(this.errors, fieldName, "Только буквы, пробелы и дефисы");
          }
          break;

        case "phone":
          if (!value) {
            this.$set(this.errors, fieldName, "Номер телефона обязателен");
          } else {
            // Проверяем базовые правила
            const hasDigits = /\d/.test(value);
            const spaceCount = (value.match(/\s/g) || []).length;
            const openBrackets = (value.match(/\(/g) || []).length;
            const closeBrackets = (value.match(/\)/g) || []).length;

            if (!hasDigits) {
              this.$set(this.errors, fieldName, "Номер должен содержать цифры");
            } else if (spaceCount > 1) {
              this.$set(this.errors, fieldName, "Максимум один пробел");
            } else if (openBrackets !== closeBrackets || openBrackets > 1) {
              this.$set(
                this.errors,
                fieldName,
                "Скобки должны быть парными и не более одной пары"
              );
            } else if (value.length < 5) {
              this.$set(this.errors, fieldName, "Номер слишком короткий");
            }
          }
          break;

        case "country":
          if (!value) {
            this.$set(this.errors, fieldName, "Выберите страну");
          }
          break;

        case "city":
          if (!value) {
            this.$set(this.errors, fieldName, "Выберите город");
          }
          break;

        case "postalCode":
          if (!value) {
            this.$set(this.errors, fieldName, "Индекс обязателен");
          } else if (!/^\d{6}$/.test(value)) {
            this.$set(this.errors, fieldName, "Индекс должен содержать 6 цифр");
          }
          break;

        case "address":
          if (!value) {
            this.$set(this.errors, fieldName, "Адрес обязателен");
          } else if (value.length < 10) {
            this.$set(this.errors, fieldName, "Адрес слишком короткий");
          }
          break;

        case "bankCard":
          if (value && !/^\d{4} \d{4} \d{4} \d{4}$/.test(value)) {
            this.$set(this.errors, fieldName, "Некорректный формат карты");
          }
          break;
      }
    },

    // === ФОРМАТИРОВАНИЕ ===
    formatPhone() {
      let value = this.formData.phone;

      // Удаляем все кроме цифр, пробелов, плюса и скобок
      value = value.replace(/[^\d\s+()]/g, "");

      // Ограничиваем длину
      if (value.length > 20) {
        value = value.slice(0, 20);
      }

      this.formData.phone = value;
    },

    formatBankCard() {
      let value = this.formData.bankCard.replace(/\D/g, "");
      value = value.slice(0, 16);
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
      this.formData.bankCard = value;
    },

    formatPostalCode() {
      this.formData.postalCode = this.formData.postalCode.replace(/\D/g, "").slice(0, 6);
    },

    // === ОБРАБОТЧИКИ СОБЫТИЙ ===
    onCountryChange() {
      this.formData.city = "";
      this.$delete(this.errors, "city");
      this.validateField("country");
    },

    toggleSocialNetwork(networkName) {
      const network = this.socialNetworks.find((n) => n.name === networkName);
      if (network) {
        if (network.connected) {
          // Отключаем
          network.connected = false;
          this.socialCredentials[networkName] = "";
        } else {
          // Открываем модалку для подключения
          this.openSocialModal(networkName);
        }
      }
    },

    // === СОХРАНЕНИЕ ===
    async saveProfile() {
      // Валидация всей формы
      const fieldsToValidate = [
        "firstName",
        "lastName",
        "phone",
        "country",
        "city",
        "postalCode",
        "address",
      ];
      fieldsToValidate.forEach((field) => this.validateField(field));

      // Валидация банковской карты если заполнена
      if (this.formData.bankCard) {
        this.validateField("bankCard");
      }

      if (!this.isFormValid) {
        alert("Пожалуйста, исправьте ошибки в форме");
        return;
      }

      this.isSaving = true;

      try {
        // Подготовка данных для отправки
        const profileData = {
          ...this.formData,
          coverImage: this.coverImageUrl,
          avatarImage: this.avatarImageUrl,
          socialNetworks: this.socialNetworks
            .filter((n) => n.connected)
            .map((n) => n.name),
        };

        console.log("Данные для сохранения:", profileData);

        // Имитация запроса к API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Здесь будет реальный запрос к API
        // const response = await api.saveProfile(profileData);

        alert("Профиль успешно сохранен!");
      } catch (error) {
        console.error("Ошибка сохранения:", error);
        alert("Произошла ошибка при сохранении. Попробуйте еще раз.");
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>

<style src="../assets/profile.css"></style>

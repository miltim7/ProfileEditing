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
          :class="{ 'has-image': coverImageUrl, 'error': errors.coverImage }"
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
        <div v-if="errors.coverImage" class="error-message field-error">
          {{ errors.coverImage }}
        </div>

        <!-- Аватар -->
        <div class="avatar-container">
          <div
            class="avatar-placeholder"
            :class="{ 'has-image': avatarImageUrl, 'error': errors.avatarImage }"
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
          <div v-if="errors.avatarImage" class="error-message field-error">
            {{ errors.avatarImage }}
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
          <div class="field-wrapper">
            <textarea
              v-if="!showRichEditor"
              v-model="formData.about"
              placeholder="Расскажите о своем магазине..."
              class="about-textarea"
              :class="{ error: errors.about }"
              @focus="openRichEditor"
            ></textarea>
            <div v-if="errors.about && !showRichEditor" class="error-message field-error">
              {{ errors.about }}
            </div>
          </div>

          <!-- Rich editor -->
          <div v-if="showRichEditor" class="rich-editor-wrapper" :class="{ error: errors.about }">
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
            <div v-if="errors.about" class="error-message field-error">
              {{ errors.about }}
            </div>
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
              :class="{ error: errors.middleName }"
              placeholder="Ваше отчество"
              @blur="validateField('middleName')"
            />
            <div v-if="errors.middleName" class="error-message">{{ errors.middleName }}</div>
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
            <div class="select-wrapper" :class="{ error: errors.country }">
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
            <div class="select-wrapper" :class="{ error: errors.city }">
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
            <div class="select-wrapper" :class="{ error: errors.currency }">
              <select 
                v-model="formData.currency" 
                class="data-select"
                :class="{ error: errors.currency }"
                @blur="validateField('currency')"
              >
                <option value="" disabled>Выберите валюту</option>
                <option value="USD">USD - Доллар США</option>
                <option value="EUR">EUR - Евро</option>
                <option value="RUB">RUB - Российский рубль</option>
                <option value="KZT">KZT - Казахстанский тенге</option>
              </select>
            </div>
            <div v-if="errors.currency" class="error-message">{{ errors.currency }}</div>
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
            <div class="accounts-icons" :class="{ error: errors.socialNetworks }">
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
            <div v-if="errors.socialNetworks" class="error-message">{{ errors.socialNetworks }}</div>
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
        <div class="input-wrapper">
          <input
            v-model="socialCredentials[currentSocial]"
            type="text"
            :placeholder="getSocialPlaceholder(currentSocial)"
            class="social-input"
            :class="{ error: errors.socialInput }"
            @keyup.enter="saveSocialConnection"
            @blur="validateSocialInput"
          />
          <div v-if="errors.socialInput" class="error-message">{{ errors.socialInput }}</div>
        </div>

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

      coverImageUrl: null,
      avatarImageUrl: null,
      isSaving: false,

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

      errors: {},

      socialNetworks: [
        { name: "telegram", icon: "/images/telegramm.png", connected: false },
        { name: "facebook", icon: "/images/facebook.png", connected: false },
        { name: "vk", icon: "/images/vk2.png", connected: false },
        { name: "instagram", icon: "/images/instagramm.png", connected: false },
        { name: "pinterest", icon: "/images/pinterest.png", connected: false },
        { name: "website", icon: "/images/internet.png", connected: false },
      ],

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
    setFieldError(fieldName, message) {
      this.$set(this.errors, fieldName, message);
    },

    clearFieldError(fieldName) {
      this.$delete(this.errors, fieldName);
    },

    clearAllErrors() {
      this.errors = {};
    },

    setMultipleErrors(errorsObject) {
      Object.keys(errorsObject).forEach(field => {
        this.$set(this.errors, field, errorsObject[field]);
      });
    },

    openRichEditor() {
      this.showRichEditor = true;
      this.$nextTick(() => {
        const editor = this.$refs.richEditor;
        editor.innerHTML = this.formData.about || "";
        editor.focus();

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
      this.formData.about = this.$refs.richEditor.innerText;
    },

    closeRichEditor() {
      this.showRichEditor = false;
    },

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

    toggleUploadTips() {
      this.showUploadTips = !this.showUploadTips;
    },

    openSocialModal(socialName) {
      this.currentSocial = socialName;
      this.showSocialModal = true;
      this.clearFieldError('socialInput');
    },

    closeSocialModal() {
      this.showSocialModal = false;
      this.currentSocial = null;
      this.clearFieldError('socialInput');
    },

    saveSocialConnection() {
      const credential = this.socialCredentials[this.currentSocial];
      if (!credential.trim()) {
        this.setFieldError('socialInput', 'Поле не может быть пустым');
        return;
      }
      
      const network = this.socialNetworks.find((n) => n.name === this.currentSocial);
      if (network) {
        network.connected = true;
        console.log(`${this.currentSocial} подключен: ${credential}`);
      }
      this.closeSocialModal();
    },

    validateSocialInput() {
      const credential = this.socialCredentials[this.currentSocial];
      if (!credential.trim()) {
        this.setFieldError('socialInput', 'Поле не может быть пустым');
      } else {
        this.clearFieldError('socialInput');
      }
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
      this.clearFieldError('avatarImage');
    },

    removeCover() {
      this.coverImageUrl = null;
      this.$refs.coverInput.value = "";
      this.clearFieldError('coverImage');
    },

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
      if (!file.type.startsWith("image/")) {
        const errorField = type === "cover" ? "coverImage" : "avatarImage";
        this.setFieldError(errorField, "Пожалуйста, выберите изображение");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        const errorField = type === "cover" ? "coverImage" : "avatarImage";
        this.setFieldError(errorField, "Размер файла не должен превышать 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (type === "cover") {
            this.coverImageUrl = e.target.result;
            this.clearFieldError('coverImage');
          } else {
            this.avatarImageUrl = e.target.result;
            this.clearFieldError('avatarImage');
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    validateField(fieldName) {
      this.clearFieldError(fieldName);

      const value = this.formData[fieldName];

      switch (fieldName) {
        case "firstName":
        case "lastName":
          if (!value || !value.trim()) {
            this.setFieldError(fieldName, "Это поле обязательно");
          } else if (value.trim().length < 2) {
            this.setFieldError(fieldName, "Минимум 2 символа");
          } else if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value.trim())) {
            this.setFieldError(fieldName, "Только буквы, пробелы и дефисы");
          }
          break;

        case "middleName":
          if (value && value.trim() && !/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value.trim())) {
            this.setFieldError(fieldName, "Только буквы, пробелы и дефисы");
          }
          break;

        case "phone":
          if (!value || !value.trim()) {
            this.setFieldError(fieldName, "Номер телефона обязателен");
          } else {
            const hasDigits = /\d/.test(value);
            const spaceCount = (value.match(/\s/g) || []).length;
            const openBrackets = (value.match(/\(/g) || []).length;
            const closeBrackets = (value.match(/\)/g) || []).length;

            if (!hasDigits) {
              this.setFieldError(fieldName, "Номер должен содержать цифры");
            } else if (spaceCount > 1) {
              this.setFieldError(fieldName, "Максимум один пробел");
            } else if (openBrackets !== closeBrackets || openBrackets > 1) {
              this.setFieldError(fieldName, "Скобки должны быть парными и не более одной пары");
            } else if (value.length < 5) {
              this.setFieldError(fieldName, "Номер слишком короткий");
            }
          }
          break;

        case "country":
          if (!value) {
            this.setFieldError(fieldName, "Выберите страну");
          }
          break;

        case "city":
          if (!value) {
            this.setFieldError(fieldName, "Выберите город");
          }
          break;

        case "postalCode":
          if (!value || !value.trim()) {
            this.setFieldError(fieldName, "Индекс обязателен");
          } else if (!/^\d{6}$/.test(value)) {
            this.setFieldError(fieldName, "Индекс должен содержать 6 цифр");
          }
          break;

        case "address":
          if (!value || !value.trim()) {
            this.setFieldError(fieldName, "Адрес обязателен");
          } else if (value.trim().length < 10) {
            this.setFieldError(fieldName, "Адрес слишком короткий");
          }
          break;

        case "bankCard":
          if (value && !/^\d{4} \d{4} \d{4} \d{4}$/.test(value)) {
            this.setFieldError(fieldName, "Некорректный формат карты");
          }
          break;

        case "currency":
          if (!value) {
            this.setFieldError(fieldName, "Выберите валюту");
          }
          break;

        case "about":
          if (value && value.trim().length > 1000) {
            this.setFieldError(fieldName, "Максимум 1000 символов");
          }
          break;

        case "socialNetworks":
          const connectedCount = this.socialNetworks.filter(n => n.connected).length;
          if (connectedCount === 0) {
            this.setFieldError(fieldName, "Подключите хотя бы одну социальную сеть");
          }
          break;
      }
    },

    formatPhone() {
      let value = this.formData.phone;
      value = value.replace(/[^\d\s+()]/g, "");
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

    onCountryChange() {
      this.formData.city = "";
      this.clearFieldError("city");
      this.validateField("country");
    },

    toggleSocialNetwork(networkName) {
      const network = this.socialNetworks.find((n) => n.name === networkName);
      if (network) {
        if (network.connected) {
          network.connected = false;
          this.socialCredentials[networkName] = "";
        } else {
          this.openSocialModal(networkName);
        }
      }
    },

    async saveProfile() {
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

      if (this.formData.bankCard) {
        this.validateField("bankCard");
      }

      if (!this.isFormValid) {
        alert("Пожалуйста, исправьте ошибки в форме");
        return;
      }

      this.isSaving = true;

      try {
        const profileData = {
          ...this.formData,
          coverImage: this.coverImageUrl,
          avatarImage: this.avatarImageUrl,
          socialNetworks: this.socialNetworks
            .filter((n) => n.connected)
            .map((n) => n.name),
        };

        console.log("Данные для сохранения:", profileData);

        await new Promise((resolve) => setTimeout(resolve, 1500));

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
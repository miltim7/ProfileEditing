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
          :class="{ 'has-image': coverImageUrl, error: errors.coverImage }"
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
            :class="{ 'has-image': avatarImageUrl, error: errors.avatarImage }"
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

      <!-- Используем новый компонент AboutSection -->
      <AboutSection 
        v-model="formData.about" 
        :about-error="errors.about"
        @validate="handleAboutValidation"
      />
    </div>
  </section>

  <section class="auth-section">
    <div class="auth-container">
      <h1 class="auth-title">Данные пользователя</h1>

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
            <div v-if="errors.middleName" class="error-message">
              {{ errors.middleName }}
            </div>
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
                :class="{ error: errors.country, 'has-value': formData.country }"
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
                :class="{ error: errors.city, 'has-value': formData.city }"
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
              placeholder="123456 или A1B 2C3"
              @input="formatPostalCode"
              @blur="validateField('postalCode')"
              maxlength="12"
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
                :class="{ error: errors.currency, 'has-value': formData.currency }"
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
                :src="getIconSrc(social)"
                :alt="social.name"
                class="account-icon"
                :class="{ connected: social.connected }"
                @click="toggleSocialNetwork(social.name)"
              />
            </div>
            <div v-if="errors.socialNetworks" class="error-message">
              {{ errors.socialNetworks }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="save-section">
    <div class="save-container">
      <button class="save-btn-bottom" :disabled="isSaving" @click="saveProfile">
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
          <div v-if="errors.socialInput" class="error-message">
            {{ errors.socialInput }}
          </div>
        </div>

        <div style="display: flex; gap: 10px">
          <button
            class="modal-btn save-btn"
            @click="saveSocialConnection"
            style="flex: 1"
          >
            Сохранить
          </button>
          <button
            v-if="isCurrentSocialConnected"
            class="modal-btn"
            @click="disconnectSocial"
            style="
              flex: 1;
              background: #e74c3c;
              color: white;
              border: none;
              border-radius: 12px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              height: 56px;
            "
            @mouseover="$event.target.style.background = '#c0392b'"
            @mouseout="$event.target.style.background = '#e74c3c'"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AboutSection from './AboutSection.vue';

export default {
  name: "ProfileEditing",
  components: {
    AboutSection,
  },
  data() {
    return {
      socialNetworks: [
        {
          name: "telegram",
          icon: "/images/telegramm.png",
          colorIcon: "/images/col-telegramm.png",
          connected: false,
        },
        {
          name: "facebook",
          icon: "/images/facebook.png",
          colorIcon: "/images/col-facebook.png",
          connected: false,
        },
        {
          name: "vk",
          icon: "/images/vk2.png",
          colorIcon: "/images/col-vk.png",
          connected: false,
        },
        {
          name: "instagram",
          icon: "/images/instagramm.png",
          colorIcon: "/images/col-instagramm.png",
          connected: false,
        },
        {
          name: "pinterest",
          icon: "/images/pinterest.png",
          colorIcon: "/images/col-pinterest.png",
          connected: false,
        },
        {
          name: "website",
          icon: "/images/internet.png",
          colorIcon: "/images/col-internet.png",
          connected: false,
        },
      ],

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
        about: "", // Оставляем для связи с компонентом AboutSection
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

    isCurrentSocialConnected() {
      if (!this.currentSocial) return false;
      const network = this.socialNetworks.find((n) => n.name === this.currentSocial);
      return network && network.connected;
    },
  },

  methods: {
    // Новый метод для обработки валидации от AboutSection
    handleAboutValidation(validationResult) {
      if (validationResult.isValid) {
        this.clearFieldError('about');
      } else {
        this.setFieldError('about', validationResult.error);
      }
    },

    getIconSrc(social) {
      if (!social.connected) return social.icon;

      const colorIcons = {
        facebook: "/images/col-facebook.png",
        vk: "/images/col-vk.png",
        instagram: "/images/col-instagramm.png",
        pinterest: "/images/col-pinterest.png",
        website: "/images/col-internet.png",
        telegram: "/images/col-telegramm.png",
      };

      return colorIcons[social.name] || social.icon;
    },

    setFieldError(fieldName, message) {
      this.errors[fieldName] = message;
    },

    clearFieldError(fieldName) {
      delete this.errors[fieldName];
    },

    clearAllErrors() {
      this.errors = {};
    },

    setMultipleErrors(errorsObject) {
      Object.keys(errorsObject).forEach((field) => {
        this.errors[field] = errorsObject[field];
      });
    },

    toggleUploadTips() {
      this.showUploadTips = !this.showUploadTips;
    },

    openSocialModal(socialName) {
      this.currentSocial = socialName;
      this.showSocialModal = true;
      this.clearFieldError("socialInput");

      const network = this.socialNetworks.find((n) => n.name === socialName);
      if (network && network.connected && this.socialCredentials[socialName]) {
        this.$nextTick(() => {
          const input = document.querySelector(".social-input");
          if (input) {
            input.value = this.socialCredentials[socialName];
            this.socialCredentials[socialName] = this.socialCredentials[socialName];
          }
        });
      }
    },

    closeSocialModal() {
      this.showSocialModal = false;
      this.currentSocial = null;
      this.clearFieldError("socialInput");
    },

    disconnectSocial() {
      const network = this.socialNetworks.find((n) => n.name === this.currentSocial);
      if (network) {
        network.connected = false;
        this.socialCredentials[this.currentSocial] = "";
        console.log(`${this.currentSocial} отключен`);
      }
      this.closeSocialModal();
    },

    saveSocialConnection() {
      const credential = this.socialCredentials[this.currentSocial];
      if (!credential.trim()) {
        this.setFieldError("socialInput", "Поле не может быть пустым");
        return;
      }

      const network = this.socialNetworks.find((n) => n.name === this.currentSocial);
      if (network) {
        network.connected = true;
        console.log(`${this.currentSocial} подключен: ${credential}`);
        console.log("network after update:", network);
      }
      this.closeSocialModal();
    },

    validateSocialInput() {
      const credential = this.socialCredentials[this.currentSocial];
      if (!credential.trim()) {
        this.setFieldError("socialInput", "Поле не может быть пустым");
      } else {
        this.clearFieldError("socialInput");
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
      this.clearFieldError("avatarImage");
    },

    removeCover() {
      this.coverImageUrl = null;
      this.$refs.coverInput.value = "";
      this.clearFieldError("coverImage");
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
            this.clearFieldError("coverImage");
          } else {
            this.avatarImageUrl = e.target.result;
            this.clearFieldError("avatarImage");
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
              this.setFieldError(
                fieldName,
                "Скобки должны быть парными и не более одной пары"
              );
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
          } else if (value.trim().length < 3) {
            this.setFieldError(fieldName, "Индекс слишком короткий");
          } else if (value.trim().length > 12) {
            this.setFieldError(fieldName, "Индекс слишком длинный");
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

        case "socialNetworks":
          const connectedCount = this.socialNetworks.filter((n) => n.connected).length;
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
      let value = this.formData.postalCode.replace(/[^a-zA-Zа-яёА-ЯЁ0-9\s-]/g, "");
      if (value.length > 12) {
        value = value.slice(0, 12);
      }
      this.formData.postalCode = value;
    },

    onCountryChange() {
      this.formData.city = "";
      this.clearFieldError("city");
      this.validateField("country");
    },

    toggleSocialNetwork(networkName) {
      const networkIndex = this.socialNetworks.findIndex((n) => n.name === networkName);
      if (networkIndex !== -1) {
        this.openSocialModal(networkName);
      }
    },

    async saveProfile() {
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
<style scoped>
/* Черный цвет для выбранных значений в селектах */
.data-select {
  color: #9f9f9f;
}

.data-select.has-value {
  color: #3f3f3f !important;
}

/* Стили для option */
.data-select option {
  color: #3f3f3f;
}

.data-select option:disabled {
  color: #9f9f9f;
}
</style>
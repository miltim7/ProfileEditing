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
        <div class="cover-placeholder">
          <span>Изображение обложки размер 1920x400</span>
        </div>

        <!-- Аватар -->
        <div class="avatar-container">
          <div class="avatar-placeholder">
            <img src="/images/famicons_person.png" alt="Аватар" />
            <span class="avatar-note">не менее<br />500x500</span>
          </div>
        </div>
      </div>

      <!-- Инструкции по загрузке -->
      <div class="upload-instructions">
        <ol class="requirements">
          <h3 class="upload-title">Загрузите фотографию:</h3>
          <li>Рекомендуемое разрешение изображения для аватара не менее 500x500</li>
          <li>Рекомендуемое разрешение изображения для шапки профиля 1920x400</li>
        </ol>
      </div>

      <!-- О магазине -->
      <div class="about-section">
        <h3>О магазине:</h3>
        <div class="about-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum.
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
          <input class="data-input" placeholder="Ваше имя" />
        </div>
        <div class="data-row">
          <div class="data-label">Фамилия</div>
          <input class="data-input" placeholder="Ваше имя" />
        </div>
        <div class="data-row">
          <div class="data-label">Отчество</div>
          <input class="data-input" placeholder="Ваше имя" />
        </div>
        <div class="data-row">
          <div class="data-label">Телефон</div>
          <input class="data-input" placeholder="+79" />
        </div>
        <div class="data-row">
          <div class="data-label">Страна</div>
          <div class="select-wrapper">
            <select class="data-select">
              <option value="" disabled selected>Страна</option>
              <option>Россия</option>
              <option>Казахстан</option>
            </select>
          </div>
        </div>
        <div class="data-row">
          <div class="data-label">Город</div>
          <div class="select-wrapper">
            <select class="data-select">
              <option value="" disabled selected>Город</option>
              <option>Москва</option>
              <option>Санкт-Петербург</option>
            </select>
          </div>
        </div>
        <div class="data-row">
          <div class="data-label">Индекс</div>
          <input class="data-input" placeholder="Индекс" />
        </div>
        <div class="data-row">
          <div class="data-label">
            Адрес <br />
            (ул., дом, корп., кв.)
          </div>
          <input class="data-input" placeholder="Адрес" />
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
          <div class="select-wrapper">
            <select class="data-select">
              <option value="" disabled selected>Выберите валюту</option>
              <option>USD</option>
              <option>EUR</option>
              <option>RUB</option>
            </select>
          </div>
        </div>

        <div class="info-row">
          <div class="info-label">Банковская карта</div>
          <input class="data-input card-input" placeholder="1234 5678 9012 3456" />
        </div>

        <div class="accounts-section">
          <div class="accounts-row">
            <div class="accounts-label">
              Вы можете <br />
              привязать аккаунты:
            </div>
            <div class="accounts-icons">
              <img src="/images/telegramm.png" alt="Telegram" class="account-icon" />
              <img src="/images/facebook.png" alt="Facebook" class="account-icon" />
              <img src="/images/vk2.png" alt="VK" class="account-icon" />
              <img src="/images/instagramm.png" alt="Instagram" class="account-icon" />
              <img src="/images/pinterest.png" alt="Pinterest" class="account-icon" />
              <img src="/images/internet.png" alt="Website" class="account-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="save-section">
    <div class="save-container">
      <button class="save-btn-bottom">Сохранить</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      about: "",
      coverImage: null,
      avatarImage: null,
    };
  },
};
</script>

<style src="../assets/profile.css"></style>

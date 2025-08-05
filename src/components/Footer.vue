<!-- src\components\Footer.vue -->

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-logo">
          <img src="/images/footer-logo.png" alt="Art Alebrio" />
        </div>
        <div class="footer-links">
          <div class="footer-column" :class="{ 'footer-column--mobile': isMobile }">
            <h4 class="footer-title" :class="{ 'footer-title--mobile': isMobile }" 
                @click="isMobile ? toggleColumn(0) : null">
              Покупателям
              <span v-if="isMobile" class="footer-arrow" :class="{ 'footer-arrow--open': openColumns[0] }">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </h4>
            <ul class="footer-list" :class="{ 'footer-list--mobile': isMobile, 'footer-list--open': openColumns[0] }">
              <li><a href="">Каталог</a></li>
              <li><a href="">Как купить</a></li>
              <li><a href="">Безопасная сделка</a></li>
            </ul>
          </div>
          <div class="footer-column" :class="{ 'footer-column--mobile': isMobile }">
            <h4 class="footer-title" :class="{ 'footer-title--mobile': isMobile }" 
                @click="isMobile ? toggleColumn(1) : null">
              Продавцам
              <span v-if="isMobile" class="footer-arrow" :class="{ 'footer-arrow--open': openColumns[1] }">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </h4>
            <ul class="footer-list" :class="{ 'footer-list--mobile': isMobile, 'footer-list--open': openColumns[1] }">
              <li><a href="">Вход</a></li>
              <li><a href="">Как продать</a></li>
              <li><a href="">Партнерам</a></li>
            </ul>
          </div>
          <div class="footer-column" :class="{ 'footer-column--mobile': isMobile }">
            <h4 class="footer-title" :class="{ 'footer-title--mobile': isMobile }" 
                @click="isMobile ? toggleColumn(2) : null">
              О нас
              <span v-if="isMobile" class="footer-arrow" :class="{ 'footer-arrow--open': openColumns[2] }">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </h4>
            <ul class="footer-list" :class="{ 'footer-list--mobile': isMobile, 'footer-list--open': openColumns[2] }">
              <li><a href="">О нас</a></li>
              <li><a href="">Новости</a></li>
              <li><a href="">Правила</a></li>
              <li><a href="">Оферта</a></li>
            </ul>
          </div>
          <div class="footer-column" :class="{ 'footer-column--mobile': isMobile }">
            <h4 class="footer-title" :class="{ 'footer-title--mobile': isMobile }" 
                @click="isMobile ? toggleColumn(3) : null">
              Важное
              <span v-if="isMobile" class="footer-arrow" :class="{ 'footer-arrow--open': openColumns[3] }">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </h4>
            <ul class="footer-list" :class="{ 'footer-list--mobile': isMobile, 'footer-list--open': openColumns[3] }">
              <li><a href="">Правила проекта</a></li>
              <li><a href="">Политика конфиденциальности</a></li>
              <li><a href="">Политика авторского права</a></li>
              <li><a href="">Условия использования</a></li>
              <li><a href="">Безопасная сделка</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-social">
        <div class="social-icons">
          <a href="" class="social-link">
            <img src="/images/Telegram.png" alt="Telegram" />
          </a>
          <a href="" class="social-link">
            <img src="/images/FacebookFooter.png" alt="Facebook" />
          </a>
          <a href="" class="social-link">
            <img src="/images/VK.png" alt="VK" />
          </a>
          <a href="" class="social-link">
            <img src="/images/InstagramFooter.png" alt="Instagram" />
          </a>
          <a href="" class="social-link">
            <img src="/images/PinterestFooter.png" alt="Pinterest" />
          </a>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="footer-copyright">© 2020 - 2024 Art Alebrio. Все права защищены</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      isMobile: false,
      openColumns: [false, false, false, false]
    }
  },
  methods: {
    toggleColumn(index) {
      this.openColumns[index] = !this.openColumns[index];
      this.$forceUpdate();
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 480;
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  }
}
</script>

<style>
@import '../assets/footer.css';
</style>
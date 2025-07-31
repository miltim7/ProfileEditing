<!-- src\components\Header.vue -->

<template>
  <header class="header">
    <div class="header-top">
      <div class="header-container">
        <div class="header-top__inner">
          <div class="header-top__left">
            <ul class="header-top__list">
              <li><a href="">Карьера</a></li>
              <li><a href="">Для бизнеса</a></li>
              <li><a href="">Доставка и оплата</a></li>
              <li><a href="">Контакты</a></li>
            </ul>
            <button class="header-top__btn">
              <i>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.606 17.606C20.8471 14.3648 20.8471 9.10982 17.606 5.86865C14.3648 2.62748 9.10982 2.62748 5.86865 5.86865C2.62749 9.10982 2.62749 14.3648 5.86865 17.606C9.10982 20.8471 14.3648 20.8471 17.606 17.606Z" stroke="#3F3F3F" stroke-width="1.65991" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M11.738 8.21611V15.2585" stroke="#3F3F3F" stroke-width="1.65991" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8.2168 11.7373H15.2592" stroke="#3F3F3F" stroke-width="1.65991" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </i>
              <span>Создать магазин</span>
            </button>
          </div>
          <div class="header-top__right">
            <div class="header__language custom_select">
              <select v-model="selectedLanguage" @change="changeLanguage">
                <option value="RU">RU</option>
                <option value="ENG">ENG</option>
              </select>
            </div>
            <a href="registration2.html" class="header__registration">Регистрация</a>
            <a href="registration.html" class="header__user">Вход</a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="header-bottom">
      <div class="container">
        <div class="header-bottom__inner">
          <div class="header-bottom__wrap">
            <div class="header-bottom__left">
              <a class="header-bottom__logo" href="index.html">
                <img src="/images/logo.svg" alt="">
              </a>
            </div>
            <div class="header-bottom__right">
              <div class="header-bottom__group">
                <div class="header__catalog">
                  <div class="header__catalog-show" @click="toggleCatalog">
                    <div class="catalog-burger" :class="{ 'catalog-burger--active': showCatalog }">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="catalog-burger__text">Каталог</div>
                  </div>
                  <div class="header__catalog-hidden" :class="{ 'header__catalog-hidden--active': showCatalog }">
                    <div class="header__catalog-wrap tabs-inner">
                      <div class="header__catalog-head">
                        <a href="" 
                           v-for="(category, index) in categories" 
                           :key="index"
                           @click.prevent="setActiveTab(index + 1)"
                           :class="['header__catalog-tab', 'tab', { 'tab--active': activeTab === index + 1 }]">
                          <i>
                            <img :src="category.icon" alt="">
                          </i>
                          <span>{{ category.name }}</span>
                        </a>
                      </div>
                      <div class="header__catalog-body">
                        <div v-for="(category, index) in categories" 
                             :key="index"
                             :class="['header__catalog-content', 'tab__content', { 'tab__content--active': activeTab === index + 1 }]">
                          <div class="header__catalog-title">{{ category.name }}<span>{{ category.count }} товаров</span></div>
                          <div class="header__catalog-items">
                            <div v-for="(item, itemIndex) in category.items" :key="itemIndex" class="header__catalog-item">
                              <a href="" class="header__catalog-subtitle">{{ item.title }}</a>
                              <ul class="header__catalog-list" :class="{ 'text-overflow': !item.expanded }">
                                <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
                                  <a href="">{{ subItem }}</a>
                                </li>
                              </ul>
                              <div class="header__catalog-more show-more" 
                                   :class="{ 'show-more--active': item.expanded }"
                                   @click="toggleCategoryExpansion(index, itemIndex)">
                                <span>Еще</span>
                                <span>Скрыть</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="header__search">
                  <input type="search" placeholder="Поиск" v-model="searchQuery">
                  <button class="header__search-btn open-search" @click="handleSearch">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.55259 1C7.05883 1 5.59862 1.44295 4.3566 2.27284C3.11458 3.10273 2.14655 4.28228 1.57491 5.66234C1.00327 7.04239 0.853706 8.56097 1.14512 10.026C1.43654 11.4911 2.15586 12.8368 3.21211 13.8931C4.26835 14.9493 5.6141 15.6686 7.07916 15.9601C8.54421 16.2515 10.0628 16.1019 11.4428 15.5303C12.8229 14.9586 14.0025 13.9906 14.8323 12.7486C15.6622 11.5066 16.1052 10.0464 16.1052 8.55259C16.1051 6.54956 15.3093 4.6286 13.8929 3.21224C12.4766 1.79589 10.5556 1.00013 8.55259 1Z" stroke="#604093" stroke-width="1.5" stroke-miterlimit="10" />
                      <path d="M14.1875 14.187L19.4621 19.4617" stroke="#604093" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                    </svg>
                  </button>
                </div>
                <div class="search-mob__btn" :class="{ 'search-mob__btn--active': showMobileSearch }" @click="toggleMobileSearch">
                  <i>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.55259 1C7.05883 1 5.59862 1.44295 4.3566 2.27284C3.11458 3.10273 2.14655 4.28228 1.57491 5.66234C1.00327 7.04239 0.853706 8.56097 1.14512 10.026C1.43654 11.4911 2.15586 12.8368 3.21211 13.8931C4.26835 14.9493 5.6141 15.6686 7.07916 15.9601C8.54421 16.2515 10.0628 16.1019 11.4428 15.5303C12.8229 14.9586 14.0025 13.9906 14.8323 12.7486C15.6622 11.5066 16.1052 10.0464 16.1052 8.55259C16.1051 6.54956 15.3093 4.6286 13.8929 3.21224C12.4766 1.79589 10.5556 1.00013 8.55259 1Z" stroke="#3F3F3F" stroke-width="1.5" stroke-miterlimit="10" />
                      <path d="M14.1875 14.187L19.4621 19.4617" stroke="#3F3F3F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                    </svg>
                  </i>
                  <i>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 1L1 16" stroke="#3F3F3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M1 1L16 16" stroke="#3F3F3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </i>
                </div>
              </div>
              <div class="header-bottom__group2">
                <a class="header__favourites" href="favourites.html">
                  <span class="header__favourites-icon">
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4913 0.900032C12.7176 0.898616 11.9542 1.08965 11.262 1.45793C10.5697 1.82622 9.96761 2.36159 9.5036 3.02147C8.87517 2.13033 7.99972 1.47237 7.00112 1.14069C6.00252 0.809022 4.93134 0.820434 3.93916 1.17332C2.94698 1.5262 2.08405 2.20268 1.47246 3.10703C0.86087 4.01139 0.531603 5.09783 0.53125 6.21261C0.53125 12.5755 8.82576 17.5992 9.17884 17.81C9.27806 17.8692 9.38988 17.9003 9.5036 17.9003C9.61732 17.9003 9.72914 17.8692 9.82837 17.81C11.3539 16.8577 12.7856 15.7443 14.1021 14.4866C17.0043 11.7027 18.476 8.91891 18.476 6.21261C18.4745 4.80411 17.9488 3.45377 17.0143 2.45781C16.0799 1.46186 14.8129 0.901629 13.4913 0.900032Z" fill="#5856D2" />
                    </svg>
                    <span class="header__favourites-number">30</span>
                  </span>
                  <span class="header__favourites-text">Избранное</span>
                </a>
                <a class="header__basket" href="basket.html">
                  <span class="header__basket-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.9893 4.27694L16.9762 10.0623C16.8926 10.5408 16.6498 10.9737 16.2901 11.2853C15.9305 11.597 15.4769 11.7676 15.0085 11.7674H5.34428L5.70793 13.844H14.6667C15.0915 13.8438 15.5054 13.984 15.8483 14.2442C16.1913 14.5045 16.4456 14.8714 16.5744 15.2917C16.7032 15.7121 16.6998 16.1641 16.5647 16.5823C16.4296 17.0005 16.1699 17.3632 15.823 17.6179C15.4762 17.8726 15.0602 18.0061 14.6355 17.999C14.2107 17.9919 13.7991 17.8446 13.4603 17.5784C13.1215 17.3123 12.8731 16.9411 12.7511 16.5186C12.629 16.0961 12.6396 15.6442 12.7813 15.2284H7.88533C8.0028 15.5721 8.03104 15.9419 7.96719 16.3005C7.90335 16.6591 7.74968 16.994 7.52164 17.2714C7.2936 17.5488 6.99923 17.7589 6.66814 17.8807C6.33706 18.0025 5.98092 18.0316 5.63556 17.9651C5.2902 17.8986 4.9678 17.7388 4.70077 17.5019C4.43374 17.265 4.23151 16.9592 4.11442 16.6154C3.99732 16.2715 3.96949 15.9017 4.03373 15.5432C4.09797 15.1846 4.252 14.85 4.48035 14.5728L2.1709 1.38429H0.666667C0.489856 1.38429 0.320286 1.31136 0.195262 1.18155C0.0702379 1.05173 0 0.875668 0 0.692084C0 0.5085 0.0702379 0.332434 0.195262 0.20262C0.320286 0.0728067 0.489856 -0.000121934 0.666667 -0.000121934H2.1709C2.48319 -0.000265558 2.78562 0.113474 3.02538 0.321244C3.26515 0.529013 3.42702 0.817614 3.48275 1.13667L3.88973 3.46091H17.3333C17.431 3.46092 17.5274 3.4832 17.6159 3.52617C17.7043 3.56914 17.7826 3.63176 17.8451 3.7096C17.9077 3.78744 17.9531 3.8786 17.978 3.97664C18.0029 4.07467 18.0067 4.17719 17.9893 4.27694Z" fill="#5856D2" />
                    </svg>
                    <span class="header__basket-number">5</span>
                  </span>
                  <span class="header__basket-text">Корзина</span>
                </a>
              </div>
              <div class="burger" @click="toggleMobileMenu">
                <img src="/images/burger-icon.svg" alt="">
              </div>
            </div>
          </div>
          <div class="header-bottom__group">
            <div class="header__catalog">
              <div class="header__catalog-show" @click="toggleCatalog">
                <div class="catalog-burger" :class="{ 'catalog-burger--active': showCatalog }">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="catalog-burger__text">Каталог</div>
              </div>
              <div class="header__catalog-hidden" :class="{ 'header__catalog-hidden--active': showCatalog }">
                <div class="header__catalog-top">
                  <div class="header__catalog-title">
                    <span>Каталог</span>
                    <i class="header__catalog-close" @click="closeCatalog">
                      <img src="/images/close2.svg" alt="">
                    </i>
                  </div>
                </div>
                <div class="header__search">
                  <input type="search" placeholder="Поиск" v-model="searchQuery">
                  <button class="header__search-btn" @click="handleSearch">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.55259 1C7.05883 1 5.59862 1.44295 4.3566 2.27284C3.11458 3.10273 2.14655 4.28228 1.57491 5.66234C1.00327 7.04239 0.853706 8.56097 1.14512 10.026C1.43654 11.4911 2.15586 12.8368 3.21211 13.8931C4.26835 14.9493 5.6141 15.6686 7.07916 15.9601C8.54421 16.2515 10.0628 16.1019 11.4428 15.5303C12.8229 14.9586 14.0025 13.9906 14.8323 12.7486C15.6622 11.5066 16.1052 10.0464 16.1052 8.55259C16.1051 6.54956 15.3093 4.6286 13.8929 3.21224C12.4766 1.79589 10.5556 1.00013 8.55259 1Z" stroke="#604093" stroke-width="1.5" stroke-miterlimit="10" />
                      <path d="M14.1875 14.187L19.4621 19.4617" stroke="#604093" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                    </svg>
                  </button>
                </div>
                <div class="header__catalog-items2">
                  <div v-for="(category, index) in categories" :key="index" class="header__catalog-item2">
                    <div class="item-show" :class="{ 'item-show--active': category.mobileExpanded }" @click="toggleMobileCategory(index)">
                      <a href="catalog.html">
                        <img :src="category.icon" alt="">
                      </a>
                      <a href="catalog.html">{{ category.name }}</a>
                    </div>
                    <div class="item-hidden" :style="{ display: category.mobileExpanded ? 'block' : 'none' }">
                      <ul class="header__catalog-list">
                        <li v-for="(item, itemIndex) in category.items" :key="itemIndex">
                          <a href="">{{ item.title }}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="header__search">
              <input type="search" placeholder="Поиск" v-model="searchQuery">
              <button class="header__search-btn" @click="handleSearch">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.55259 1C7.05883 1 5.59862 1.44295 4.3566 2.27284C3.11458 3.10273 2.14655 4.28228 1.57491 5.66234C1.00327 7.04239 0.853706 8.56097 1.14512 10.026C1.43654 11.4911 2.15586 12.8368 3.21211 13.8931C4.26835 14.9493 5.6141 15.6686 7.07916 15.9601C8.54421 16.2515 10.0628 16.1019 11.4428 15.5303C12.8229 14.9586 14.0025 13.9906 14.8323 12.7486C15.6622 11.5066 16.1052 10.0464 16.1052 8.55259C16.1051 6.54956 15.3093 4.6286 13.8929 3.21224C12.4766 1.79589 10.5556 1.00013 8.55259 1Z" stroke="#604093" stroke-width="1.5" stroke-miterlimit="10" />
                  <path d="M14.1875 14.187L19.4621 19.4617" stroke="#604093" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                </svg>
              </button>
            </div>
          </div>
          <div class="search-mob" :class="{ 'search-mob--active': showMobileSearch }">
            <div class="header__search">
              <input type="search" placeholder="Поиск" v-model="searchQuery">
              <button class="header__search-btn open-search" @click="handleSearch">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.55259 1C7.05883 1 5.59862 1.44295 4.3566 2.27284C3.11458 3.10273 2.14655 4.28228 1.57491 5.66234C1.00327 7.04239 0.853706 8.56097 1.14512 10.026C1.43654 11.4911 2.15586 12.8368 3.21211 13.8931C4.26835 14.9493 5.6141 15.6686 7.07916 15.9601C8.54421 16.2515 10.0628 16.1019 11.4428 15.5303C12.8229 14.9586 14.0025 13.9906 14.8323 12.7486C15.6622 11.5066 16.1052 10.0464 16.1052 8.55259C16.1051 6.54956 15.3093 4.6286 13.8929 3.21224C12.4766 1.79589 10.5556 1.00013 8.55259 1Z" stroke="#604093" stroke-width="1.5" stroke-miterlimit="10" />
                  <path d="M14.1875 14.187L19.4621 19.4617" stroke="#604093" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="header-mob">
      <div class="header-mob__items">
        <a href="index.html" class="header-mob__item">
          <span class="header-mob__item-icon">
            <img src="/images/main-icon.svg" alt="">
          </span>
          <span class="header-mob__item-text">Главная</span>
        </a>
        <a href="" class="header-mob__item">
          <span class="header-mob__item-icon">
            <img src="/images/favourites-icon2.svg" alt="">
            <span class="header-mob__item-number">5</span>
          </span>
          <span class="header-mob__item-text">Избранное</span>
        </a>
        <a href="" class="header-mob__item">
          <span class="header-mob__item-icon">
            <img src="/images/basket-icon2.svg" alt="">
            <span class="header-mob__item-number">1</span>
          </span>
          <span class="header-mob__item-text">Корзина</span>
        </a>
        <a href="profile.html" class="header-mob__item">
          <span class="header-mob__item-icon">
            <img src="/images/user-icon.svg" alt="">
          </span>
          <span class="header-mob__item-text">Профиль</span>
        </a>
      </div>
    </div>
    
    <div class="header__catalog-bg" :class="{ 'bg--active': showCatalog }" @click="closeCatalog"></div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      selectedLanguage: 'RU',
      showCatalog: false,
      showMobileSearch: false,
      searchQuery: '',
      activeTab: 1,
      categories: [
        {
          name: 'Картины',
          icon: '/images/catalog-icon11.svg',
          count: 456,
          mobileExpanded: false,
          items: [
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            }
          ]
        },
        {
          name: 'Дом и стиль жизни',
          icon: '/images/catalog-icon12.svg',
          count: 456,
          mobileExpanded: false,
          items: [
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            }
          ]
        },
        {
          name: 'Рисунок, графика',
          icon: '/images/catalog-icon13.svg',
          count: 456,
          mobileExpanded: false,
          items: [
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            }
          ]
        },
        {
          name: 'Аксессуары',
          icon: '/images/catalog-icon14.svg',
          count: 456,
          mobileExpanded: false,
          items: [
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            }
          ]
        },
        {
          name: 'Сумки и кошельки',
          icon: '/images/catalog-icon15.svg',
          count: 456,
          mobileExpanded: false,
          items: [
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            }
          ]
        },
        {
          name: 'Украшения',
          icon: '/images/catalog-icon16.svg',
          count: 456,
          mobileExpanded: false,
          items: [
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            }
          ]
        },
        {
          name: 'Игрушки и игры',
          icon: '/images/catalog-icon17.svg',
          count: 456,
          mobileExpanded: false,
          items: [
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            }
          ]
        },
        {
          name: 'Материалы для творчества',
          icon: '/images/catalog-icon18.svg',
          count: 456,
          mobileExpanded: false,
          items: [
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            }
          ]
        },
        {
          name: 'Коллекционирование',
          icon: '/images/catalog-icon19.svg',
          count: 456,
          mobileExpanded: false,
          items: [
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            },
            {
              title: 'Дом и стиль жизни',
              expanded: false,
              subItems: ['Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения', 'Украшения']
            }
          ]
        }
      ]
    }
  },
  methods: {
    changeLanguage() {
      console.log('Language changed to:', this.selectedLanguage);
    },
    toggleCatalog() {
      this.showCatalog = !this.showCatalog;
      if (this.showCatalog) {
        document.body.classList.add('fixed-body');
      } else {
        document.body.classList.remove('fixed-body');
      }
    },
    closeCatalog() {
      this.showCatalog = false;
      document.body.classList.remove('fixed-body');
    },
    toggleMobileSearch() {
      this.showMobileSearch = !this.showMobileSearch;
    },
    toggleMobileMenu() {
      console.log('Mobile menu toggled');
    },
    handleSearch() {
      console.log('Search:', this.searchQuery);
    },
    setActiveTab(tabIndex) {
      this.activeTab = tabIndex;
    },
    toggleCategoryExpansion(categoryIndex, itemIndex) {
      this.categories[categoryIndex].items[itemIndex].expanded = !this.categories[categoryIndex].items[itemIndex].expanded;
    },
    toggleMobileCategory(categoryIndex) {
      this.categories[categoryIndex].mobileExpanded = !this.categories[categoryIndex].mobileExpanded;
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header__catalog') && !e.target.closest('.header__catalog-bg')) {
        this.showCatalog = false;
        document.body.classList.remove('fixed-body');
      }
    });
  }
}
</script>

<style>
@import '../assets/header.css';
</style>
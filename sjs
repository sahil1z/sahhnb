<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="icon" href="logo.png" type="image/png" />
  <link rel="stylesheet" href="style.css" />
  <title>Kisan Bazaar</title>
</head>
<body>
  <header class="section-navbar">
    <section class="top_txt">
      <div class="head container">
        <div class="head_txt"></div>
        <div class="sign_in_up">
          <a href="/login.html">LOGOUT</a>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="navbar-brand">
        <a href="Second.html"><img src="./images/logo.png" alt="Kisan Bazaar" class="logo"></a>
      </div>
      <nav class="navbar">
        <ul>
          <li class="nav-item"><a href="Second.html" class="nav-link">Home</a></li>
          <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
          <li class="nav-item"><a href="products.html" class="nav-link">Products</a></li>
          <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
        </ul>
      </nav>
      <div class="search-container">
        <input type="text" id="search" placeholder="Search for Product" />
        <div id="autocomplete-list" class="autocomplete-items"></div>
      </div>
    </div>
  </header>

  <main>
    <section class="section-hero">
      <div class="container grid grid-two--cols">
        <div class="section-hero--content">
          <p class="hero-subheading">Explore the Vegetables and Fruits</p>
          <h1 class="hero-heading">Your Destination for Fresh Grocery!</h1>
          <p class="hero-para">
            Welcome to Kisan Bazaar, your ultimate destination for fresh grocery online!
          </p>
        </div>
        <div class="section-hero-image" data-aos="fade-up" data-aos-delay="600">
          <figure>
            <img src="./images/heroSection.png" alt="Fresh Grocery" />
          </figure>
        </div>
      </div>
      <div class="custom-shape-divider-bottom-1696038172">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>

    <section class="section-extra-product">
      <div class="container grid grid-three--cols">
        <div class="div-extra grid grid-two--cols">
          <div class="extra-text">
            <p>Extra 10% off</p>
            <h3>On orders above Rs: 200</h3>
            <a href="./products.html">Shop now</a>
          </div>
          <div class="extra-img extra-laptop">
            <img src="./images/laptop.png" alt="Extra Offer Laptop" />
          </div>
        </div>
        <div class="div-extra grid grid-two--cols">
          <div class="extra-text">
            <p>Extra 20% off</p>
            <h3>On orders above Rs: 300</h3>
            <a href="./products.html">Shop now</a>
          </div>
          <div class="extra-img">
            <img src="./images/headphoneEcom.png" alt="Extra Offer Headphones" />
          </div>
        </div>
        <div class="div-extra grid grid-two--cols">
          <div class="extra-text">
            <p>Extra 30% off</p>
            <h3>On orders above Rs: 500</h3>
            <a href="./products.html">Shop now</a>
          </div>
          <div class="extra-img">
            <img src="./images/mobiles.png" alt="Extra Offer Mobiles" />
          </div>
        </div>
      </div>
    </section>

    <section class="section-policy">
      <div class="container grid grid-four--cols">
        <div class="div-policy">
          <div class="icons"><i class="fa-solid fa-truck-fast"></i></div>
          <div class="div-policy-text">
            <p>Local Area Shipping</p>
            <p>Fast Shipping</p>
          </div>
        </div>
        <div class="div-policy">
          <div class="icons"><i class="fa-solid fa-rotate"></i></div>
          <div class="div-policy-text">
            <p>Easy Order Facility</p>
            <p>User Friendly</p>
          </div>
        </div>
        <div class="div-policy">
          <div class="icons"><i class="fa-solid fa-hand-holding-dollar"></i></div>
          <div class="div-policy-text">
            <p>Reasonable Rate</p>
            <p>Than Other Vendors</p>
          </div>
        </div>
        <div class="div-policy">
          <div class="icons"><i class="fa-solid fa-headset"></i></div>
          <div class="div-policy-text">
            <p>Customer Service</p>
            <p>24/7 Available</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="section-footer">
    <div class="footer-container container">
      <div class="content_1">
        <img src="./images/logo.png" alt="logo" />
        <p>Welcome to Kisan Bazaar, your ultimate destination for all grocery needs!</p>
        <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="cards" />
      </div>
      <div class="content_2">
        <h4>SHOPPING</h4>
        <a href="./products.html">Vegetables</a>
        <a href="./products.html">Fruits</a>
        <a href="./products.html">Seasonal Fruits</a>
      </div>
      <div class="content_3">
        <h4>Experience</h4>
        <a href="./contact.html">Contact Us</a>
        <a href="./payment.html" target="_blank">Payment Method</a>
        <a href="./contact.html" target="_blank">Delivery</a>
      </div>
      <hr />
    </div>
    <div class="f-design">
      <p>© 2024 Kisan Bazaar. All rights reserved.</p>
    </div>
  </footer>

  <script src="incrementDecrement.js"></script>
  <script src="main.js"></script>
  <script>
    window.embeddedChatbotConfig = { chatbotId: "_7MIjZYu-ZQ0yzQgSxk7k", domain: "www.chatbase.co" };
  </script>
  <script src="https://www.chatbase.co/embed.min.js" chatbotId="_7MIjZYu-ZQ0yzQgSxk7k" domain="www.chatbase.co" defer></script>
  <script src="autocomplete.js"></script>
</body>
</html>

(function(){"use strict";var t={1824:function(t,e,a){var o=a(5130),s=a(6768);const r={id:"app"};function l(t,e,a,o,l,n){const i=(0,s.g2)("AppHeader"),c=(0,s.g2)("router-view"),u=(0,s.g2)("AppFooter"),d=(0,s.g2)("AboutPage");return(0,s.uX)(),(0,s.CE)("div",r,[(0,s.bF)(i),(0,s.bF)(c),(0,s.bF)(u),(0,s.bF)(d)])}var n=a.p+"img/logo.839b1ad0.png";const i={class:"app-header"},c={class:"nav-buttons"};function u(t,e){const a=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("header",i,[e[4]||(e[4]=(0,s.Lk)("div",{class:"header-left"},[(0,s.Lk)("img",{src:n,alt:"Логотип",class:"logo"}),(0,s.Lk)("h1",null,"Old Man's Wheel")],-1)),(0,s.Lk)("nav",c,[(0,s.bF)(a,{to:"/catalog",class:"btn"},{default:(0,s.k6)((()=>e[0]||(e[0]=[(0,s.eW)("Каталог")]))),_:1}),(0,s.bF)(a,{to:"/about",class:"btn"},{default:(0,s.k6)((()=>e[1]||(e[1]=[(0,s.eW)("Про нас")]))),_:1}),(0,s.bF)(a,{to:"/account",class:"btn"},{default:(0,s.k6)((()=>e[2]||(e[2]=[(0,s.eW)("Сторінка")]))),_:1}),(0,s.bF)(a,{to:"/login",class:"btn"},{default:(0,s.k6)((()=>e[3]||(e[3]=[(0,s.eW)("Вхід")]))),_:1})])])}var d=a(1241);const h={},p=(0,d.A)(h,[["render",u],["__scopeId","data-v-2f2fba50"]]);var g=p;const m={class:"app-footer"};function v(t,e){return(0,s.uX)(),(0,s.CE)("footer",m,e[0]||(e[0]=[(0,s.Lk)("p",null,"© 2025 Old Man's Wheel. Всі права захищені.",-1)]))}const k={},f=(0,d.A)(k,[["render",v],["__scopeId","data-v-635cc5fe"]]);var y=f,b={name:"App",components:{AppHeader:g,AppFooter:y}};const C=(0,d.A)(b,[["render",l]]);var L=C,w=a(1387),_=a(4232);const E={class:"catalog"},I={class:"nav"},P={class:"search-bar"},A=["value"],X={class:"content"},O={class:"catalog-grid"},S=["onClick"],U={class:"image"},j=["src"],F={class:"title"},T={class:"item-details"},$={class:"price"},x=["onClick"],J={class:"modal-content"},Q=["src"],D={class:"price"},M={class:"modal-content"},R={key:0},V={key:1},N={class:"item-details"},W={class:"item-name"},q={class:"item-price"},z={class:"item-quantity"},B={class:"total"};function H(t,e,a,r,l,n){return(0,s.uX)(),(0,s.CE)("div",E,[(0,s.Lk)("div",I,[(0,s.Lk)("div",P,[(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>l.searchQuery=t),placeholder:"Search for parts..."},null,512),[[o.Jo,l.searchQuery]]),(0,s.bo)((0,s.Lk)("select",{"onUpdate:modelValue":e[1]||(e[1]=t=>l.selectedCategory=t)},[e[10]||(e[10]=(0,s.Lk)("option",{value:""},"All Categories",-1)),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.categories,(t=>((0,s.uX)(),(0,s.CE)("option",{key:t.id,value:t.id},(0,_.v_)(t.name),9,A)))),128))],512),[[o.u1,l.selectedCategory]]),(0,s.Lk)("button",{onClick:e[2]||(e[2]=(...t)=>n.search&&n.search(...t))},"Search")]),(0,s.Lk)("button",{onClick:e[3]||(e[3]=(...t)=>n.toggleCart&&n.toggleCart(...t))},"Кошик")]),(0,s.Lk)("div",X,[(0,s.Lk)("div",O,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(n.filteredProducts,(t=>((0,s.uX)(),(0,s.CE)("div",{key:t.id,class:"catalog-item",onClick:e=>n.showProductDetails(t)},[(0,s.Lk)("div",U,[(0,s.Lk)("img",{src:t.image,alt:"Product Image"},null,8,j)]),(0,s.Lk)("div",F,(0,_.v_)(t.name),1),(0,s.Lk)("div",T,[(0,s.Lk)("div",$,(0,_.v_)(t.price)+" USD",1),(0,s.Lk)("button",{onClick:(0,o.D$)((e=>n.addToCart(t)),["stop"])},"Add to Cart",8,x)])],8,S)))),128))])]),l.selectedProduct?((0,s.uX)(),(0,s.CE)("div",{key:0,class:"modal",onClick:e[6]||(e[6]=(0,o.D$)(((...t)=>n.closeModal&&n.closeModal(...t)),["self"]))},[(0,s.Lk)("div",J,[(0,s.Lk)("span",{class:"close",onClick:e[4]||(e[4]=(...t)=>n.closeModal&&n.closeModal(...t))},"×"),(0,s.Lk)("h2",null,(0,_.v_)(l.selectedProduct.name),1),(0,s.Lk)("img",{src:l.selectedProduct.image,alt:"Product Image"},null,8,Q),(0,s.Lk)("p",null,(0,_.v_)(l.selectedProduct.description),1),(0,s.Lk)("div",D,(0,_.v_)(l.selectedProduct.price)+" USD",1),(0,s.Lk)("button",{onClick:e[5]||(e[5]=t=>n.addToCart(l.selectedProduct))},"Add to Cart")])])):(0,s.Q3)("",!0),l.showCart?((0,s.uX)(),(0,s.CE)("div",{key:1,class:"modal",onClick:e[9]||(e[9]=(0,o.D$)(((...t)=>n.toggleCart&&n.toggleCart(...t)),["self"]))},[(0,s.Lk)("div",M,[(0,s.Lk)("span",{class:"close",onClick:e[7]||(e[7]=(...t)=>n.toggleCart&&n.toggleCart(...t))},"×"),e[11]||(e[11]=(0,s.Lk)("h2",null,"Ваш кошик",-1)),0===l.cartItems.length?((0,s.uX)(),(0,s.CE)("div",R,"Ваш кошик порожній")):((0,s.uX)(),(0,s.CE)("div",V,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.cartItems,(t=>((0,s.uX)(),(0,s.CE)("div",{key:t.id,class:"cart-item"},[(0,s.Lk)("div",N,[(0,s.Lk)("span",W,(0,_.v_)(t.name),1),(0,s.Lk)("span",q,(0,_.v_)(t.price)+" USD",1),(0,s.Lk)("span",z,"Кількість: "+(0,_.v_)(t.quantity),1)])])))),128)),(0,s.Lk)("div",B," Всього: "+(0,_.v_)(n.total)+" USD ",1),(0,s.Lk)("button",{onClick:e[8]||(e[8]=(...t)=>n.checkout&&n.checkout(...t))},"Оформити замовлення")]))])])):(0,s.Q3)("",!0)])}a(4114),a(8992),a(4520),a(8872);var K={data(){return{products:[],categories:[],searchQuery:"",selectedCategory:"",selectedProduct:null,showCart:!1,cartItems:[]}},computed:{filteredProducts(){return this.products.filter((t=>(""===this.selectedCategory||t.category_id===this.selectedCategory)&&(""===this.searchQuery||t.name.toLowerCase().includes(this.searchQuery.toLowerCase()))))},total(){return this.cartItems.reduce(((t,e)=>t+e.price*e.quantity),0)}},async created(){try{const t=await fetch("http://localhost:8080/api/products"),e=await t.json();t.ok?this.products=e:alert(e.message);const a=await fetch("http://localhost:8080/api/categories"),o=await a.json();a.ok?this.categories=o:alert(o.message),this.fetchCartItems()}catch(t){console.error("Error fetching data:",t)}},methods:{goToPage(t){this.$router.push(`/${t}`)},async addToCart(t){try{const e=localStorage.getItem("token");if(!e)return alert("Please log in to add items to the cart."),void this.$router.push("/login");const a=await fetch("http://localhost:8080/api/cart",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({product_id:t.id,quantity:1})}),o=await a.json();a.ok?(alert("Product added to cart"),this.fetchCartItems()):alert(o.message)}catch(e){console.error("Error adding to cart:",e)}},async fetchCartItems(){try{const t=localStorage.getItem("token");if(!t)return;const e=await fetch("http://localhost:8080/api/cart",{headers:{Authorization:`Bearer ${t}`}}),a=await e.json();e.ok?this.cartItems=a:alert(a.message)}catch(t){console.error("Error fetching cart items:",t)}},search(){},showProductDetails(t){this.selectedProduct=t},closeModal(){this.selectedProduct=null},toggleCart(){this.showCart=!this.showCart},async checkout(){alert("Checkout functionality is not implemented yet.")}}};const G=(0,d.A)(K,[["render",H],["__scopeId","data-v-2b57dc1a"]]);var Y=G;const Z={class:"about-page"};function tt(t,e){return(0,s.uX)(),(0,s.CE)("div",Z,e[0]||(e[0]=[(0,s.Fv)('<div class="info-box" data-v-442b88a2><h1 data-v-442b88a2>Про нас</h1><h2 data-v-442b88a2>Інформація про компанію</h2><p data-v-442b88a2> Ласкаво просимо до Old Man&#39;s Wheel, вашого надійного партнера у світі автозапчастин! Ми спеціалізуємося на постачанні якісних автозапчастин для легкових та вантажних автомобілів. Наш асортимент включає широкий вибір продукції від провідних світових брендів. </p><h2 data-v-442b88a2>Наші послуги</h2><ul data-v-442b88a2><li data-v-442b88a2>Мийка автомобілів</li><li data-v-442b88a2>Ремонт і технічне обслуговування</li><li data-v-442b88a2>Продаж автозапчастин</li><li data-v-442b88a2>Шиномонтаж</li><li data-v-442b88a2>Консультації експертів</li></ul><h2 data-v-442b88a2>Зв&#39;яжіться з нами</h2><p data-v-442b88a2>Email: <a href="mailto:old.mans.wheel@gmail.com" data-v-442b88a2>old.mans.wheel@gmail.com</a></p><p data-v-442b88a2>Телефон: +38 (123) 456-7890</p></div>',1)]))}const et={},at=(0,d.A)(et,[["render",tt],["__scopeId","data-v-442b88a2"]]);var ot=at,st=a.p+"img/vtulka.4b86682c.jpg";const rt={class:"user-page"},lt={class:"profile-header"},nt={class:"avatar"},it=["src"],ct={class:"username"},ut={class:"main-content"},dt={class:"history"},ht={class:"item-details"},pt={class:"item-name"},gt={class:"item-price"},mt={class:"item-quantity"},vt={class:"personal-data"};function kt(t,e,a,r,l,n){return(0,s.uX)(),(0,s.CE)("div",rt,[(0,s.Lk)("div",lt,[(0,s.Lk)("div",nt,[(0,s.Lk)("img",{src:l.user.profile_image||"@/assets/User.png",alt:"Аватар",class:"avatar-img"},null,8,it),(0,s.Lk)("input",{type:"file",onChange:e[0]||(e[0]=(...t)=>n.uploadImage&&n.uploadImage(...t))},null,32)]),(0,s.Lk)("div",ct,(0,_.v_)(l.user.username),1)]),(0,s.Lk)("div",ut,[(0,s.Lk)("div",dt,[e[7]||(e[7]=(0,s.Lk)("h2",null,"історія",-1)),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.historyItems,(t=>((0,s.uX)(),(0,s.CE)("div",{key:t.id,class:"item"},[e[6]||(e[6]=(0,s.Lk)("img",{src:st,alt:"картинка",class:"item-image"},null,-1)),(0,s.Lk)("div",ht,[(0,s.Lk)("span",pt,(0,_.v_)(t.name),1),(0,s.Lk)("span",gt,(0,_.v_)(t.price),1),(0,s.Lk)("span",mt,"Кількість: "+(0,_.v_)(t.quantity),1)])])))),128))])]),(0,s.Lk)("div",vt,[e[8]||(e[8]=(0,s.Lk)("h3",null,"особисті дані",-1)),(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=t=>l.user.username=t),placeholder:"Ім'я"},null,512),[[o.Jo,l.user.username]]),(0,s.bo)((0,s.Lk)("input",{type:"email","onUpdate:modelValue":e[2]||(e[2]=t=>l.user.email=t),placeholder:"Електронна пошта"},null,512),[[o.Jo,l.user.email]]),(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":e[3]||(e[3]=t=>l.user.full_name=t),placeholder:"Повне ім'я"},null,512),[[o.Jo,l.user.full_name]]),(0,s.Lk)("button",{onClick:e[4]||(e[4]=(...t)=>n.updateUser&&n.updateUser(...t)),class:"update-button"},"Оновити")]),(0,s.Lk)("button",{onClick:e[5]||(e[5]=(...t)=>n.logout&&n.logout(...t)),class:"logout"},"вихід")])}var ft={data(){return{user:{},historyItems:[]}},async created(){try{const t=localStorage.getItem("token");if(t){const e=await fetch("http://localhost:8080/api/user",{headers:{Authorization:`Bearer ${t}`}}),a=await e.json();e.ok?(this.user=a,this.fetchHistory()):alert(a.message)}else this.fetchHistory()}catch(t){console.error("Error fetching user data:",t)}},methods:{async fetchHistory(){try{const t=await fetch("http://localhost:8080/api/cart/1"),e=await t.json();t.ok?this.historyItems=e:alert(e.message)}catch(t){console.error("Error fetching history:",t)}},async updateUser(){try{const t=await fetch("http://localhost:8080/api/user",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({username:this.user.username,email:this.user.email,full_name:this.user.full_name})}),e=await t.json();t.ok?alert("Дані користувача успішно оновлено"):alert(e.message)}catch(t){console.error("Error updating user data:",t)}},async uploadImage(t){const e=t.target.files[0],a=new FormData;a.append("image",e);try{const t=await fetch("http://localhost:8080/api/upload",{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},body:a}),e=await t.json();t.ok?(this.user.profile_image=e.imageUrl,alert("Фото профілю успішно завантажено")):alert(e.message)}catch(o){console.error("Error uploading profile image:",o)}},logout(){localStorage.removeItem("token"),this.$router.push("/login")}}};const yt=(0,d.A)(ft,[["render",kt],["__scopeId","data-v-02fe6474"]]);var bt=yt;const Ct={class:"login-page"},Lt={class:"content-container"},wt={class:"white-box"},_t={class:"button-group"};function Et(t,e,a,r,l,n){return(0,s.uX)(),(0,s.CE)("div",Ct,[e[7]||(e[7]=(0,s.Lk)("div",{class:"background"},null,-1)),(0,s.Lk)("div",Lt,[(0,s.Lk)("div",wt,[(0,s.Lk)("h1",null,(0,_.v_)(l.isRegistering?"Реєстрація":"Вхід"),1),l.isRegistering?(0,s.bo)(((0,s.uX)(),(0,s.CE)("input",{key:0,type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>l.name=t),placeholder:"Ім'я"},null,512)),[[o.Jo,l.name]]):(0,s.Q3)("",!0),(0,s.bo)((0,s.Lk)("input",{type:"email","onUpdate:modelValue":e[1]||(e[1]=t=>l.email=t),placeholder:"Електронна пошта"},null,512),[[o.Jo,l.email]]),(0,s.bo)((0,s.Lk)("input",{type:"password","onUpdate:modelValue":e[2]||(e[2]=t=>l.password=t),placeholder:"Пароль"},null,512),[[o.Jo,l.password]]),l.isRegistering?(0,s.bo)(((0,s.uX)(),(0,s.CE)("input",{key:1,type:"text","onUpdate:modelValue":e[3]||(e[3]=t=>l.fullName=t),placeholder:"Повне ім'я"},null,512)),[[o.Jo,l.fullName]]):(0,s.Q3)("",!0),(0,s.Lk)("div",_t,[l.isRegistering?(0,s.Q3)("",!0):((0,s.uX)(),(0,s.CE)("button",{key:0,onClick:e[4]||(e[4]=(...t)=>n.login&&n.login(...t)),class:"login-button"}," Вхід ")),l.isRegistering?((0,s.uX)(),(0,s.CE)("button",{key:1,onClick:e[5]||(e[5]=(...t)=>n.register&&n.register(...t)),class:"register-button"}," Реєстрація ")):(0,s.Q3)("",!0),(0,s.Lk)("button",{onClick:e[6]||(e[6]=(...t)=>n.toggleForm&&n.toggleForm(...t)),class:"toggle-button"},(0,_.v_)(l.isRegistering?"Вхід":"Реєстрація"),1)])])])])}var It={data(){return{name:"",email:"",password:"",fullName:"",isRegistering:!1}},methods:{validateEmail(t){const e=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return e.test(String(t).toLowerCase())},validatePassword(t){return t.length>=6},validateUsername(t){return t.length>=3},async login(){try{const t=await fetch("http://localhost:8080/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:this.email,password:this.password})}),e=await t.json();t.ok?(localStorage.setItem("token",e.token),this.$router.push("/account")):alert(e.message)}catch(t){console.error("Error logging in:",t)}},async register(){if(this.validateEmail(this.email))if(this.validatePassword(this.password))if(this.validateUsername(this.name))try{const t=await fetch("http://localhost:8080/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.name,email:this.email,password:this.password,full_name:this.fullName})}),e=await t.json();t.ok?(alert("Реєстрація успішна! Тепер ви можете увійти."),this.toggleForm()):alert(e.message)}catch(t){console.error("Error registering:",t)}else alert("Нікнейм повинен містити мінімум 3 символи");else alert("Пароль повинен містити мінімум 6 символів");else alert("Невірний формат електронної пошти")},toggleForm(){this.isRegistering=!this.isRegistering}}};const Pt=(0,d.A)(It,[["render",Et],["__scopeId","data-v-1fc709bc"]]);var At=Pt;const Xt=[{path:"/",redirect:"/catalog"},{path:"/catalog",name:"CatalogPage",component:Y},{path:"/about",name:"AboutPage",component:ot},{path:"/account",name:"UserAccount",component:bt},{path:"/login",name:"LoginPage",component:At}],Ot=(0,w.aE)({history:(0,w.LA)(),routes:Xt});var St=Ot;(0,o.Ef)(L).use(St).mount("#app")}},e={};function a(o){var s=e[o];if(void 0!==s)return s.exports;var r=e[o]={exports:{}};return t[o].call(r.exports,r,r.exports,a),r.exports}a.m=t,function(){var t=[];a.O=function(e,o,s,r){if(!o){var l=1/0;for(u=0;u<t.length;u++){o=t[u][0],s=t[u][1],r=t[u][2];for(var n=!0,i=0;i<o.length;i++)(!1&r||l>=r)&&Object.keys(a.O).every((function(t){return a.O[t](o[i])}))?o.splice(i--,1):(n=!1,r<l&&(l=r));if(n){t.splice(u--,1);var c=s();void 0!==c&&(e=c)}}return e}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[o,s,r]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var o in e)a.o(e,o)&&!a.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.p="/"}(),function(){var t={524:0};a.O.j=function(e){return 0===t[e]};var e=function(e,o){var s,r,l=o[0],n=o[1],i=o[2],c=0;if(l.some((function(e){return 0!==t[e]}))){for(s in n)a.o(n,s)&&(a.m[s]=n[s]);if(i)var u=i(a)}for(e&&e(o);c<l.length;c++)r=l[c],a.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return a.O(u)},o=self["webpackChunkmy_website"]=self["webpackChunkmy_website"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=a.O(void 0,[504],(function(){return a(1824)}));o=a.O(o)})();
//# sourceMappingURL=app.f0c30c4c.js.map
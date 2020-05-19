import './style.css';
import logo from './39.jpg'
function component() {
    const element = document.createElement('div');
    const h1 = document.createElement('h1')
    h1.innerText = 'Hello Webpack Demo'
    // element.innerHTML = 'Hello webpack 12345'
    element.classList.add('title');
    const myImg = new Image()
    myImg.src = logo
    element.appendChild(h1)
    element.appendChild(myImg)
    return element
}

document.body.appendChild(component())

// 函数继承的方法总结
function GithubUser(username, password) {
    let _password = password 
    this.username = username 
    GithubUser.prototype.login = function () {
        console.log(this.username + '要登录Github，密码是' + _password)
    }
}
// 1.原型链继承
function JuejinUser(username, password) {
    this.articles = 3 // 文章数量
    const prototype = new GithubUser(username, password)
    prototype.readArticle = function () {
        console.log('Read article')
    }
    this.__proto__ = prototype
}

const juejinUser1 = new JuejinUser('ulivz', 'xxx', 3)
console.log(juejinUser1)
console.log(juejinUser1.login); // 可以访问到父类的login方法


// 2.构造函数继承 (通过call()方法来传入对象,继承)
function JuejinUser2(username,password) {
    this.articles = 4;
    // GithubUser.call(this,username,password)
    GithubUser.apply(this,[arguments])
}

const juejinUser2 = new JuejinUser2('jack','abc')
console.log(juejinUser2); 
console.log(juejinUser2.login); //undefined

//3.组合继承(类继承+构造函数继承)

function JuejinUser3(username,password) {
    this.articles =5;
    GithubUser.call(this,username,password)
}

JuejinUser3.prototype = new GithubUser()
// 重写 SubType.prototype 的 constructor 属性，指向自己的构造函数 SubType
JuejinUser3.prototype.constructor = JuejinUser3;  
const juejinUser3 = new JuejinUser3('Tom','sss');
console.log(juejinUser3);
//问题:  1.子类仍旧无法传递动态参数给父类   2.父类的构造函数被调用了两次。

// 4.原型继承
function JuejinUser4(username,password){
    JuejinUser.prototype = Object.create(GithubUser)
}

const juejinUser4 = new JuejinUser4('rose',18)
console.log('juejinUser4:',juejinUser4); //无法传参问题

// 5. 寄生式继承
function JuejinUser5(obj) {
    var clone = Object.create(obj)
    clone.readArticle = function () {
        console.log('Read article')
    }
    return clone;
}
let juejinUserSample = {
    username: 'ulivz',
    password: 'xxx'
}
const juejinUser5 = JuejinUser5(juejinUserSample);
console.log(juejinUser5);

// 6.寄生组合式继承

/*!
 * fancy-inherit
 * (c) 2016-2018 ULIVZ
 */
 
// 不同于object.assign, 该 merge方法会复制所有的源键
// 不管键名是 Symbol 或字符串，也不管是否可枚举
function fancyShadowMerge(target, source) {
    for (const key of Reflect.ownKeys(source)) {
        Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key))
    }
    return target
}

// Core
function inherit(child, parent) {
    const objectPrototype = Object.prototype
    // 继承父类的原型
    const parentPrototype = Object.create(parent.prototype)
    let childPrototype = child.prototype
    // 若子类没有继承任何类，直接合并子类原型和父类原型上的所有方法
    // 包含可枚举/不可枚举的方法
    if (Reflect.getPrototypeOf(childPrototype) === objectPrototype) {
        child.prototype = fancyShadowMerge(parentPrototype, childPrototype)
    } else {
        // 若子类已经继承子某个类
        // 父类的原型将在子类原型链的尽头补全
        while (Reflect.getPrototypeOf(childPrototype) !== objectPrototype) {
			childPrototype = Reflect.getPrototypeOf(childPrototype)
        }
		Reflect.setPrototypeOf(childPrototype, parent.prototype)
    }
    // 重写被污染的子类的constructor
    parentPrototype.constructor = child
}

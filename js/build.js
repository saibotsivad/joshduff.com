!function t(e,n,r){function i(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require
if(!a&&u)return u(s,!0)
if(o)return o(s,!0)
throw new Error("Cannot find module '"+s+"'")}var c=n[s]={exports:{}}
e[s][0].call(c.exports,function(t){var n=e[s][1][t]
return i(n?n:t)},c,c.exports,t,e,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s])
return i}({1:[function(t,e){var n=t("level-js"),r=t("levelup")
e.exports={clearCache:function(){var t=r("content",{db:n})
t.createKeyStream().on("data",function(e){t.del(e)})}}},{"level-js":5,levelup:14}],2:[function(t){var e=t("noddity-butler"),n=t("levelup"),r=t("level-js"),i=t("noddity-linkifier"),o=t("localstorage-down"),s=t("./routing"),a=t("./mainViewModel"),u=noddityConfig,c=window.indexedDB?r:function(t){return new o(t)},h=u.debug?{refreshEvery:3e4}:void 0,f=new e(u.noddityRoot,n("content",{db:c}),h),l=new i(u.pathPrefix+u.pagePathPrefix),p=new a(f,l),d=s()
d.on("current",p.setCurrent),u.debug&&(window.debug=t("./debug"))},{"./debug":1,"./mainViewModel":3,"./routing":4,"level-js":5,levelup:14,"localstorage-down":38,"noddity-butler":49,"noddity-linkifier":88}],3:[function(t,e){function n(){}var r=t("ractive"),i=noddityConfig,o=t("noddity-renderer")
e.exports=function(t,e){function s(t){console.log(t)}function a(){t.getPosts(function(t,e){t?s(t):g.set("postList",e.reverse().filter(function(t){return"string"==typeof t.metadata.title}).map(function(t){return{title:t.metadata.title,filename:t.filename}}))})}function u(e){t.getPost(e,function(t,n){t?(d.set("html",t.message),p.set("page",null),e!==i.errorPage&&(window.location=window.location.origin+window.location.pathname+i.pathPrefix+i.pagePathPrefix+i.errorPage)):(p.set("page",n.metadata.title),l?l(n):l=h.populateRootRactive(n,d),g.get("postList")||a())})}function c(t,e){function n(n){return n.filename===t&&n.title!==e.metadata.title}var r=g.get("postList")
r&&r.some(n)&&a()}var h=new o(t,e.linkify),f=Object.create(i),l=null,p=new r({el:"title",template:"{{title}}{{#page}} | {{page}}{{/page}}",data:{title:i.title}}),d=new r({el:"main",template:"#template-main",data:f}),g=new r({el:"menu",template:"#template-menu",data:f})
return e.on("link",function(e){t.getPost(e,n)}),t.on("post changed",c),t.on("index changed",a),{setCurrent:u}}},{"noddity-renderer":89,ractive:99}],4:[function(t,e){var n=noddityConfig,r=t("events").EventEmitter
e.exports=function(){var t=new r,e=Satnav({}).navigate({path:"!/"+n.pagePathPrefix+"{name}",directions:function(e){t.emit("current",e.name)}}).navigate({path:"!/",directions:function(){t.emit("current","index.md")}}).navigate({path:"",directions:function(){document.location=document.location+"#!/"}}).change(function(){window.scrollTo(0,0)}).otherwise("!/"+n.pagePathPrefix+"404.md")
return setTimeout(e.go.bind(e),0),t}},{events:104}],5:[function(t,e){function n(t){if(!(this instanceof n))return new n(t)
if(!t)throw new Error("constructor requires at least a location argument")
this.location=t}function r(t){for(var e=new ArrayBuffer(2*t.length),n=new Uint16Array(e),r=0,i=t.length;i>r;r++)n[r]=t.charCodeAt(r)
return e}e.exports=n
var i=t("idb-wrapper"),o=t("abstract-leveldown").AbstractLevelDOWN,s=t("util"),a=t("./iterator"),u=t("isbuffer")
s.inherits(n,o),n.prototype._open=function(t,e){var n=this
this.idb=new i({storeName:this.location,autoIncrement:!1,keyPath:null,onStoreReady:function(){e&&e(null,n.idb)},onError:function(t){e&&e(t)}})},n.prototype._get=function(t,e,n){this.idb.get(t,function(i){return void 0===i?n(new Error("NotFound")):(e.asBuffer===!1||u(i)||(i=r(String(i))),n(null,i,t))},n)},n.prototype._del=function(t,e,n){this.idb.remove(t,n,n)},n.prototype._put=function(t,e,n,r){this.idb.put(t,e,function(){r()},r)},n.prototype.iterator=function(t){return"object"!=typeof t&&(t={}),new a(this.idb,t)},n.prototype._batch=function(t,e,n){var r,i
for(i=0;i<t.length;i++)r=t[i],"del"===r.type&&(r.type="remove")
return this.idb.batch(t,function(){n()},n)},n.prototype._close=function(t){this.idb.db.close(),t()},n.prototype._approximateSize=function(){throw new Error("Not implemented")},n.prototype._isBuffer=u
n.prototype._checkKeyValue=function(t,e){return null===t||void 0===t?new Error(e+" cannot be `null` or `undefined`"):null===t||void 0===t?new Error(e+" cannot be `null` or `undefined`"):u(t)&&0===t.byteLength?new Error(e+" cannot be an empty ArrayBuffer"):""===String(t)?new Error(e+" cannot be an empty String"):0===t.length?new Error(e+" cannot be an empty Array"):void 0}},{"./iterator":6,"abstract-leveldown":9,"idb-wrapper":10,isbuffer:11,util:131}],6:[function(t,e){function n(t,e){e||(e={}),this.options=e,i.call(this,t),this._order=e.reverse?"DESC":"ASC",this._start=e.start,this._limit=e.limit,this._limit&&(this._count=0),this._end=e.end,this._done=!1}var r=t("util"),i=t("abstract-leveldown").AbstractIterator
e.exports=n,r.inherits(n,i),n.prototype.createIterator=function(){var t,e,n="undefined"!=typeof this._start&&"undefined"==typeof this._end,r="undefined"==typeof this._start&&"undefined"!=typeof this._end,i="undefined"!=typeof this._start&&"undefined"!=typeof this._end
if(n){var o=this._start
"ASC"===this._order?t=o:e=o}else if(r){var o=this._end
"DESC"===this._order?t=o:e=o}else i&&(t=this._start,e=this._end,this._start>this._end&&(t=this._end,e=this._start));(t||e)&&(this._keyRange=this.options.keyRange||this.db.makeKeyRange({lower:t,upper:e})),this.iterator=this.db.iterate(this.onItem.bind(this),{keyRange:this._keyRange,autoContinue:!1,order:this._order,onError:function(t){console.log("horrible error",t)}})},n.prototype.onItem=function(t,e){return!e&&this.callback?(this.callback(),void(this.callback=!1)):(this._limit&&this._limit>0?this._limit>this._count&&this.callback(!1,e.key,e.value):this.callback(!1,e.key,e.value),this._limit&&this._count++,void(e&&e.continue()))},n.prototype._next=function(t){return t?(this._started||(this.createIterator(),this._started=!0),void(this.callback=t)):new Error("next() requires a callback argument")}},{"abstract-leveldown":9,util:131}],7:[function(t,e){(function(t){function n(t){this._db=t,this._operations=[],this._written=!1}n.prototype._checkWritten=function(){if(this._written)throw new Error("write() already called on this batch")},n.prototype.put=function(t,e){this._checkWritten()
var n=this._db._checkKeyValue(t,"key",this._db._isBuffer)
if(n)throw n
if(n=this._db._checkKeyValue(e,"value",this._db._isBuffer))throw n
return this._db._isBuffer(t)||(t=String(t)),this._db._isBuffer(e)||(e=String(e)),this._operations.push({type:"put",key:t,value:e}),this},n.prototype.del=function(t){this._checkWritten()
var e=this._db._checkKeyValue(t,"key",this._db._isBuffer)
if(e)throw e
return this._db._isBuffer(t)||(t=String(t)),this._operations.push({type:"del",key:t}),this},n.prototype.clear=function(){return this._checkWritten(),this._operations=[],this},n.prototype.write=function(e,n){if(this._checkWritten(),"function"==typeof e&&(n=e),"function"!=typeof n)throw new Error("write() requires a callback argument")
return"object"!=typeof e&&(e={}),this._written=!0,"function"==typeof this._db._batch?this._db._batch(this._operations,e,n):void t.nextTick(n)},e.exports=n}).call(this,t("+0JsKK"))},{"+0JsKK":110}],8:[function(t,e){(function(t){function n(t){this.db=t,this._ended=!1,this._nexting=!1}n.prototype.next=function(e){var n=this
if("function"!=typeof e)throw new Error("next() requires a callback argument")
return n._ended?e(new Error("cannot call next() after end()")):n._nexting?e(new Error("cannot call next() before previous next() has completed")):(n._nexting=!0,"function"==typeof n._next?n._next(function(){n._nexting=!1,e.apply(null,arguments)}):void t.nextTick(function(){n._nexting=!1,e()}))},n.prototype.end=function(e){if("function"!=typeof e)throw new Error("end() requires a callback argument")
return this._ended?e(new Error("end() already called on iterator")):(this._ended=!0,"function"==typeof this._end?this._end(e):void t.nextTick(e))},e.exports=n}).call(this,t("+0JsKK"))},{"+0JsKK":110}],9:[function(t,e){(function(n,r){function i(t){if(!arguments.length||void 0===t)throw new Error("constructor requires at least a location argument")
if("string"!=typeof t)throw new Error("constructor requires a location string argument")
this.location=t}var o=t("./abstract-iterator"),s=t("./abstract-chained-batch")
i.prototype.open=function(t,e){if("function"==typeof t&&(e=t),"function"!=typeof e)throw new Error("open() requires a callback argument")
return"object"!=typeof t&&(t={}),"function"==typeof this._open?this._open(t,e):void n.nextTick(e)},i.prototype.close=function(t){if("function"!=typeof t)throw new Error("close() requires a callback argument")
return"function"==typeof this._close?this._close(t):void n.nextTick(t)},i.prototype.get=function(t,e,r){var i=this
if("function"==typeof e&&(r=e),"function"!=typeof r)throw new Error("get() requires a callback argument")
var o=i._checkKeyValue(t,"key",i._isBuffer)
return o?r(o):(i._isBuffer(t)||(t=String(t)),"object"!=typeof e&&(e={}),"function"==typeof i._get?i._get(t,e,r):void n.nextTick(function(){r(new Error("NotFound"))}))},i.prototype.put=function(t,e,r,i){if("function"==typeof r&&(i=r),"function"!=typeof i)throw new Error("put() requires a callback argument")
var o=this._checkKeyValue(t,"key",this._isBuffer)
return o?i(o):(o=this._checkKeyValue(e,"value",this._isBuffer))?i(o):(this._isBuffer(t)||(t=String(t)),this._isBuffer(e)||n.browser||(e=String(e)),"object"!=typeof r&&(r={}),"function"==typeof this._put?this._put(t,e,r,i):void n.nextTick(i))},i.prototype.del=function(t,e,r){if("function"==typeof e&&(r=e),"function"!=typeof r)throw new Error("del() requires a callback argument")
var i=this._checkKeyValue(t,"key",this._isBuffer)
return i?r(i):(this._isBuffer(t)||(t=String(t)),"object"!=typeof e&&(e={}),"function"==typeof this._del?this._del(t,e,r):void n.nextTick(r))},i.prototype.batch=function(t,e,r){if(!arguments.length)return this._chainedBatch()
if("function"==typeof e&&(r=e),"function"!=typeof r)throw new Error("batch(array) requires a callback argument")
if(!Array.isArray(t))return r(new Error("batch(array) requires an array argument"))
"object"!=typeof e&&(e={})
for(var i,o,s=0,a=t.length;a>s;s++)if(i=t[s],"object"==typeof i){if(o=this._checkKeyValue(i.type,"type",this._isBuffer))return r(o)
if(o=this._checkKeyValue(i.key,"key",this._isBuffer))return r(o)
if("put"==i.type&&(o=this._checkKeyValue(i.value,"value",this._isBuffer)))return r(o)}return"function"==typeof this._batch?this._batch(t,e,r):void n.nextTick(r)},i.prototype.approximateSize=function(t,e,r){if(null==t||null==e||"function"==typeof t||"function"==typeof e)throw new Error("approximateSize() requires valid `start`, `end` and `callback` arguments")
if("function"!=typeof r)throw new Error("approximateSize() requires a callback argument")
return this._isBuffer(t)||(t=String(t)),this._isBuffer(e)||(e=String(e)),"function"==typeof this._approximateSize?this._approximateSize(t,e,r):void n.nextTick(function(){r(null,0)})},i.prototype.iterator=function(t){return"object"!=typeof t&&(t={}),"function"==typeof this._iterator?this._iterator(t):new o(this)},i.prototype._chainedBatch=function(){return new s(this)},i.prototype._isBuffer=function(t){return r.isBuffer(t)},i.prototype._checkKeyValue=function(t,e){if(null===t||void 0===t)return new Error(e+" cannot be `null` or `undefined`")
if(null===t||void 0===t)return new Error(e+" cannot be `null` or `undefined`")
if(this._isBuffer(t)){if(0===t.length)return new Error(e+" cannot be an empty Buffer")}else if(""===String(t))return new Error(e+" cannot be an empty String")},e.exports.AbstractLevelDOWN=i,e.exports.AbstractIterator=o}).call(this,t("+0JsKK"),t("buffer").Buffer)},{"+0JsKK":110,"./abstract-chained-batch":7,"./abstract-iterator":8,buffer:101}],10:[function(t,e){!function(t,n,r){"function"==typeof define?define(n):"undefined"!=typeof e&&e.exports?e.exports=n():r[t]=n()}("IDBStore",function(){"use strict"
var t={storeName:"Store",storePrefix:"IDBWrapper-",dbVersion:1,keyPath:"id",autoIncrement:!0,onStoreReady:function(){},onError:function(t){throw t},indexes:[]},e=function(e,n){for(var r in t)this[r]="undefined"!=typeof e[r]?e[r]:t[r]
this.dbName=this.storePrefix+this.storeName,this.dbVersion=parseInt(this.dbVersion,10),n&&(this.onStoreReady=n),this.idb=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB,this.keyRange=window.IDBKeyRange||window.webkitIDBKeyRange||window.mozIDBKeyRange,this.consts={READ_ONLY:"readonly",READ_WRITE:"readwrite",VERSION_CHANGE:"versionchange",NEXT:"next",NEXT_NO_DUPLICATE:"nextunique",PREV:"prev",PREV_NO_DUPLICATE:"prevunique"},this.openDB()}
e.prototype={version:"1.2.0",db:null,dbName:null,dbVersion:null,store:null,storeName:null,keyPath:null,autoIncrement:null,indexes:null,features:null,onStoreReady:null,onError:null,_insertIdCount:0,openDB:function(){var t=this.features={}
t.hasAutoIncrement=!window.mozIndexedDB
var e=this.idb.open(this.dbName,this.dbVersion),n=!1
e.onerror=function(t){var e=!1
"error"in t.target?e="VersionError"==t.target.error.name:"errorCode"in t.target&&(e=12==t.target.errorCode),this.onError(e?new Error("The version number provided is lower than the existing one."):t)}.bind(this),e.onsuccess=function(t){if(!n){if(this.db)return void this.onStoreReady()
if(this.db=t.target.result,"string"==typeof this.db.version)return void this.onError(new Error("The IndexedDB implementation in this browser is outdated. Please upgrade your browser."))
if(!this.db.objectStoreNames.contains(this.storeName))return void this.onError(new Error("Something is wrong with the IndexedDB implementation in this browser. Please upgrade your browser."))
var e=this.db.transaction([this.storeName],this.consts.READ_ONLY)
this.store=e.objectStore(this.storeName),this.indexes.forEach(function(t){var e=t.name
if(!e)return n=!0,void this.onError(new Error("Cannot create index: No index name given."))
if(this.normalizeIndexData(t),this.hasIndex(e)){var r=this.store.index(e),i=this.indexComplies(r,t)
i||(n=!0,this.onError(new Error('Cannot modify index "'+e+'" for current version. Please bump version number to '+(this.dbVersion+1)+".")))}else n=!0,this.onError(new Error('Cannot create new index "'+e+'" for current version. Please bump version number to '+(this.dbVersion+1)+"."))},this),n||this.onStoreReady()}}.bind(this),e.onupgradeneeded=function(t){this.db=t.target.result,this.store=this.db.objectStoreNames.contains(this.storeName)?t.target.transaction.objectStore(this.storeName):this.db.createObjectStore(this.storeName,{keyPath:this.keyPath,autoIncrement:this.autoIncrement}),this.indexes.forEach(function(t){var e=t.name
if(e||(n=!0,this.onError(new Error("Cannot create index: No index name given."))),this.normalizeIndexData(t),this.hasIndex(e)){var r=this.store.index(e),i=this.indexComplies(r,t)
i||(this.store.deleteIndex(e),this.store.createIndex(e,t.keyPath,{unique:t.unique,multiEntry:t.multiEntry}))}else this.store.createIndex(e,t.keyPath,{unique:t.unique,multiEntry:t.multiEntry})},this)}.bind(this)},deleteDatabase:function(){this.idb.deleteDatabase&&this.idb.deleteDatabase(this.dbName)},put:function(t,e,r,i){null!==this.keyPath&&(i=r,r=e,e=t),i||(i=function(t){console.error("Could not write data.",t)}),r||(r=n)
var o,s=!1,a=null,u=this.db.transaction([this.storeName],this.consts.READ_WRITE)
u.oncomplete=function(){var t=s?r:i
t(a)},u.onabort=i,u.onerror=i,null!==this.keyPath?(this._addIdPropertyIfNeeded(e),o=u.objectStore(this.storeName).put(e)):o=u.objectStore(this.storeName).put(e,t),o.onsuccess=function(t){s=!0,a=t.target.result},o.onerror=i},get:function(t,e,r){r||(r=function(t){console.error("Could not read data.",t)}),e||(e=n)
var i=!1,o=null,s=this.db.transaction([this.storeName],this.consts.READ_ONLY)
s.oncomplete=function(){var t=i?e:r
t(o)},s.onabort=r,s.onerror=r
var a=s.objectStore(this.storeName).get(t)
a.onsuccess=function(t){i=!0,o=t.target.result},a.onerror=r},remove:function(t,e,r){r||(r=function(t){console.error("Could not remove data.",t)}),e||(e=n)
var i=!1,o=null,s=this.db.transaction([this.storeName],this.consts.READ_WRITE)
s.oncomplete=function(){var t=i?e:r
t(o)},s.onabort=r,s.onerror=r
var a=s.objectStore(this.storeName)["delete"](t)
a.onsuccess=function(t){i=!0,o=t.target.result},a.onerror=r},batch:function(t,e,r){r||(r=function(t){console.error("Could not apply batch.",t)}),e||(e=n),"[object Array]"!=Object.prototype.toString.call(t)&&r(new Error("dataArray argument must be of type Array."))
var i=this.db.transaction([this.storeName],this.consts.READ_WRITE)
i.oncomplete=function(){var t=a?e:r
t(a)},i.onabort=r,i.onerror=r
var o=t.length,s=!1,a=!1,u=function(){o--,0!==o||s||(s=!0,a=!0)}
t.forEach(function(t){var e=t.type,n=t.key,o=t.value,a=function(t){i.abort(),s||(s=!0,r(t,e,n))}
if("remove"==e){var c=i.objectStore(this.storeName)["delete"](n)
c.onsuccess=u,c.onerror=a}else if("put"==e){var h
null!==this.keyPath?(this._addIdPropertyIfNeeded(o),h=i.objectStore(this.storeName).put(o)):h=i.objectStore(this.storeName).put(o,n),h.onsuccess=u,h.onerror=a}},this)},getAll:function(t,e){e||(e=function(t){console.error("Could not read data.",t)}),t||(t=n)
var r=this.db.transaction([this.storeName],this.consts.READ_ONLY),i=r.objectStore(this.storeName)
i.getAll?this._getAllNative(r,i,t,e):this._getAllCursor(r,i,t,e)},_getAllNative:function(t,e,n,r){var i=!1,o=null
t.oncomplete=function(){var t=i?n:r
t(o)},t.onabort=r,t.onerror=r
var s=e.getAll()
s.onsuccess=function(t){i=!0,o=t.target.result},s.onerror=r},_getAllCursor:function(t,e,n,r){var i=[],o=!1,s=null
t.oncomplete=function(){var t=o?n:r
t(s)},t.onabort=r,t.onerror=r
var a=e.openCursor()
a.onsuccess=function(t){var e=t.target.result
e?(i.push(e.value),e["continue"]()):(o=!0,s=i)},a.onError=r},clear:function(t,e){e||(e=function(t){console.error("Could not clear store.",t)}),t||(t=n)
var r=!1,i=null,o=this.db.transaction([this.storeName],this.consts.READ_WRITE)
o.oncomplete=function(){var n=r?t:e
n(i)},o.onabort=e,o.onerror=e
var s=o.objectStore(this.storeName).clear()
s.onsuccess=function(t){r=!0,i=t.target.result},s.onerror=e},_addIdPropertyIfNeeded:function(t){this.features.hasAutoIncrement||"undefined"!=typeof t[this.keyPath]||(t[this.keyPath]=this._insertIdCount++ +Date.now())},getIndexList:function(){return this.store.indexNames},hasIndex:function(t){return this.store.indexNames.contains(t)},normalizeIndexData:function(t){t.keyPath=t.keyPath||t.name,t.unique=!!t.unique,t.multiEntry=!!t.multiEntry},indexComplies:function(t,e){var n=["keyPath","unique","multiEntry"].every(function(n){return"multiEntry"==n&&void 0===t[n]&&e[n]===!1?!0:e[n]==t[n]})
return n},iterate:function(t,e){e=i({index:null,order:"ASC",autoContinue:!0,filterDuplicates:!1,keyRange:null,writeAccess:!1,onEnd:null,onError:function(t){console.error("Could not open cursor.",t)}},e||{})
var n="desc"==e.order.toLowerCase()?"PREV":"NEXT"
e.filterDuplicates&&(n+="_NO_DUPLICATE")
var r=!1,o=this.db.transaction([this.storeName],this.consts[e.writeAccess?"READ_WRITE":"READ_ONLY"]),s=o.objectStore(this.storeName)
e.index&&(s=s.index(e.index)),o.oncomplete=function(){return r?void(e.onEnd?e.onEnd():t(null)):void e.onError(null)},o.onabort=e.onError,o.onerror=e.onError
var a=s.openCursor(e.keyRange,this.consts[n])
a.onerror=e.onError,a.onsuccess=function(n){var i=n.target.result
i?(t(i.value,i,o),e.autoContinue&&i["continue"]()):r=!0}},query:function(t,e){var n=[]
e=e||{},e.onEnd=function(){t(n)},this.iterate(function(t){n.push(t)},e)},count:function(t,e){e=i({index:null,keyRange:null},e||{})
var n=e.onError||function(t){console.error("Could not open cursor.",t)},r=!1,o=null,s=this.db.transaction([this.storeName],this.consts.READ_ONLY)
s.oncomplete=function(){var e=r?t:n
e(o)},s.onabort=n,s.onerror=n
var a=s.objectStore(this.storeName)
e.index&&(a=a.index(e.index))
var u=a.count(e.keyRange)
u.onsuccess=function(t){r=!0,o=t.target.result},u.onError=n},makeKeyRange:function(t){var e,n="undefined"!=typeof t.lower,r="undefined"!=typeof t.upper
switch(!0){case n&&r:e=this.keyRange.bound(t.lower,t.upper,t.excludeLower,t.excludeUpper)
break
case n:e=this.keyRange.lowerBound(t.lower,t.excludeLower)
break
case r:e=this.keyRange.upperBound(t.upper,t.excludeUpper)
break
default:throw new Error('Cannot create KeyRange. Provide one or both of "lower" or "upper" value.')}return e}}
var n=function(){},r={},i=function(t,e){var n,i
for(n in e)i=e[n],i!==r[n]&&i!==t[n]&&(t[n]=i)
return t}
return e.version=e.prototype.version,e},this)},{}],11:[function(t,e){function n(t){return r.isBuffer(t)||/\[object (.+Array|Array.+)\]/.test(Object.prototype.toString.call(t))}var r=t("buffer").Buffer
e.exports=n},{buffer:101}],12:[function(t,e){function n(t){this._levelup=t,this.batch=t.db.batch(),this.ops=[]}var r=t("./util"),i=t("./errors").WriteError,o=r.getOptions,s=r.dispatchError
n.prototype.put=function(t,e,n){n=o(this._levelup,n)
var s=r.encodeKey(t,n),a=r.encodeValue(e,n)
try{this.batch.put(s,a)}catch(u){throw new i(u)}return this.ops.push({type:"put",key:s,value:a}),this},n.prototype.del=function(t,e){e=o(this._levelup,e)
var n=r.encodeKey(t,e)
try{this.batch.del(n)}catch(s){throw new i(s)}return this.ops.push({type:"del",key:n}),this},n.prototype.clear=function(){try{this.batch.clear()}catch(t){throw new i(t)}return this.ops=[],this},n.prototype.write=function(t){var e=this._levelup,n=this.ops
try{this.batch.write(function(r){return r?s(e,new i(r),t):(e.emit("batch",n),void(t&&t()))})}catch(r){throw new i(r)}},e.exports=n},{"./errors":13,"./util":16}],13:[function(t,e){var n=t("errno").create,r=n("LevelUPError"),i=n("NotFoundError",r)
i.prototype.notFound=!0,i.prototype.status=404,e.exports={LevelUPError:r,InitializationError:n("InitializationError",r),OpenError:n("OpenError",r),ReadError:n("ReadError",r),WriteError:n("WriteError",r),NotFoundError:i,EncodingError:n("EncodingError",r)}},{errno:24}],14:[function(t,e){(function(n){function r(t,e){return"function"==typeof t?t:e}function i(t,e,r){if(!(this instanceof i))return new i(t,e,r)
var o
if(s.call(this),this.setMaxListeners(1/0),"function"==typeof t?(e="object"==typeof e?e:{},e.db=t,t=null):"object"==typeof t&&"function"==typeof t.db&&(e=t,t=null),"function"==typeof e&&(r=e,e={}),(!e||"function"!=typeof e.db)&&"string"!=typeof t){if(o=new v("Must provide a location for the database"),r)return n.nextTick(function(){r(o)})
throw o}e=E(this,e),this.options=u(_,e),this._status="new",c(this,"location",t,"e"),this.open(r)}function o(t){return function(e,n){x()[t](e,n||function(){})}}var s=t("events").EventEmitter,a=t("util").inherits,u=t("xtend"),c=t("prr"),h=t("deferred-leveldown"),f=t("./errors").WriteError,l=t("./errors").ReadError,p=t("./errors").NotFoundError,d=t("./errors").OpenError,g=t("./errors").EncodingError,v=t("./errors").InitializationError,m=t("./read-stream"),y=t("./write-stream"),b=t("./util"),w=t("./batch"),E=b.getOptions,_=b.defaultOptions,x=b.getLevelDOWN,k=b.dispatchError
a(i,s),i.prototype.open=function(t){var e,r,i=this
return this.isOpen()?(t&&n.nextTick(function(){t(null,i)}),this):this._isOpening()?t&&this.once("open",function(){t(null,i)}):(this.emit("opening"),this._status="opening",this.db=new h(this.location),e=this.options.db||x(),r=e(this.location),void r.open(this.options,function(e){return e?k(i,new d(e),t):(i.db.setDb(r),i.db=r,i._status="open",t&&t(null,i),i.emit("open"),i.emit("ready"),void 0)}))},i.prototype.close=function(t){var e=this
if(this.isOpen())this._status="closing",this.db.close(function(){e._status="closed",e.emit("closed"),t&&t.apply(null,arguments)}),this.emit("closing"),this.db=null
else{if("closed"==this._status&&t)return n.nextTick(t)
"closing"==this._status&&t?this.once("closed",t):this._isOpening()&&this.once("open",function(){e.close(t)})}},i.prototype.isOpen=function(){return"open"==this._status},i.prototype._isOpening=function(){return"opening"==this._status},i.prototype.isClosed=function(){return/^clos/.test(this._status)},i.prototype.get=function(t,e,n){var i,o=this
return n=r(e,n),"function"!=typeof n?k(this,new l("get() requires key and callback arguments")):this._isOpening()||this.isOpen()?(e=b.getOptions(this,e),i=b.encodeKey(t,e),e.asBuffer=b.isValueAsBuffer(e),void this.db.get(i,e,function(r,i){if(r)return r=/notfound/i.test(r)?new p("Key not found in database ["+t+"]",r):new l(r),k(o,r,n)
if(n){try{i=b.decodeValue(i,e)}catch(s){return n(new g(s))}n(null,i)}})):k(this,new l("Database is not open"),n)},i.prototype.put=function(t,e,n,i){var o,s,a=this
return i=r(n,i),null===t||void 0===t||null===e||void 0===e?k(this,new f("put() requires key and value arguments"),i):this._isOpening()||this.isOpen()?(n=E(this,n),o=b.encodeKey(t,n),s=b.encodeValue(e,n),void this.db.put(o,s,n,function(n){return n?k(a,new f(n),i):(a.emit("put",t,e),void(i&&i()))})):k(this,new f("Database is not open"),i)},i.prototype.del=function(t,e,n){var i,o=this
return n=r(e,n),null===t||void 0===t?k(this,new f("del() requires a key argument"),n):this._isOpening()||this.isOpen()?(e=E(this,e),i=b.encodeKey(t,e),void this.db.del(i,e,function(e){return e?k(o,new f(e),n):(o.emit("del",t),void(n&&n()))})):k(this,new f("Database is not open"),n)},i.prototype.batch=function(t,e,n){var i,o,s,a=this
return arguments.length?(n=r(e,n),Array.isArray(t)?this._isOpening()||this.isOpen()?(e=E(this,e),i=e.keyEncoding,o=e.valueEncoding,s=t.map(function(t){if(void 0===t.type||void 0===t.key)return{}
var n,r=t.keyEncoding||i,s=t.valueEncoding||t.encoding||o
return"utf8"!=r&&"binary"!=r||"utf8"!=s&&"binary"!=s?(n={type:t.type,key:b.encodeKey(t.key,e,t)},void 0!==t.value&&(n.value=b.encodeValue(t.value,e,t)),n):t}),void this.db.batch(s,e,function(e){return e?k(a,new f(e),n):(a.emit("batch",t),void(n&&n()))})):k(this,new f("Database is not open"),n):k(this,new f("batch() requires an array argument"),n)):new w(this)},i.prototype.approximateSize=function(t,e,n){var r,i,o=this
return null===t||void 0===t||null===e||void 0===e||"function"!=typeof n?k(this,new l("approximateSize() requires start, end and callback arguments"),n):(r=b.encodeKey(t,this.options),i=b.encodeKey(e,this.options),this._isOpening()||this.isOpen()?void this.db.approximateSize(r,i,function(t,e){return t?k(o,new d(t),n):void(n&&n(null,e))}):k(this,new f("Database is not open"),n))},i.prototype.readStream=i.prototype.createReadStream=function(t){var e=this
return t=u(this.options,t),new m(t,this,function(t){return e.db.iterator(t)})},i.prototype.keyStream=i.prototype.createKeyStream=function(t){return this.createReadStream(u(t,{keys:!0,values:!1}))},i.prototype.valueStream=i.prototype.createValueStream=function(t){return this.createReadStream(u(t,{keys:!1,values:!0}))},i.prototype.writeStream=i.prototype.createWriteStream=function(t){return new y(u(t),this)},i.prototype.toString=function(){return"LevelUP"},e.exports=i,e.exports.copy=b.copy,e.exports.destroy=o("destroy"),e.exports.repair=o("repair")}).call(this,t("+0JsKK"))},{"+0JsKK":110,"./batch":12,"./errors":13,"./read-stream":15,"./util":16,"./write-stream":17,"deferred-leveldown":19,events:104,prr:25,util:131,xtend:36}],15:[function(t,e){function n(t,e,i){if(!(this instanceof n))return new n(t,e,i)
r.call(this,{objectMode:!0,highWaterMark:t.highWaterMark}),this._db=e,t=this._options=o(u,t),this._keyEncoding=t.keyEncoding||t.encoding,this._valueEncoding=t.valueEncoding||t.encoding,"undefined"!=typeof this._options.start&&(this._options.start=a.encodeKey(this._options.start,this._options)),"undefined"!=typeof this._options.end&&(this._options.end=a.encodeKey(this._options.end,this._options)),"number"!=typeof this._options.limit&&(this._options.limit=-1),this._options.keyAsBuffer=a.isKeyAsBuffer(this._options),this._options.valueAsBuffer=a.isValueAsBuffer(this._options),this._makeData=this._options.keys&&this._options.values?c:this._options.keys?h:this._options.values?f:l
var s=this
this._db.isOpen()?this._iterator=i(this._options):this._db.once("ready",function(){s._destroyed||(s._iterator=i(s._options))})}var r=t("readable-stream").Readable,i=t("util").inherits,o=t("xtend"),s=t("./errors").EncodingError,a=t("./util"),u={keys:!0,values:!0},c=function(t,e){return{key:a.decodeKey(t,this._options),value:a.decodeValue(e,this._options)}},h=function(t){return a.decodeKey(t,this._options)},f=function(t,e){return a.decodeValue(e,this._options)},l=function(){return null}
i(n,r),n.prototype._read=function p(){var t=this
return t._db.isOpen()?void(t._destroyed||t._iterator.next(function(e,n,r){if(e||void 0===n&&void 0===r)return e||t._destroyed||t.push(null),t._cleanup(e)
try{r=t._makeData(n,r)}catch(i){return t._cleanup(new s(i))}t._destroyed||t.push(r)})):t._db.once("ready",function(){p.call(t)})},n.prototype._cleanup=function(t){if(!this._destroyed){this._destroyed=!0
var e=this
t&&e.emit("error",t),e._iterator?e._iterator.end(function(){e._iterator=null,e.emit("close")}):e.emit("close")}},n.prototype.destroy=function(){this._cleanup()},n.prototype.toString=function(){return"LevelUP.ReadStream"},e.exports=n},{"./errors":13,"./util":16,"readable-stream":35,util:131,xtend:36}],16:[function(t,e){(function(n,r){function i(t,e,n){t.readStream().pipe(e.writeStream()).on("close",n?n:function(){}).on("error",n?n:function(t){throw t})}function o(t,e){var n="string"==typeof e
return!n&&e&&e.encoding&&!e.valueEncoding&&(e.valueEncoding=e.encoding),m(t&&t.options||{},n?_[e]||_[w.valueEncoding]:e)}function s(){if(v)return v
var e,n=t("../package.json").devDependencies.leveldown,r="Could not locate LevelDOWN, try `npm install leveldown`"
try{e=t("leveldown/package").version}catch(i){throw new y(r)}if(!t("semver").satisfies(e,n))throw new y("Installed version of LevelDOWN ("+e+") does not match required version ("+n+")")
try{return v=t("leveldown")}catch(i){throw new y(r)}}function a(t,e,n){return"function"==typeof n?n(e):t.emit("error",e)}function u(t,e){var n=e&&e.keyEncoding||t.keyEncoding||"utf8"
return E[n]||n}function c(t,e){var n=e&&(e.valueEncoding||e.encoding)||t.valueEncoding||t.encoding||"utf8"
return E[n]||n}function h(t,e,n){return u(e,n).encode(t)}function f(t,e,n){return c(e,n).encode(t)}function l(t,e){return u(e).decode(t)}function p(t,e){return c(e).decode(t)}function d(t,e){return c(t,e).buffer}function g(t,e){return u(t,e).buffer}var v,m=t("xtend"),y=t("./errors").LevelUPError,b=["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le"],w={createIfMissing:!0,errorIfExists:!1,keyEncoding:"utf8",valueEncoding:"utf8",compression:!0},E=function(){function t(t){return void 0===t||null===t||r.isBuffer(t)}var e={}
return e.utf8=e["utf-8"]={encode:function(e){return t(e)?e:String(e)},decode:function(t){return t},buffer:!1,type:"utf8"},e.json={encode:JSON.stringify,decode:JSON.parse,buffer:!1,type:"json"},b.forEach(function(i){e[i]||(e[i]={encode:function(e){return t(e)?e:new r(e,i)},decode:function(t){return n.browser?t.toString(i):t},buffer:!0,type:i})}),e}(),_=function(){var t={}
return b.forEach(function(e){t[e]={valueEncoding:e}}),t}()
e.exports={defaultOptions:w,copy:i,getOptions:o,getLevelDOWN:s,dispatchError:a,encodeKey:h,encodeValue:f,isValueAsBuffer:d,isKeyAsBuffer:g,decodeValue:p,decodeKey:l}}).call(this,t("+0JsKK"),t("buffer").Buffer)},{"+0JsKK":110,"../package.json":37,"./errors":13,buffer:101,leveldown:100,"leveldown/package":100,semver:100,xtend:36}],17:[function(t,e){(function(n,r){function i(t,e){if(!(this instanceof i))return new i(t,e)
o.call(this),this._options=a(f,h(e,t)),this._db=e,this._buffer=[],this._status="init",this._end=!1,this.writable=!0,this.readable=!1
var n=this,r=function(){n.writable&&(n._status="ready",n.emit("ready"),n._process())}
e.isOpen()?c(r):e.once("ready",r)}var o=t("stream").Stream,s=t("util").inherits,a=t("xtend"),u=t("bl"),c=r.setImmediate||n.nextTick,h=t("./util").getOptions,f={type:"put"}
s(i,o),i.prototype.write=function(t){return this.writable?(this._buffer.push(t),"init"!=this._status&&this._processDelayed(),this._options.maxBufferLength&&this._buffer.length>this._options.maxBufferLength?(this._writeBlock=!0,!1):!0):!1},i.prototype.end=function(t){var e=this
t&&this.write(t),c(function(){e._end=!0,e._process()})},i.prototype.destroy=function(){this.writable=!1,this.end()},i.prototype.destroySoon=function(){this.end()},i.prototype.add=function(t){return t.props?(t.props.Directory?t.pipe(this._db.writeStream(this._options)):(t.props.File||t.File||"File"==t.type)&&this._write(t),!0):void 0},i.prototype._processDelayed=function(){var t=this
c(function(){t._process()})},i.prototype._process=function(){var t,e=this,n=function(t){return e.writable?("closed"!=e._status&&(e._status="ready"),t?(e.writable=!1,e.emit("error",t)):void e._process()):void 0}
return"ready"!=e._status&&e.writable?void(e._buffer.length&&"closed"!=e._status&&e._processDelayed()):e._buffer.length&&e.writable?(e._status="writing",t=e._buffer,e._buffer=[],e._db.batch(t.map(function(t){return{type:t.type||e._options.type,key:t.key,value:t.value,keyEncoding:t.keyEncoding||e._options.keyEncoding,valueEncoding:t.valueEncoding||t.encoding||e._options.valueEncoding}}),n),void(e._writeBlock&&(e._writeBlock=!1,e.emit("drain")))):void(e._end&&"closed"!=e._status&&(e._status="closed",e.writable=!1,e.emit("close")))},i.prototype._write=function(t){var e=t.path||t.props.path,n=this
e&&t.pipe(u(function(t,r){return t?(n.writable=!1,n.emit("error",t)):(n._options.fstreamRoot&&e.indexOf(n._options.fstreamRoot)>-1&&(e=e.substr(n._options.fstreamRoot.length+1)),void n.write({key:e,value:r.slice(0)}))}))},i.prototype.toString=function(){return"LevelUP.WriteStream"},e.exports=i}).call(this,t("+0JsKK"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"+0JsKK":110,"./util":16,bl:18,stream:128,util:131,xtend:36}],18:[function(t,e){(function(n){function r(t){if(!(this instanceof r))return new r(t)
if(this._bufs=[],this.length=0,"function"==typeof t){this._callback=t
var e=function(t){this._callback&&(this._callback(t),this._callback=null)}.bind(this)
this.on("pipe",function(t){t.on("error",e)}),this.on("unpipe",function(t){t.removeListener("error",e)})}else n.isBuffer(t)?this.append(t):Array.isArray(t)&&t.forEach(function(t){n.isBuffer(t)&&this.append(t)}.bind(this))
i.call(this)}var i=t("readable-stream").Duplex,o=t("util")
o.inherits(r,i),r.prototype._offset=function(t){for(var e,n=0,r=0;r<this._bufs.length;r++){if(e=n+this._bufs[r].length,e>t)return[r,t-n]
n=e}},r.prototype.append=function(t){return this._bufs.push(n.isBuffer(t)?t:new n(t)),this.length+=t.length,this},r.prototype._write=function(t,e,n){this.append(t),n&&n()},r.prototype._read=function(t){return this.length?(t=Math.min(t,this.length),this.push(this.slice(0,t)),void this.consume(t)):this.push(null)},r.prototype.end=function(t){i.prototype.end.call(this,t),this._callback&&(this._callback(null,this.slice()),this._callback=null)},r.prototype.get=function(t){return this.slice(t,t+1)[0]},r.prototype.slice=function(t,e){return this.copy(null,0,t,e)},r.prototype.copy=function(t,e,r,i){if(("number"!=typeof r||0>r)&&(r=0),("number"!=typeof i||i>this.length)&&(i=this.length),r>=this.length)return t||new n(0)
if(0>=i)return t||new n(0)
var o,s,a=!!t,u=this._offset(r),c=i-r,h=c,f=a&&e||0,l=u[1]
if(0===r&&i==this.length){if(!a)return n.concat(this._bufs)
for(s=0;s<this._bufs.length;s++)this._bufs[s].copy(t,f),f+=this._bufs[s].length
return t}if(h<=this._bufs[u[0]].length-l)return a?this._bufs[u[0]].copy(t,e,l,l+h):this._bufs[u[0]].slice(l,l+h)
for(a||(t=new n(c)),s=u[0];s<this._bufs.length;s++){if(o=this._bufs[s].length-l,!(h>o)){this._bufs[s].copy(t,f,l,l+h)
break}this._bufs[s].copy(t,f,l),f+=o,h-=o,l&&(l=0)}return t},r.prototype.toString=function(t,e,n){return this.slice(e,n).toString(t)},r.prototype.consume=function(t){for(;this._bufs.length;){if(!(t>this._bufs[0].length)){this._bufs[0]=this._bufs[0].slice(t),this.length-=t
break}t-=this._bufs[0].length,this.length-=this._bufs[0].length,this._bufs.shift()}return this},r.prototype.duplicate=function(){for(var t=0,e=new r;t<this._bufs.length;t++)e.append(this._bufs[t])
return e},r.prototype.destroy=function(){this._bufs.length=0,this.length=0,this.push(null)},function(){var t={readDoubleBE:8,readDoubleLE:8,readFloatBE:4,readFloatLE:4,readInt32BE:4,readInt32LE:4,readUInt32BE:4,readUInt32LE:4,readInt16BE:2,readInt16LE:2,readUInt16BE:2,readUInt16LE:2,readInt8:1,readUInt8:1}
for(var e in t)!function(e){r.prototype[e]=function(n){return this.slice(n,n+t[e])[e](0)}}(e)}(),e.exports=r}).call(this,t("buffer").Buffer)},{buffer:101,"readable-stream":35,util:131}],19:[function(t,e){(function(n,r){function i(t){s.call(this,"string"==typeof t?t:""),this._db=void 0,this._operations=[]}var o=t("util"),s=t("abstract-leveldown").AbstractLevelDOWN
o.inherits(i,s),i.prototype.setDb=function(t){this._db=t,this._operations.forEach(function(e){t[e.method].apply(t,e.args)})},i.prototype._open=function(t,e){return n.nextTick(e)},i.prototype._operation=function(t,e){return this._db?this._db[t].apply(this._db,e):void this._operations.push({method:t,args:e})},"put get del batch approximateSize".split(" ").forEach(function(t){i.prototype["_"+t]=function(){this._operation(t,arguments)}}),i.prototype._isBuffer=function(t){return r.isBuffer(t)},i.prototype._iterator=function(){throw new TypeError("not implemented")},e.exports=i}).call(this,t("+0JsKK"),t("buffer").Buffer)},{"+0JsKK":110,"abstract-leveldown":22,buffer:101,util:131}],20:[function(t,e){(function(t){function n(t){this._db=t,this._operations=[],this._written=!1}n.prototype._checkWritten=function(){if(this._written)throw new Error("write() already called on this batch")},n.prototype.put=function(t,e){this._checkWritten()
var n=this._db._checkKeyValue(t,"key",this._db._isBuffer)
if(n)throw n
if(n=this._db._checkKeyValue(e,"value",this._db._isBuffer))throw n
return this._db._isBuffer(t)||(t=String(t)),this._db._isBuffer(e)||(e=String(e)),"function"==typeof this._put?this._put(t,e):this._operations.push({type:"put",key:t,value:e}),this},n.prototype.del=function(t){this._checkWritten()
var e=this._db._checkKeyValue(t,"key",this._db._isBuffer)
if(e)throw e
return this._db._isBuffer(t)||(t=String(t)),"function"==typeof this._del?this._del(t):this._operations.push({type:"del",key:t}),this},n.prototype.clear=function(){return this._checkWritten(),this._operations=[],"function"==typeof this._clear&&this._clear(),this},n.prototype.write=function(e,n){if(this._checkWritten(),"function"==typeof e&&(n=e),"function"!=typeof n)throw new Error("write() requires a callback argument")
return"object"!=typeof e&&(e={}),this._written=!0,"function"==typeof this._write?this._write(n):"function"==typeof this._db._batch?this._db._batch(this._operations,e,n):void t.nextTick(n)},e.exports=n}).call(this,t("+0JsKK"))},{"+0JsKK":110}],21:[function(t,e){e.exports=t(8)},{"+0JsKK":110}],22:[function(t,e){(function(n,r){function i(t){if(!arguments.length||void 0===t)throw new Error("constructor requires at least a location argument")
if("string"!=typeof t)throw new Error("constructor requires a location string argument")
this.location=t}var o=t("xtend"),s=t("./abstract-iterator"),a=t("./abstract-chained-batch")
i.prototype.open=function(t,e){if("function"==typeof t&&(e=t),"function"!=typeof e)throw new Error("open() requires a callback argument")
return"object"!=typeof t&&(t={}),"function"==typeof this._open?this._open(t,e):void n.nextTick(e)},i.prototype.close=function(t){if("function"!=typeof t)throw new Error("close() requires a callback argument")
return"function"==typeof this._close?this._close(t):void n.nextTick(t)},i.prototype.get=function(t,e,r){var i
if("function"==typeof e&&(r=e),"function"!=typeof r)throw new Error("get() requires a callback argument")
return(i=this._checkKeyValue(t,"key",this._isBuffer))?r(i):(this._isBuffer(t)||(t=String(t)),"object"!=typeof e&&(e={}),"function"==typeof this._get?this._get(t,e,r):void n.nextTick(function(){r(new Error("NotFound"))}))},i.prototype.put=function(t,e,r,i){var o
if("function"==typeof r&&(i=r),"function"!=typeof i)throw new Error("put() requires a callback argument")
return(o=this._checkKeyValue(t,"key",this._isBuffer))?i(o):(o=this._checkKeyValue(e,"value",this._isBuffer))?i(o):(this._isBuffer(t)||(t=String(t)),this._isBuffer(e)||n.browser||(e=String(e)),"object"!=typeof r&&(r={}),"function"==typeof this._put?this._put(t,e,r,i):void n.nextTick(i))},i.prototype.del=function(t,e,r){var i
if("function"==typeof e&&(r=e),"function"!=typeof r)throw new Error("del() requires a callback argument")
return(i=this._checkKeyValue(t,"key",this._isBuffer))?r(i):(this._isBuffer(t)||(t=String(t)),"object"!=typeof e&&(e={}),"function"==typeof this._del?this._del(t,e,r):void n.nextTick(r))},i.prototype.batch=function(t,e,r){if(!arguments.length)return this._chainedBatch()
if("function"==typeof e&&(r=e),"function"!=typeof r)throw new Error("batch(array) requires a callback argument")
if(!Array.isArray(t))return r(new Error("batch(array) requires an array argument"))
"object"!=typeof e&&(e={})
for(var i,o,s=0,a=t.length;a>s;s++)if(i=t[s],"object"==typeof i){if(o=this._checkKeyValue(i.type,"type",this._isBuffer))return r(o)
if(o=this._checkKeyValue(i.key,"key",this._isBuffer))return r(o)
if("put"==i.type&&(o=this._checkKeyValue(i.value,"value",this._isBuffer)))return r(o)}return"function"==typeof this._batch?this._batch(t,e,r):void n.nextTick(r)},i.prototype.approximateSize=function(t,e,r){if(null==t||null==e||"function"==typeof t||"function"==typeof e)throw new Error("approximateSize() requires valid `start`, `end` and `callback` arguments")
if("function"!=typeof r)throw new Error("approximateSize() requires a callback argument")
return this._isBuffer(t)||(t=String(t)),this._isBuffer(e)||(e=String(e)),"function"==typeof this._approximateSize?this._approximateSize(t,e,r):void n.nextTick(function(){r(null,0)})},i.prototype._setupIteratorOptions=function(t){var e=this
return t=o(t),["start","end","gt","gte","lt","lte"].forEach(function(n){t[n]&&e._isBuffer(t[n])&&0===t[n].length&&delete t[n]}),t.reverse=!!t.reverse,t.reverse&&t.lt&&(t.start=t.lt),t.reverse&&t.lte&&(t.start=t.lte),!t.reverse&&t.gt&&(t.start=t.gt),!t.reverse&&t.gte&&(t.start=t.gte),(t.reverse&&t.lt&&!t.lte||!t.reverse&&t.gt&&!t.gte)&&(t.exclusiveStart=!0),t},i.prototype.iterator=function(t){return"object"!=typeof t&&(t={}),t=this._setupIteratorOptions(t),"function"==typeof this._iterator?this._iterator(t):new s(this)},i.prototype._chainedBatch=function(){return new a(this)},i.prototype._isBuffer=function(t){return r.isBuffer(t)},i.prototype._checkKeyValue=function(t,e){if(null===t||void 0===t)return new Error(e+" cannot be `null` or `undefined`")
if(null===t||void 0===t)return new Error(e+" cannot be `null` or `undefined`")
if(this._isBuffer(t)){if(0===t.length)return new Error(e+" cannot be an empty Buffer")}else if(""===String(t))return new Error(e+" cannot be an empty String")},e.exports.AbstractLevelDOWN=i,e.exports.AbstractIterator=s,e.exports.AbstractChainedBatch=a}).call(this,t("+0JsKK"),t("buffer").Buffer)},{"+0JsKK":110,"./abstract-chained-batch":20,"./abstract-iterator":21,buffer:101,xtend:36}],23:[function(t,e){function n(t,e,n){o(this,{type:t,name:t,cause:"string"!=typeof e?e:n,message:e&&"string"!=typeof e?e.message:e},"ewr")}function r(t,e){Error.call(this),Error.captureStackTrace&&Error.captureStackTrace(this,arguments.callee),n.call(this,"CustomError",t,e)}function i(t,e,i){var o=function(r,i){n.call(this,e,r,i),"FilesystemError"==e&&(this.code=this.cause.code,this.path=this.cause.path,this.errno=this.cause.errno,this.message=(t.errno[this.cause.errno]?t.errno[this.cause.errno].description:this.cause.message)+(this.cause.path?" ["+this.cause.path+"]":"")),Error.call(this),Error.captureStackTrace&&Error.captureStackTrace(this,arguments.callee)}
return o.prototype=i?new i:new r,o}var o=t("prr")
r.prototype=new Error,e.exports=function(t){var e=function(e,n){return i(t,e,n)}
return{CustomError:r,FilesystemError:e("FilesystemError"),createError:e}}},{prr:25}],24:[function(t,e){var n=e.exports.all=[{errno:-1,code:"UNKNOWN",description:"unknown error"},{errno:0,code:"OK",description:"success"},{errno:1,code:"EOF",description:"end of file"},{errno:2,code:"EADDRINFO",description:"getaddrinfo error"},{errno:3,code:"EACCES",description:"permission denied"},{errno:4,code:"EAGAIN",description:"resource temporarily unavailable"},{errno:5,code:"EADDRINUSE",description:"address already in use"},{errno:6,code:"EADDRNOTAVAIL",description:"address not available"},{errno:7,code:"EAFNOSUPPORT",description:"address family not supported"},{errno:8,code:"EALREADY",description:"connection already in progress"},{errno:9,code:"EBADF",description:"bad file descriptor"},{errno:10,code:"EBUSY",description:"resource busy or locked"},{errno:11,code:"ECONNABORTED",description:"software caused connection abort"},{errno:12,code:"ECONNREFUSED",description:"connection refused"},{errno:13,code:"ECONNRESET",description:"connection reset by peer"},{errno:14,code:"EDESTADDRREQ",description:"destination address required"},{errno:15,code:"EFAULT",description:"bad address in system call argument"},{errno:16,code:"EHOSTUNREACH",description:"host is unreachable"},{errno:17,code:"EINTR",description:"interrupted system call"},{errno:18,code:"EINVAL",description:"invalid argument"},{errno:19,code:"EISCONN",description:"socket is already connected"},{errno:20,code:"EMFILE",description:"too many open files"},{errno:21,code:"EMSGSIZE",description:"message too long"},{errno:22,code:"ENETDOWN",description:"network is down"},{errno:23,code:"ENETUNREACH",description:"network is unreachable"},{errno:24,code:"ENFILE",description:"file table overflow"},{errno:25,code:"ENOBUFS",description:"no buffer space available"},{errno:26,code:"ENOMEM",description:"not enough memory"},{errno:27,code:"ENOTDIR",description:"not a directory"},{errno:28,code:"EISDIR",description:"illegal operation on a directory"},{errno:29,code:"ENONET",description:"machine is not on the network"},{errno:31,code:"ENOTCONN",description:"socket is not connected"},{errno:32,code:"ENOTSOCK",description:"socket operation on non-socket"},{errno:33,code:"ENOTSUP",description:"operation not supported on socket"},{errno:34,code:"ENOENT",description:"no such file or directory"},{errno:35,code:"ENOSYS",description:"function not implemented"},{errno:36,code:"EPIPE",description:"broken pipe"},{errno:37,code:"EPROTO",description:"protocol error"},{errno:38,code:"EPROTONOSUPPORT",description:"protocol not supported"},{errno:39,code:"EPROTOTYPE",description:"protocol wrong type for socket"},{errno:40,code:"ETIMEDOUT",description:"connection timed out"},{errno:41,code:"ECHARSET",description:"invalid Unicode character"},{errno:42,code:"EAIFAMNOSUPPORT",description:"address family for hostname not supported"},{errno:44,code:"EAISERVICE",description:"servname not supported for ai_socktype"},{errno:45,code:"EAISOCKTYPE",description:"ai_socktype not supported"},{errno:46,code:"ESHUTDOWN",description:"cannot send after transport endpoint shutdown"},{errno:47,code:"EEXIST",description:"file already exists"},{errno:48,code:"ESRCH",description:"no such process"},{errno:49,code:"ENAMETOOLONG",description:"name too long"},{errno:50,code:"EPERM",description:"operation not permitted"},{errno:51,code:"ELOOP",description:"too many symbolic links encountered"},{errno:52,code:"EXDEV",description:"cross-device link not permitted"},{errno:53,code:"ENOTEMPTY",description:"directory not empty"},{errno:54,code:"ENOSPC",description:"no space left on device"},{errno:55,code:"EIO",description:"i/o error"},{errno:56,code:"EROFS",description:"read-only file system"},{errno:57,code:"ENODEV",description:"no such device"},{errno:58,code:"ESPIPE",description:"invalid seek"},{errno:59,code:"ECANCELED",description:"operation canceled"}]
e.exports.errno={"-1":n[0],0:n[1],1:n[2],2:n[3],3:n[4],4:n[5],5:n[6],6:n[7],7:n[8],8:n[9],9:n[10],10:n[11],11:n[12],12:n[13],13:n[14],14:n[15],15:n[16],16:n[17],17:n[18],18:n[19],19:n[20],20:n[21],21:n[22],22:n[23],23:n[24],24:n[25],25:n[26],26:n[27],27:n[28],28:n[29],29:n[30],31:n[31],32:n[32],33:n[33],34:n[34],35:n[35],36:n[36],37:n[37],38:n[38],39:n[39],40:n[40],41:n[41],42:n[42],44:n[43],45:n[44],46:n[45],47:n[46],48:n[47],49:n[48],50:n[49],51:n[50],52:n[51],53:n[52],54:n[53],55:n[54],56:n[55],57:n[56],58:n[57],59:n[58]},e.exports.code={UNKNOWN:n[0],OK:n[1],EOF:n[2],EADDRINFO:n[3],EACCES:n[4],EAGAIN:n[5],EADDRINUSE:n[6],EADDRNOTAVAIL:n[7],EAFNOSUPPORT:n[8],EALREADY:n[9],EBADF:n[10],EBUSY:n[11],ECONNABORTED:n[12],ECONNREFUSED:n[13],ECONNRESET:n[14],EDESTADDRREQ:n[15],EFAULT:n[16],EHOSTUNREACH:n[17],EINTR:n[18],EINVAL:n[19],EISCONN:n[20],EMFILE:n[21],EMSGSIZE:n[22],ENETDOWN:n[23],ENETUNREACH:n[24],ENFILE:n[25],ENOBUFS:n[26],ENOMEM:n[27],ENOTDIR:n[28],EISDIR:n[29],ENONET:n[30],ENOTCONN:n[31],ENOTSOCK:n[32],ENOTSUP:n[33],ENOENT:n[34],ENOSYS:n[35],EPIPE:n[36],EPROTO:n[37],EPROTONOSUPPORT:n[38],EPROTOTYPE:n[39],ETIMEDOUT:n[40],ECHARSET:n[41],EAIFAMNOSUPPORT:n[42],EAISERVICE:n[43],EAISOCKTYPE:n[44],ESHUTDOWN:n[45],EEXIST:n[46],ESRCH:n[47],ENAMETOOLONG:n[48],EPERM:n[49],ELOOP:n[50],EXDEV:n[51],ENOTEMPTY:n[52],ENOSPC:n[53],EIO:n[54],EROFS:n[55],ENODEV:n[56],ESPIPE:n[57],ECANCELED:n[58]},e.exports.custom=t("./custom")(e.exports),e.exports.create=e.exports.custom.createError},{"./custom":23}],25:[function(t,e){!function(t,n,r){"undefined"!=typeof e&&e.exports?e.exports=r():n[t]=r()}("prr",this,function(){var t="function"==typeof Object.defineProperty?function(t,e,n){return Object.defineProperty(t,e,n),t}:function(t,e,n){return t[e]=n.value,t},e=function(t,e){var n="object"==typeof e,r=!n&&"string"==typeof e,i=function(t){return n?!!e[t]:r?e.indexOf(t[0])>-1:!1}
return{enumerable:i("enumerable"),configurable:i("configurable"),writable:i("writable"),value:t}},n=function(n,r,i,o){var s
if(o=e(i,o),"object"==typeof r){for(s in r)Object.hasOwnProperty.call(r,s)&&(o.value=r[s],t(n,s,o))
return n}return t(n,r,o)}
return n})},{}],26:[function(t,e){(function(n){function r(t){return this instanceof r?(u.call(this,t),c.call(this,t),t&&t.readable===!1&&(this.readable=!1),t&&t.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,t&&t.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",i)):new r(t)}function i(){this.allowHalfOpen||this._writableState.ended||n.nextTick(this.end.bind(this))}function o(t,e){for(var n=0,r=t.length;r>n;n++)e(t[n],n)}e.exports=r
var s=Object.keys||function(t){var e=[]
for(var n in t)e.push(n)
return e},a=t("core-util-is")
a.inherits=t("inherits")
var u=t("./_stream_readable"),c=t("./_stream_writable")
a.inherits(r,u),o(s(c.prototype),function(t){r.prototype[t]||(r.prototype[t]=c.prototype[t])})}).call(this,t("+0JsKK"))},{"+0JsKK":110,"./_stream_readable":28,"./_stream_writable":30,"core-util-is":31,inherits:32}],27:[function(t,e){function n(t){return this instanceof n?void r.call(this,t):new n(t)}e.exports=n
var r=t("./_stream_transform"),i=t("core-util-is")
i.inherits=t("inherits"),i.inherits(n,r),n.prototype._transform=function(t,e,n){n(null,t)}},{"./_stream_transform":29,"core-util-is":31,inherits:32}],28:[function(t,e){(function(n){function r(e){e=e||{}
var n=e.highWaterMark
this.highWaterMark=n||0===n?n:16384,this.highWaterMark=~~this.highWaterMark,this.buffer=[],this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=!1,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.calledRead=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.objectMode=!!e.objectMode,this.defaultEncoding=e.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(T||(T=t("string_decoder/").StringDecoder),this.decoder=new T(e.encoding),this.encoding=e.encoding)}function i(t){return this instanceof i?(this._readableState=new r(t,this),this.readable=!0,void N.call(this)):new i(t)}function o(t,e,n,r,i){var o=c(e,n)
if(o)t.emit("error",o)
else if(null===n||void 0===n)e.reading=!1,e.ended||h(t,e)
else if(e.objectMode||n&&n.length>0)if(e.ended&&!i){var a=new Error("stream.push() after EOF")
t.emit("error",a)}else if(e.endEmitted&&i){var a=new Error("stream.unshift() after end event")
t.emit("error",a)}else!e.decoder||i||r||(n=e.decoder.write(n)),e.length+=e.objectMode?1:n.length,i?e.buffer.unshift(n):(e.reading=!1,e.buffer.push(n)),e.needReadable&&f(t),p(t,e)
else i||(e.reading=!1)
return s(e)}function s(t){return!t.ended&&(t.needReadable||t.length<t.highWaterMark||0===t.length)}function a(t){if(t>=A)t=A
else{t--
for(var e=1;32>e;e<<=1)t|=t>>e
t++}return t}function u(t,e){return 0===e.length&&e.ended?0:e.objectMode?0===t?0:1:isNaN(t)||null===t?e.flowing&&e.buffer.length?e.buffer[0].length:e.length:0>=t?0:(t>e.highWaterMark&&(e.highWaterMark=a(t)),t>e.length?e.ended?e.length:(e.needReadable=!0,0):t)}function c(t,e){var n=null
return k.isBuffer(e)||"string"==typeof e||null===e||void 0===e||t.objectMode||n||(n=new TypeError("Invalid non-string/buffer chunk")),n}function h(t,e){if(e.decoder&&!e.ended){var n=e.decoder.end()
n&&n.length&&(e.buffer.push(n),e.length+=e.objectMode?1:n.length)}e.ended=!0,e.length>0?f(t):w(t)}function f(t){var e=t._readableState
e.needReadable=!1,e.emittedReadable||(e.emittedReadable=!0,e.sync?n.nextTick(function(){l(t)}):l(t))}function l(t){t.emit("readable")}function p(t,e){e.readingMore||(e.readingMore=!0,n.nextTick(function(){d(t,e)}))}function d(t,e){for(var n=e.length;!e.reading&&!e.flowing&&!e.ended&&e.length<e.highWaterMark&&(t.read(0),n!==e.length);)n=e.length
e.readingMore=!1}function g(t){return function(){var e=t._readableState
e.awaitDrain--,0===e.awaitDrain&&v(t)}}function v(t){function e(t){var e=t.write(n)
!1===e&&r.awaitDrain++}var n,r=t._readableState
for(r.awaitDrain=0;r.pipesCount&&null!==(n=t.read());)if(1===r.pipesCount?e(r.pipes,0,null):E(r.pipes,e),t.emit("data",n),r.awaitDrain>0)return
return 0===r.pipesCount?(r.flowing=!1,void(S.listenerCount(t,"data")>0&&y(t))):void(r.ranOut=!0)}function m(){this._readableState.ranOut&&(this._readableState.ranOut=!1,v(this))}function y(t,e){var r=t._readableState
if(r.flowing)throw new Error("Cannot switch to old mode now.")
var i=e||!1,o=!1
t.readable=!0,t.pipe=N.prototype.pipe,t.on=t.addListener=N.prototype.on,t.on("readable",function(){o=!0
for(var e;!i&&null!==(e=t.read());)t.emit("data",e)
null===e&&(o=!1,t._readableState.needReadable=!0)}),t.pause=function(){i=!0,this.emit("pause")},t.resume=function(){i=!1,o?n.nextTick(function(){t.emit("readable")}):this.read(0),this.emit("resume")},t.emit("readable")}function b(t,e){var n,r=e.buffer,i=e.length,o=!!e.decoder,s=!!e.objectMode
if(0===r.length)return null
if(0===i)n=null
else if(s)n=r.shift()
else if(!t||t>=i)n=o?r.join(""):k.concat(r,i),r.length=0
else if(t<r[0].length){var a=r[0]
n=a.slice(0,t),r[0]=a.slice(t)}else if(t===r[0].length)n=r.shift()
else{n=o?"":new k(t)
for(var u=0,c=0,h=r.length;h>c&&t>u;c++){var a=r[0],f=Math.min(t-u,a.length)
o?n+=a.slice(0,f):a.copy(n,u,0,f),f<a.length?r[0]=a.slice(f):r.shift(),u+=f}}return n}function w(t){var e=t._readableState
if(e.length>0)throw new Error("endReadable called on non-empty stream")
!e.endEmitted&&e.calledRead&&(e.ended=!0,n.nextTick(function(){e.endEmitted||0!==e.length||(e.endEmitted=!0,t.readable=!1,t.emit("end"))}))}function E(t,e){for(var n=0,r=t.length;r>n;n++)e(t[n],n)}function _(t,e){for(var n=0,r=t.length;r>n;n++)if(t[n]===e)return n
return-1}e.exports=i
var x=t("isarray"),k=t("buffer").Buffer
i.ReadableState=r
var S=t("events").EventEmitter
S.listenerCount||(S.listenerCount=function(t,e){return t.listeners(e).length})
var N=t("stream"),O=t("core-util-is")
O.inherits=t("inherits")
var T
O.inherits(i,N),i.prototype.push=function(t,e){var n=this._readableState
return"string"!=typeof t||n.objectMode||(e=e||n.defaultEncoding,e!==n.encoding&&(t=new k(t,e),e="")),o(this,n,t,e,!1)},i.prototype.unshift=function(t){var e=this._readableState
return o(this,e,t,"",!0)},i.prototype.setEncoding=function(e){T||(T=t("string_decoder/").StringDecoder),this._readableState.decoder=new T(e),this._readableState.encoding=e}
var A=8388608
i.prototype.read=function(t){var e=this._readableState
e.calledRead=!0
var n=t
if(("number"!=typeof t||t>0)&&(e.emittedReadable=!1),0===t&&e.needReadable&&(e.length>=e.highWaterMark||e.ended))return f(this),null
if(t=u(t,e),0===t&&e.ended)return 0===e.length&&w(this),null
var r=e.needReadable
e.length-t<=e.highWaterMark&&(r=!0),(e.ended||e.reading)&&(r=!1),r&&(e.reading=!0,e.sync=!0,0===e.length&&(e.needReadable=!0),this._read(e.highWaterMark),e.sync=!1),r&&!e.reading&&(t=u(n,e))
var i
return i=t>0?b(t,e):null,null===i&&(e.needReadable=!0,t=0),e.length-=t,0!==e.length||e.ended||(e.needReadable=!0),e.ended&&!e.endEmitted&&0===e.length&&w(this),i},i.prototype._read=function(){this.emit("error",new Error("not implemented"))},i.prototype.pipe=function(t,e){function r(t){t===h&&o()}function i(){t.end()}function o(){t.removeListener("close",a),t.removeListener("finish",u),t.removeListener("drain",d),t.removeListener("error",s),t.removeListener("unpipe",r),h.removeListener("end",i),h.removeListener("end",o),(!t._writableState||t._writableState.needDrain)&&d()}function s(e){c(),t.removeListener("error",s),0===S.listenerCount(t,"error")&&t.emit("error",e)}function a(){t.removeListener("finish",u),c()}function u(){t.removeListener("close",a),c()}function c(){h.unpipe(t)}var h=this,f=this._readableState
switch(f.pipesCount){case 0:f.pipes=t
break
case 1:f.pipes=[f.pipes,t]
break
default:f.pipes.push(t)}f.pipesCount+=1
var l=(!e||e.end!==!1)&&t!==n.stdout&&t!==n.stderr,p=l?i:o
f.endEmitted?n.nextTick(p):h.once("end",p),t.on("unpipe",r)
var d=g(h)
return t.on("drain",d),t._events&&t._events.error?x(t._events.error)?t._events.error.unshift(s):t._events.error=[s,t._events.error]:t.on("error",s),t.once("close",a),t.once("finish",u),t.emit("pipe",h),f.flowing||(this.on("readable",m),f.flowing=!0,n.nextTick(function(){v(h)})),t},i.prototype.unpipe=function(t){var e=this._readableState
if(0===e.pipesCount)return this
if(1===e.pipesCount)return t&&t!==e.pipes?this:(t||(t=e.pipes),e.pipes=null,e.pipesCount=0,this.removeListener("readable",m),e.flowing=!1,t&&t.emit("unpipe",this),this)
if(!t){var n=e.pipes,r=e.pipesCount
e.pipes=null,e.pipesCount=0,this.removeListener("readable",m),e.flowing=!1
for(var i=0;r>i;i++)n[i].emit("unpipe",this)
return this}var i=_(e.pipes,t)
return-1===i?this:(e.pipes.splice(i,1),e.pipesCount-=1,1===e.pipesCount&&(e.pipes=e.pipes[0]),t.emit("unpipe",this),this)},i.prototype.on=function(t,e){var n=N.prototype.on.call(this,t,e)
if("data"!==t||this._readableState.flowing||y(this),"readable"===t&&this.readable){var r=this._readableState
r.readableListening||(r.readableListening=!0,r.emittedReadable=!1,r.needReadable=!0,r.reading?r.length&&f(this,r):this.read(0))}return n},i.prototype.addListener=i.prototype.on,i.prototype.resume=function(){y(this),this.read(0),this.emit("resume")},i.prototype.pause=function(){y(this,!0),this.emit("pause")},i.prototype.wrap=function(t){var e=this._readableState,n=!1,r=this
t.on("end",function(){if(e.decoder&&!e.ended){var t=e.decoder.end()
t&&t.length&&r.push(t)}r.push(null)}),t.on("data",function(i){if(e.decoder&&(i=e.decoder.write(i)),i&&(e.objectMode||i.length)){var o=r.push(i)
o||(n=!0,t.pause())}})
for(var i in t)"function"==typeof t[i]&&"undefined"==typeof this[i]&&(this[i]=function(e){return function(){return t[e].apply(t,arguments)}}(i))
var o=["error","close","destroy","pause","resume"]
return E(o,function(e){t.on(e,r.emit.bind(r,e))}),r._read=function(){n&&(n=!1,t.resume())},r},i._fromList=b}).call(this,t("+0JsKK"))},{"+0JsKK":110,buffer:101,"core-util-is":31,events:104,inherits:32,isarray:33,stream:128,"string_decoder/":34}],29:[function(t,e){function n(t,e){this.afterTransform=function(t,n){return r(e,t,n)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null}function r(t,e,n){var r=t._transformState
r.transforming=!1
var i=r.writecb
if(!i)return t.emit("error",new Error("no writecb in Transform class"))
r.writechunk=null,r.writecb=null,null!==n&&void 0!==n&&t.push(n),i&&i(e)
var o=t._readableState
o.reading=!1,(o.needReadable||o.length<o.highWaterMark)&&t._read(o.highWaterMark)}function i(t){if(!(this instanceof i))return new i(t)
s.call(this,t)
var e=(this._transformState=new n(t,this),this)
this._readableState.needReadable=!0,this._readableState.sync=!1,this.once("finish",function(){"function"==typeof this._flush?this._flush(function(t){o(e,t)}):o(e)})}function o(t,e){if(e)return t.emit("error",e)
var n=t._writableState,r=(t._readableState,t._transformState)
if(n.length)throw new Error("calling transform done when ws.length != 0")
if(r.transforming)throw new Error("calling transform done when still transforming")
return t.push(null)}e.exports=i
var s=t("./_stream_duplex"),a=t("core-util-is")
a.inherits=t("inherits"),a.inherits(i,s),i.prototype.push=function(t,e){return this._transformState.needTransform=!1,s.prototype.push.call(this,t,e)},i.prototype._transform=function(){throw new Error("not implemented")},i.prototype._write=function(t,e,n){var r=this._transformState
if(r.writecb=n,r.writechunk=t,r.writeencoding=e,!r.transforming){var i=this._readableState;(r.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},i.prototype._read=function(){var t=this._transformState
null!==t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0,this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0}},{"./_stream_duplex":26,"core-util-is":31,inherits:32}],30:[function(t,e){(function(n){function r(t,e,n){this.chunk=t,this.encoding=e,this.callback=n}function i(t,e){t=t||{}
var n=t.highWaterMark
this.highWaterMark=n||0===n?n:16384,this.objectMode=!!t.objectMode,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1
var r=t.decodeStrings===!1
this.decodeStrings=!r,this.defaultEncoding=t.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(t){p(e,t)},this.writecb=null,this.writelen=0,this.buffer=[],this.errorEmitted=!1}function o(e){var n=t("./_stream_duplex")
return this instanceof o||this instanceof n?(this._writableState=new i(e,this),this.writable=!0,void _.call(this)):new o(e)}function s(t,e,r){var i=new Error("write after end")
t.emit("error",i),n.nextTick(function(){r(i)})}function a(t,e,r,i){var o=!0
if(!w.isBuffer(r)&&"string"!=typeof r&&null!==r&&void 0!==r&&!e.objectMode){var s=new TypeError("Invalid non-string/buffer chunk")
t.emit("error",s),n.nextTick(function(){i(s)}),o=!1}return o}function u(t,e,n){return t.objectMode||t.decodeStrings===!1||"string"!=typeof e||(e=new w(e,n)),e}function c(t,e,n,i,o){n=u(e,n,i),w.isBuffer(n)&&(i="buffer")
var s=e.objectMode?1:n.length
e.length+=s
var a=e.length<e.highWaterMark
return a||(e.needDrain=!0),e.writing?e.buffer.push(new r(n,i,o)):h(t,e,s,n,i,o),a}function h(t,e,n,r,i,o){e.writelen=n,e.writecb=o,e.writing=!0,e.sync=!0,t._write(r,i,e.onwrite),e.sync=!1}function f(t,e,r,i,o){r?n.nextTick(function(){o(i)}):o(i),t._writableState.errorEmitted=!0,t.emit("error",i)}function l(t){t.writing=!1,t.writecb=null,t.length-=t.writelen,t.writelen=0}function p(t,e){var r=t._writableState,i=r.sync,o=r.writecb
if(l(r),e)f(t,r,i,e,o)
else{var s=m(t,r)
s||r.bufferProcessing||!r.buffer.length||v(t,r),i?n.nextTick(function(){d(t,r,s,o)}):d(t,r,s,o)}}function d(t,e,n,r){n||g(t,e),r(),n&&y(t,e)}function g(t,e){0===e.length&&e.needDrain&&(e.needDrain=!1,t.emit("drain"))}function v(t,e){e.bufferProcessing=!0
for(var n=0;n<e.buffer.length;n++){var r=e.buffer[n],i=r.chunk,o=r.encoding,s=r.callback,a=e.objectMode?1:i.length
if(h(t,e,a,i,o,s),e.writing){n++
break}}e.bufferProcessing=!1,n<e.buffer.length?e.buffer=e.buffer.slice(n):e.buffer.length=0}function m(t,e){return e.ending&&0===e.length&&!e.finished&&!e.writing}function y(t,e){var n=m(t,e)
return n&&(e.finished=!0,t.emit("finish")),n}function b(t,e,r){e.ending=!0,y(t,e),r&&(e.finished?n.nextTick(r):t.once("finish",r)),e.ended=!0}e.exports=o
var w=t("buffer").Buffer
o.WritableState=i
var E=t("core-util-is")
E.inherits=t("inherits")
var _=t("stream")
E.inherits(o,_),o.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))},o.prototype.write=function(t,e,n){var r=this._writableState,i=!1
return"function"==typeof e&&(n=e,e=null),w.isBuffer(t)?e="buffer":e||(e=r.defaultEncoding),"function"!=typeof n&&(n=function(){}),r.ended?s(this,r,n):a(this,r,t,n)&&(i=c(this,r,t,e,n)),i},o.prototype._write=function(t,e,n){n(new Error("not implemented"))},o.prototype.end=function(t,e,n){var r=this._writableState
"function"==typeof t?(n=t,t=null,e=null):"function"==typeof e&&(n=e,e=null),"undefined"!=typeof t&&null!==t&&this.write(t,e),r.ending||r.finished||b(this,r,n)}}).call(this,t("+0JsKK"))},{"+0JsKK":110,"./_stream_duplex":26,buffer:101,"core-util-is":31,inherits:32,stream:128}],31:[function(t,e,n){(function(t){function e(t){return Array.isArray(t)}function r(t){return"boolean"==typeof t}function i(t){return null===t}function o(t){return null==t}function s(t){return"number"==typeof t}function a(t){return"string"==typeof t}function u(t){return"symbol"==typeof t}function c(t){return void 0===t}function h(t){return f(t)&&"[object RegExp]"===m(t)}function f(t){return"object"==typeof t&&null!==t}function l(t){return f(t)&&"[object Date]"===m(t)}function p(t){return f(t)&&("[object Error]"===m(t)||t instanceof Error)}function d(t){return"function"==typeof t}function g(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||"undefined"==typeof t}function v(e){return t.isBuffer(e)}function m(t){return Object.prototype.toString.call(t)}n.isArray=e,n.isBoolean=r,n.isNull=i,n.isNullOrUndefined=o,n.isNumber=s,n.isString=a,n.isSymbol=u,n.isUndefined=c,n.isRegExp=h,n.isObject=f,n.isDate=l,n.isError=p,n.isFunction=d,n.isPrimitive=g,n.isBuffer=v}).call(this,t("buffer").Buffer)},{buffer:101}],32:[function(t,e){e.exports="function"==typeof Object.create?function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:function(t,e){t.super_=e
var n=function(){}
n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},{}],33:[function(t,e){e.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}},{}],34:[function(t,e,n){function r(t){if(t&&!u(t))throw new Error("Unknown encoding: "+t)}function i(t){return t.toString(this.encoding)}function o(t){var e=this.charReceived=t.length%2
return this.charLength=e?2:0,e}function s(t){var e=this.charReceived=t.length%3
return this.charLength=e?3:0,e}var a=t("buffer").Buffer,u=a.isEncoding||function(t){switch(t&&t.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0
default:return!1}},c=n.StringDecoder=function(t){switch(this.encoding=(t||"utf8").toLowerCase().replace(/[-_]/,""),r(t),this.encoding){case"utf8":this.surrogateSize=3
break
case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=o
break
case"base64":this.surrogateSize=3,this.detectIncompleteChar=s
break
default:return void(this.write=i)}this.charBuffer=new a(6),this.charReceived=0,this.charLength=0}
c.prototype.write=function(t){for(var e="",n=0;this.charLength;){var r=t.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:t.length
if(t.copy(this.charBuffer,this.charReceived,n,r),this.charReceived+=r-n,n=r,this.charReceived<this.charLength)return""
e=this.charBuffer.slice(0,this.charLength).toString(this.encoding)
var i=e.charCodeAt(e.length-1)
if(!(i>=55296&&56319>=i)){if(this.charReceived=this.charLength=0,r==t.length)return e
t=t.slice(r,t.length)
break}this.charLength+=this.surrogateSize,e=""}var o=this.detectIncompleteChar(t),s=t.length
this.charLength&&(t.copy(this.charBuffer,0,t.length-o,s),this.charReceived=o,s-=o),e+=t.toString(this.encoding,0,s)
var s=e.length-1,i=e.charCodeAt(s)
if(i>=55296&&56319>=i){var a=this.surrogateSize
return this.charLength+=a,this.charReceived+=a,this.charBuffer.copy(this.charBuffer,a,0,a),this.charBuffer.write(e.charAt(e.length-1),this.encoding),e.substring(0,s)}return e},c.prototype.detectIncompleteChar=function(t){for(var e=t.length>=3?3:t.length;e>0;e--){var n=t[t.length-e]
if(1==e&&n>>5==6){this.charLength=2
break}if(2>=e&&n>>4==14){this.charLength=3
break}if(3>=e&&n>>3==30){this.charLength=4
break}}return e},c.prototype.end=function(t){var e=""
if(t&&t.length&&(e=this.write(t)),this.charReceived){var n=this.charReceived,r=this.charBuffer,i=this.encoding
e+=r.slice(0,n).toString(i)}return e}},{buffer:101}],35:[function(t,e,n){n=e.exports=t("./lib/_stream_readable.js"),n.Readable=n,n.Writable=t("./lib/_stream_writable.js"),n.Duplex=t("./lib/_stream_duplex.js"),n.Transform=t("./lib/_stream_transform.js"),n.PassThrough=t("./lib/_stream_passthrough.js")},{"./lib/_stream_duplex.js":26,"./lib/_stream_passthrough.js":27,"./lib/_stream_readable.js":28,"./lib/_stream_transform.js":29,"./lib/_stream_writable.js":30}],36:[function(t,e){function n(){for(var t={},e=0;e<arguments.length;e++){var n=arguments[e]
for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r])}return t}e.exports=n},{}],37:[function(t,e){e.exports={name:"levelup",description:"Fast & simple storage - a Node.js-style LevelDB wrapper",version:"0.18.5",contributors:[{name:"Rod Vagg",email:"r@va.gg",url:"https://github.com/rvagg"},{name:"John Chesley",email:"john@chesl.es",url:"https://github.com/chesles/"},{name:"Jake Verbaten",email:"raynos2@gmail.com",url:"https://github.com/raynos"},{name:"Dominic Tarr",email:"dominic.tarr@gmail.com",url:"https://github.com/dominictarr"},{name:"Max Ogden",email:"max@maxogden.com",url:"https://github.com/maxogden"},{name:"Lars-Magnus Skog",email:"lars.magnus.skog@gmail.com",url:"https://github.com/ralphtheninja"},{name:"David Björklund",email:"david.bjorklund@gmail.com",url:"https://github.com/kesla"},{name:"Julian Gruber",email:"julian@juliangruber.com",url:"https://github.com/juliangruber"},{name:"Paolo Fragomeni",email:"paolo@async.ly",url:"https://github.com/hij1nx"},{name:"Anton Whalley",email:"anton.whalley@nearform.com",url:"https://github.com/No9"},{name:"Matteo Collina",email:"matteo.collina@gmail.com",url:"https://github.com/mcollina"},{name:"Pedro Teixeira",email:"pedro.teixeira@gmail.com",url:"https://github.com/pgte"},{name:"James Halliday",email:"mail@substack.net",url:"https://github.com/substack"}],repository:{type:"git",url:"https://github.com/rvagg/node-levelup.git"},homepage:"https://github.com/rvagg/node-levelup",keywords:["leveldb","stream","database","db","store","storage","json"],main:"lib/levelup.js",dependencies:{bl:"~0.8.0","deferred-leveldown":"~0.2.0",errno:"~0.1.1",prr:"~0.0.0","readable-stream":"~1.0.26",semver:"~2.3.1",xtend:"~3.0.0"},devDependencies:{leveldown:"~0.10.0",bustermove:"*",tap:"*",referee:"*",rimraf:"*",async:"*",fstream:"*",tar:"*",mkfiletree:"*",readfiletree:"*","slow-stream":">=0.0.4",delayed:"*",boganipsum:"*",du:"*",memdown:"*","msgpack-js":"*"},browser:{leveldown:!1,"leveldown/package":!1,semver:!1},scripts:{test:"tap test/*-test.js --stderr",functionaltests:"node ./test/functional/fstream-test.js && node ./test/functional/binary-data-test.js && node ./test/functional/compat-test.js",alltests:"npm test && npm run-script functionaltests"},license:"MIT",bugs:{url:"https://github.com/rvagg/node-levelup/issues"},_id:"levelup@0.18.5",dist:{shasum:"be6cbfed06eb1112adfe6fbb243a2218566ebe56",tarball:"http://registry.npmjs.org/levelup/-/levelup-0.18.5.tgz"},_from:"levelup@~0.18.2",_npmVersion:"1.2.30",_npmUser:{name:"rvagg",email:"rod@vagg.org"},maintainers:[{name:"rvagg",email:"rod@vagg.org"}],directories:{},_shasum:"be6cbfed06eb1112adfe6fbb243a2218566ebe56",_resolved:"https://registry.npmjs.org/levelup/-/levelup-0.18.5.tgz",readme:"ERROR: No README data found!"}},{}],38:[function(t,e){(function(n,r,i){function o(t,e){f.call(this,t)
new i(0)
if(this._dbsize=this.db.container.length(),this._reverse=!!e.reverse,e.end instanceof i?(e.end.length=0)&&(this._end=this.db.container.key(this._dbsize-1)):this._end=e.end,this._limit=e.limit,this._count=0,e.start){for(var n=!1,r=0;r<this._dbsize;r++)if(this.db.container.key(r)>=e.start){this._pos=r,this._reverse&&(this._pos=this.db.container.key(r)>e.start?r-1:r),n=!0
break}n||(this._pos=this._reverse?this._dbsize-1:-1)}else this._pos=this._reverse?this._dbsize-1:0}function s(e){if(!(this instanceof s))return new s(e)
h.call(this,e)
var n=t("./localstorage").localStorage
this.container=new n(e)}function a(t){return t instanceof ArrayBuffer}function u(t,e){if(null===t||void 0===t)return new Error(e+" cannot be `null` or `undefined`")
if(null===t||void 0===t)return new Error(e+" cannot be `null` or `undefined`")
if("key"===e){if(t instanceof Boolean)return new Error(e+" cannot be `null` or `undefined`")
if(""===t)return new Error(e+" cannot be empty")}if(0==t.toString().indexOf("[object ArrayBuffer]")&&(0==t.byteLength||void 0==t.byteLength))return new Error(e+" cannot be an empty Buffer")
if(a(t)){if(0===t.length)return new Error(e+" cannot be an empty Buffer")}else if(""===String(t))return new Error(e+" cannot be an empty String")}var c=t("util"),h=t("abstract-leveldown").AbstractLevelDOWN,f=t("abstract-leveldown").AbstractIterator,l=function(){},p=r.setImmediate||n.nextTick
c.inherits(o,f),o.prototype._next=function(t){if(this._pos>=this.db.container.length()||this._pos<0)return p(t)
var e,n=this.db.container.key(this._pos)
return this._end&&(this._reverse?n<this._end:n>this._end)?p(t):this._limit&&this._limit>0&&this._count++>=this._limit?p(t):(e=this.db.container.getItem(n),this._pos+=this._reverse?-1:1,void p(t.bind(null,void 0,n,e)))},c.inherits(s,h),s.prototype._open=function(t,e){p(function(){e(null,this)}.bind(this))},s.prototype._put=function(t,e,n,r){var o=u(t,"key")
if(o)return r(o)
if(o=u(e,"value"))return r(o)
if("object"==typeof e&&!i.isBuffer(e)&&void 0==e.buffer){var s={}
s.storetype="json",s.data=e,e=JSON.stringify(s)}this.container.setItem(t,e),p(r)},s.prototype._get=function(t,e,n){var r=u(t,"key")
if(r)return n(r)
a(t)||(t=String(t))
var o=this.container.getItem(t)
if(void 0===o)return p(function(){n(new Error("NotFound: "))})
if(e.asBuffer===!1||i.isBuffer(o)||(o=new i(String(o))),e.asBuffer===!1&&o.indexOf('{"storetype":"json","data"')>-1){var s=JSON.parse(o)
o=s.data}p(function(){n(null,o)})},s.prototype._del=function(t,e,n){var r=u(t,"key")
return r?n(r):(a(t)||(t=String(t)),this.container.removeItem(t),void p(n))},s.prototype._batch=function(t,e,n){var r,o,s,a=0
if(Array.isArray(t))for(;a<t.length;a++)if(t[a]){if(o=i.isBuffer(t[a].key)?t[a].key:String(t[a].key),r=u(o,"key"))return p(n.bind(null,r))
if("del"===t[a].type)this._del(t[a].key,e,l)
else if("put"===t[a].type){if(s=i.isBuffer(t[a].value)?t[a].value:String(t[a].value),r=u(s,"value"))return p(n.bind(null,r))
this._put(o,s,e,l)}}p(n)},s.prototype._iterator=function(t){return new o(this,t)},s.destroy=function(t,e){try{Object.keys(localStorage).forEach(function(e){e.substring(0,t.length+1)==t+"!"&&localStorage.removeItem(e)}),e()}catch(n){}},e.exports=s}).call(this,t("+0JsKK"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},t("buffer").Buffer)},{"+0JsKK":110,"./localstorage":39,"abstract-leveldown":42,buffer:101,util:131}],39:[function(t,e,n){function r(t){this._partition=t,this._keys=[]
for(var e=0;e<window.localStorage.length;e++)0==window.localStorage.key(e).indexOf(t+"!")&&this._keys.push(window.localStorage.key(e))
this._keys.sort()}r.prototype.key=function(t){var e=this._keys[t]
return"undefined"!=typeof e?this._keys[t].replace(this._partition+"!","").replace("!bin"):e},r.prototype.setItem=function(t,e){if(t=this._partition+"!"+t,e instanceof ArrayBuffer){var n="ArrayBuffer:"
e=n+btoa(String.fromCharCode.apply(null,e))}if(e instanceof Uint8Array){var n="Uint8Array:"
e=n+btoa(String.fromCharCode.apply(null,e))}for(var r=0;r<this._keys.length;r++)if(this._keys[r]===t)return void window.localStorage.setItem(t,e)
this._keys.push(t),this._keys.sort(),window.localStorage.setItem(t,e)},r.prototype.getItem=function(t){t=this._partition+"!"+t
var e=window.localStorage.getItem(t)
if(null==e)return void 0
if(0==e.indexOf("ArrayBuffer:")){var n=e.replace("ArrayBuffer:","")
return e=new ArrayBuffer(atob(n).split("").map(function(t){return t.charCodeAt(0)}))}if(0==e.indexOf("Uint8Array:")){var n=e.replace("Uint8Array:","")
return atob(n)}return e},r.prototype.removeItem=function(t){t=this._partition+"!"+t
for(var e=this._keys.length;e>=0;e--)this._keys[e]===t&&(this._keys.splice(e,1),window.localStorage.removeItem(t))},r.prototype.clear=function(){window.localStorage.clear()},r.prototype.length=function(){return this._keys.length},n.localStorage=r},{}],40:[function(t,e){e.exports=t(20)},{"+0JsKK":110}],41:[function(t,e){e.exports=t(8)},{"+0JsKK":110}],42:[function(t,e,n){arguments[4][22][0].apply(n,arguments)},{"+0JsKK":110,"./abstract-chained-batch":40,"./abstract-iterator":41,buffer:101,xtend:44}],43:[function(t,e){function n(t){return null!==t&&("object"==typeof t||"function"==typeof t)}e.exports=n},{}],44:[function(t,e){function n(){for(var t={},e=0;e<arguments.length;e++){var n=arguments[e]
if(i(n))for(var o=r(n),s=0;s<o.length;s++){var a=o[s]
t[a]=n[a]}}return t}var r=t("object-keys"),i=t("./has-keys")
e.exports=n},{"./has-keys":43,"object-keys":46}],45:[function(t,e){var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString,i=function(t){var e="function"==typeof t&&!(t instanceof RegExp)||"[object Function]"===r.call(t)
return e||"undefined"==typeof window||(e=t===window.setTimeout||t===window.alert||t===window.confirm||t===window.prompt),e}
e.exports=function(t,e){if(!i(e))throw new TypeError("iterator must be a function")
var r,o,s="string"==typeof t,a=t.length,u=arguments.length>2?arguments[2]:null
if(a===+a)for(r=0;a>r;r++)null===u?e(s?t.charAt(r):t[r],r,t):e.call(u,s?t.charAt(r):t[r],r,t)
else for(o in t)n.call(t,o)&&(null===u?e(t[o],o,t):e.call(u,t[o],o,t))}},{}],46:[function(t,e){e.exports=Object.keys||t("./shim")},{"./shim":48}],47:[function(t,e){var n=Object.prototype.toString
e.exports=function r(t){var e=n.call(t),r="[object Arguments]"===e
return r||(r="[object Array]"!==e&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),r}},{}],48:[function(t,e){!function(){"use strict"
var n,r=Object.prototype.hasOwnProperty,i=Object.prototype.toString,o=t("./foreach"),s=t("./isArguments"),a=!{toString:null}.propertyIsEnumerable("toString"),u=function(){}.propertyIsEnumerable("prototype"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"]
n=function(t){var e=null!==t&&"object"==typeof t,n="[object Function]"===i.call(t),h=s(t),f=[]
if(!e&&!n&&!h)throw new TypeError("Object.keys called on a non-object")
if(h)o(t,function(t){f.push(t)})
else{var l,p=u&&n
for(l in t)p&&"prototype"===l||!r.call(t,l)||f.push(l)}if(a){var d=t.constructor,g=d&&d.prototype===t
o(c,function(e){g&&"constructor"===e||!r.call(t,e)||f.push(e)})}return f},e.exports=n}()},{"./foreach":45,"./isArguments":47}],49:[function(t,e){var n=t("events").EventEmitter,r=t("level-sublevel"),i=t("weak-type-wizard"),o=t("noddity-retrieval"),s=t("extend"),a=t("./lib/reflect.js"),u=t("./lib/index_manager.js"),c=t("./lib/post_manager.js"),h=new i({postMetadata:"metadata",string:["content","filename"],"default":{content:"",filename:""},cast:{postMetadata:new i({date:"date",markdown:"boolean"})}})
e.exports=function(t,e,i){function f(t,e){"function"==typeof t&&(e=t),"object"!=typeof t&&(t={})
var n=t.local||!1,r="number"==typeof t.mostRecent?-t.mostRecent:void 0,i=n?y.getLocalPosts:y.getPosts
i(r,void 0,e)}function l(){m.stop(),y.stop()}var p="string"==typeof t?new o(t):t,d=r(e),g=new n
i=s({},i)
var v=Object.create(g),m=new c(p,d.sublevel("posts",{valueEncoding:h.getLevelUpEncoding()}),{refreshEvery:i.refreshEvery}),y=new u(p,m,d.sublevel("index",{valueEncoding:"json"}),{refreshEvery:i.refreshEvery})
return a("change",m,g,"post changed"),a("post added",m,g),a("change",y,g,"index changed"),y.on("change",y.getPosts),v.getPost=m.getPost,v.getPosts=f,v.allPostsAreLoaded=y.allPostsAreLoaded,v.stop=l,v}},{"./lib/index_manager.js":50,"./lib/post_manager.js":51,"./lib/reflect.js":52,events:104,extend:54,"level-sublevel":56,"noddity-retrieval":71,"weak-type-wizard":87}],50:[function(t,e){function n(t,e){var n=t&&e&&t.metadata&&e.metadata&&t.metadata.date&&e.metadata.date
return n&&t.metadata.date!=e.metadata.date?t.metadata.date<e.metadata.date?-1:1:0}function r(t,e){return t.length===e.length&&t.every(function(t,n){return e[n]===t})}function i(t,e,i,c){function h(t,e,r,i){"function"==typeof e&&(i=e),p(function(o,s){o?i(o):t(s,function(t,o){t||(o=o.sort(n),"number"==typeof e&&(o=o.slice(e,r))),i(t,o)})})}c=s({refreshEvery:6e5,comparison:r},c)
var f=Object.create(new a),l=o(i,function(e,n){t.getIndex(n)},c)
l.on("change",function(t,e){f.emit("change",e)})
var p=l.get.bind(l,u)
p()
var d=h.bind(null,e.getPosts),g=h.bind(null,e.getLocalPosts)
return f.getPosts=d,f.getLocalPosts=g,f.allPostsAreLoaded=function(t){p(function(e,n){e?t(!1,!1):g(function(e,r){t(e,e||r.length===n.length)})})},f.stop=l.stop,f}var o=t("levelup-cache"),s=t("extend"),a=t("events").EventEmitter,u=(t("./reflect.js"),"index")
e.exports=i},{"./reflect.js":52,events:104,extend:54,"levelup-cache":68}],51:[function(t,e){function n(t,e){return"undefined"!=typeof e&&c(t)?t.toString()===e.toString():t===e}function r(t,e){return t.content===e.content&&t.metadata.length===e.metadata.length&&t.filename===e.filename&&Object.keys(t.metadata).every(function(r){return n(t.metadata[r],e.metadata[r])})}function i(t,e,n){function i(t,e){d.get(t,e)}function c(t,e){var n=[],r=!1,s=o(),a=t.map(function(t,e){return function(o){i(t,function(t,i){!r&&t?r=t:r||(n[e]=i),o()})}})
s.gate.apply(s,a).then(function(){e(r,n)})}function f(t,e){var n=[],r=!1,i=o(),s=t.map(function(t){return function(e){d.getLocal(t,function(t,o){r||(t?t.notFound||(r=t,i.abort()):n.push(o)),e()})}})
i.gate.apply(i,s).then(function(t){e(r,n),t()})}n=n||{}
var l=Object.create(new a),p=u({refreshEvery:432e5},n,{comparison:r}),d=new s(e,t.getPost,p)
return h("change",d,l),l.getPost=i,l.getPosts=c,l.getLocalPosts=f,l.stop=d.stop,l}var o=t("asynquence"),s=t("levelup-cache"),a=t("events").EventEmitter,u=t("extend"),c=t("util").isDate,h=t("./reflect.js")
e.exports=i},{"./reflect.js":52,asynquence:53,events:104,extend:54,"levelup-cache":68,util:131}],52:[function(t,e){e.exports=function(t,e,n,r){"string"==typeof t&&(t=[t]),t.forEach(function(t){e.on(t,n.emit.bind(n,r||t))})}},{}],53:[function(t,e){!function(t,n,r){"undefined"!=typeof e&&e.exports?e.exports=r():"function"==typeof define&&define.amd?define(r):n[t]=r(t,n)}("ASQ",this,function(t,e){function n(t){return"undefined"!=typeof setImmediate?setImmediate(t):setTimeout(t,0)}function r(){function t(){function t(){clearTimeout(d),d=null,y.length=0,b.length=0,w.length=0,E.length=0}function e(){return v?r():void(d||(d=n(r)))}function r(){var n,r
if(d=null,v)t()
else if(g)for(;b.length;){n=b.shift()
try{n.apply(n,E)}catch(o){E.push(o),o.stack&&E.push(o.stack),0===b.length&&console.error.apply(console,E)}}else if(m&&y.length>0){m=!1,n=y.shift(),r=w.slice(),w.length=0,r.unshift(i())
try{n.apply(n,r)}catch(o){E.push(o),g=!0,e()}}}function i(){function t(){g||v||m||(m=!0,w.push.apply(w,arguments),E.length=0,e())}return t.fail=function(){g||v||m||(g=!0,w.length=0,E.push.apply(E,arguments),e())},t.abort=function(){g||v||(m=!1,v=!0,w.length=0,E.length=0,e())},t}function o(t,e,r){function i(){clearTimeout(d),d=w=E=p=null}function o(){return y?a():void(d||(d=n(a)))}function a(){if(!(g||v||b)){var e,n=[]
if(d=null,m)t.fail.apply(t,p),i()
else if(y)t.abort(),i()
else if(u()){for(b=!0,e=0;e<w.length;e++)n.push(E["m"+e])
t.apply(t,n),i()}}}function u(){if(!(g||v||m||y||b||0===w.length)){var t,e=!0
for(t=0;t<w.length;t++)if(null===w[t]){e=!1
break}return e}}function c(){function t(){if(!(g||v||m||y||b||w[e])){var t=s.call(arguments)
E["m"+e]=t.length>1?t:t[0],w[e]=!0,o()}}var e=w.length
return t.fail=function(){g||v||m||y||b||w[e]||(m=!0,p=s.call(arguments),o())},t.abort=function(){g||v||m||y||b||(y=!0,a())},w[e]=null,t}var h,f,l,p,d,m=!1,y=!1,b=!1,w=[],E={}
for(h=0;h<e.length&&!m&&!y;h++){f=r.slice(),f.unshift(c())
try{e[h].apply(e[h],f)}catch(_){l=_,m=!0
break}}l&&t.fail(l)}function a(){return g||v?_:(arguments.length>0&&y.push.apply(y,arguments),e(),_)}function u(){return v?_:(b.push.apply(b,arguments),e(),_)}function c(){if(g||v||0===arguments.length)return _
var t=s.apply(arguments)
return a(function(e){var n=s.call(arguments)
n.shift(),o(e,t,n)}),_}function h(){if(g||v||0===arguments.length)return _
var t,e=s.call(arguments)
for(t=0;t<e.length;t++)!function(t){a(function(e){var n=s.call(arguments,1)
t.apply(t,n),e()}).or(t.fail)}(e[t])
return _}function f(){if(g||v||0===arguments.length)return _
var t,e=s.call(arguments)
for(t=0;t<e.length;t++)!function(t){a(function(e){var n=s.call(arguments,1)
t.apply(t,n).pipe(e)})}(e[t])
return _}function l(){if(g||v||0===arguments.length)return _
var t,e=s.call(arguments)
for(t=0;t<e.length;t++)!function(t){a(function(e){var n=s.call(arguments,1)
e(t.apply(t,n))})}(e[t])
return _}function p(){return g?_:(v=!0,r(),_)}var d,g=!1,v=!1,m=!0,y=[],b=[],w=[],E=[],_={then:a,or:u,gate:c,pipe:h,seq:f,val:l,abort:p}
return arguments.length>0&&_.then.apply(_,arguments),_}return t}var i,o=(e||{})[t],s=Array.prototype.slice
return i=r(),i.noConflict=function(){return e&&(e[t]=o),i},i})},{}],54:[function(t,e){function n(t){if(!t||"[object Object]"!==i.call(t)||t.nodeType||t.setInterval)return!1
var e=r.call(t,"constructor"),n=r.call(t.constructor.prototype,"isPrototypeOf")
if(t.constructor&&!e&&!n)return!1
var o
for(o in t);return void 0===o||r.call(t,o)}var r=Object.prototype.hasOwnProperty,i=Object.prototype.toString
e.exports=function o(){var t,e,r,i,s,a,u=arguments[0]||{},c=1,h=arguments.length,f=!1
for("boolean"==typeof u&&(f=u,u=arguments[1]||{},c=2),"object"!=typeof u&&"function"!=typeof u&&(u={});h>c;c++)if(null!=(t=arguments[c]))for(e in t)r=u[e],i=t[e],u!==i&&(f&&i&&(n(i)||(s=Array.isArray(i)))?(s?(s=!1,a=r&&Array.isArray(r)?r:[]):a=r&&n(r)?r:{},u[e]=o(f,a,i)):void 0!==i&&(u[e]=i))
return u}},{}],55:[function(t,e){function n(t,e,n,r){var i={type:t,key:e,value:n,options:r}
return r&&r.prefix&&(i.prefix=r.prefix,delete r.prefix),this._operations.push(i),this}function r(t){this._operations=[],this._sdb=t,this.put=n.bind(this,"put"),this.del=n.bind(this,"del")}var i=r.prototype
i.clear=function(){this._operations=[]},i.write=function(t){this._sdb.batch(this._operations,t)},e.exports=r},{}],56:[function(t,e){(function(n){var r=(t("events").EventEmitter,n.nextTick,t("./sub")),i=t("./batch"),o=t("level-fix-range"),s=t("level-hooks")
e.exports=function(t,e){function n(){}function a(t){return function(e){return e=e||{},e=o(e),e.reverse?e.start=e.start||c:e.end=e.end||c,t.call(u,e)}}n.prototype=t
var u=new n
if(u.sublevel)return u
e=e||{}
var c=e.sep=e.sep||"ÿ"
u._options=e,s(u),u.sublevels={},u.sublevel=function(t,e){return u.sublevels[t]?u.sublevels[t]:new r(u,t,e||this._options)},u.methods={},u.prefix=function(t){return""+(t||"")},u.pre=function(t,e){return e||(e=t,t={max:c}),u.hooks.pre(t,e)},u.post=function(t,e){return e||(e=t,t={max:c}),u.hooks.post(t,e)},u.readStream=u.createReadStream=a(u.createReadStream),u.keyStream=u.createKeyStream=a(u.createKeyStream),u.valuesStream=u.createValueStream=a(u.createValueStream)
var h=u.batch
return u.batch=function(t,e,n){return Array.isArray(t)?(t.forEach(function(t){t.prefix&&("function"==typeof t.prefix.prefix?t.key=t.prefix.prefix(t.key):"string"==typeof t.prefix&&(t.key=t.prefix+t.key))}),void h.call(u,t,e,n)):new i(u)},u}}).call(this,t("+0JsKK"))},{"+0JsKK":110,"./batch":55,"./sub":67,events:104,"level-fix-range":57,"level-hooks":59}],57:[function(t,e){var n=t("clone")
e.exports=function(t){t=n(t)
var e=t.reverse,r=t.max||t.end,i=t.min||t.start,o=[i,r]
return null!=i&&null!=r&&o.sort(),e&&(o=o.reverse()),t.start=o[0],t.end=o[1],delete t.min,delete t.max,t}},{clone:58}],58:[function(t,e){(function(t){"use strict"
function n(t){return Object.prototype.toString.call(t)}function r(e,n,r,o){function s(e,r){if(null===e)return null
if(0==r)return e
var h
if("object"!=typeof e)return e
if(i.isArray(e))h=[]
else if(i.isRegExp(e))h=new RegExp(e.source,i.getRegExpFlags(e)),e.lastIndex&&(h.lastIndex=e.lastIndex)
else if(i.isDate(e))h=new Date(e.getTime())
else{if(c&&t.isBuffer(e))return h=new t(e.length),e.copy(h),h
h=Object.create("undefined"==typeof o?Object.getPrototypeOf(e):o)}if(n){var f=a.indexOf(e)
if(-1!=f)return u[f]
a.push(e),u.push(h)}for(var l in e)h[l]=s(e[l],r-1)
return h}var a=[],u=[],c="undefined"!=typeof t
return"undefined"==typeof n&&(n=!0),"undefined"==typeof r&&(r=1/0),s(e,r)}var i={isArray:function(t){return Array.isArray(t)||"object"==typeof t&&"[object Array]"===n(t)},isDate:function(t){return"object"==typeof t&&"[object Date]"===n(t)},isRegExp:function(t){return"object"==typeof t&&"[object RegExp]"===n(t)},getRegExpFlags:function(t){var e=""
return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),e}}
"object"==typeof e&&(e.exports=r),r.clonePrototype=function(t){if(null===t)return null
var e=function(){}
return e.prototype=t,new e}}).call(this,t("buffer").Buffer)},{buffer:101}],59:[function(t,e){var n=t("string-range")
e.exports=function(t){function e(t){return t&&("string"==typeof t?t:"string"==typeof t.prefix?t.prefix:"function"==typeof t.prefix?t.prefix():"")}function r(t){return t&&t._getKeyEncoding?t._getKeyEncoding(t):void 0}function i(t){return t&&t._getValueEncoding?t._getValueEncoding(t):void 0}function o(t,e){return function(){var n=t.indexOf(e)
return~n?(t.splice(n,1),!0):!1}}function s(t){t&&t.type&&u.forEach(function(e){e.test(t.key)&&e.hook(t)})}function a(n,o,s,a){try{o.forEach(function d(t,n){c.forEach(function(s){if(s.test(String(t.key))){var a={add:function(t,a){if("undefined"==typeof t)return this
if(t===!1)return delete o[n]
var u=e(t.prefix)||e(a)||s.prefix||""
if(u&&(t.prefix=u),t.key=u+t.key,s.safe&&s.test(String(t.key)))throw new Error("prehook cannot insert into own range")
var c=t.keyEncoding||r(t.prefix),h=t.valueEncoding||i(t.prefix)
return c&&(t.keyEncoding=c),h&&(t.valueEncoding=h),o.push(t),d(t,o.length-1),this},put:function(t,e){return"object"==typeof t&&(t.type="put"),this.add(t,e)},del:function(t,e){return"object"==typeof t&&(t.type="del"),this.add(t,e)},veto:function(){return this.add(!1)}}
s.hook.call(a,t,a.add,o)}})})}catch(u){return(a||s)(u)}if(o=o.filter(function(t){return t&&t.type}),1==o.length&&!n){var p=o[0]
return"put"==p.type?h.call(t,p.key,p.value,s,a):f.call(t,p.key,s,a)}return l.call(t,o,s,a)}if(!t.hooks){var u=[],c=[]
t.hooks={post:function(t,e){e||(e=t,t="")
var r={test:n.checker(t),hook:e}
return u.push(r),o(u,r)},pre:function(t,e){e||(e=t,t="")
var r={test:n.checker(t),hook:e,safe:!1!==t.safe}
return c.push(r),o(c,r)},posthooks:u,prehooks:c},t.on("put",function(t,e){s({type:"put",key:t,value:e})}),t.on("del",function(t,e){s({type:"del",key:t,value:e})}),t.on("batch",function(t){t.forEach(s)})
var h=t.put,f=t.del,l=t.batch
t.put=function(t,e,n,r){var i=[{key:t,value:e,type:"put"}]
return a(!1,i,n,r)},t.del=function(t,e,n){var r=[{key:t,type:"del"}]
return a(!1,r,e,n)},t.batch=function(t,e,n){return a(!0,t,e,n)}}}},{"string-range":60}],60:[function(t,e,n){{var r=n.range=function(t){return null==t?{}:"string"==typeof r?{min:r,max:r+"ÿ"}:t},i=(n.prefix=function(t,e,r){t=n.range(t)
var i={}
return r=r||"ÿ",t instanceof RegExp||"function"==typeof t?(i.min=e,i.max=e+r,i.inner=function(n){var r=n.substring(e.length)
return t.test?t.test(r):t(r)}):"object"==typeof t&&(i.min=e+(t.min||t.start||""),i.max=e+(t.max||t.end||r||"~"),i.reverse=!!t.reverse),i},n.checker=function(t){return t||(t={}),"string"==typeof t?function(e){return 0==e.indexOf(t)}:t instanceof RegExp?function(e){return t.test(e)}:"object"==typeof t?function(e){var n=t.min||t.start,r=t.max||t.end
return e=String(e),(!n||e>=n)&&(!r||r>=e)&&(!t.inner||(t.inner.test?t.inner.test(e):t.inner(e)))}:"function"==typeof t?t:void 0})
n.satisfies=function(t,e){return i(e)(t)}}},{}],61:[function(t,e){e.exports=t(43)},{}],62:[function(t,e,n){arguments[4][44][0].apply(n,arguments)},{"./has-keys":61,"object-keys":63}],63:[function(t,e,n){arguments[4][46][0].apply(n,arguments)},{"./shim":66}],64:[function(t,e){var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString
e.exports=function(t,e,i){if("[object Function]"!==r.call(e))throw new TypeError("iterator must be a function")
var o=t.length
if(o===+o)for(var s=0;o>s;s++)e.call(i,t[s],s,t)
else for(var a in t)n.call(t,a)&&e.call(i,t[a],a,t)}},{}],65:[function(t,e){var n=Object.prototype,r=n.hasOwnProperty,i=n.toString,o=function(t){return t!==t},s={"boolean":1,number:1,string:1,undefined:1},a=e.exports={}
a.a=a.type=function(t,e){return typeof t===e},a.defined=function(t){return void 0!==t},a.empty=function(t){var e,n=i.call(t)
if("[object Array]"===n||"[object Arguments]"===n)return 0===t.length
if("[object Object]"===n){for(e in t)if(r.call(t,e))return!1
return!0}return"[object String]"===n?""===t:!1},a.equal=function(t,e){var n,r=i.call(t)
if(r!==i.call(e))return!1
if("[object Object]"===r){for(n in t)if(!a.equal(t[n],e[n]))return!1
return!0}if("[object Array]"===r){if(n=t.length,n!==e.length)return!1
for(;--n;)if(!a.equal(t[n],e[n]))return!1
return!0}return"[object Function]"===r?t.prototype===e.prototype:"[object Date]"===r?t.getTime()===e.getTime():t===e},a.hosted=function(t,e){var n=typeof e[t]
return"object"===n?!!e[t]:!s[n]},a.instance=a["instanceof"]=function(t,e){return t instanceof e},a["null"]=function(t){return null===t},a.undefined=function(t){return void 0===t},a.arguments=function(t){var e="[object Arguments]"===i.call(t),n=!a.array(t)&&a.arraylike(t)&&a.object(t)&&a.fn(t.callee)
return e||n},a.array=function(t){return"[object Array]"===i.call(t)},a.arguments.empty=function(t){return a.arguments(t)&&0===t.length},a.array.empty=function(t){return a.array(t)&&0===t.length},a.arraylike=function(t){return!!t&&!a.boolean(t)&&r.call(t,"length")&&isFinite(t.length)&&a.number(t.length)&&t.length>=0},a.boolean=function(t){return"[object Boolean]"===i.call(t)},a["false"]=function(t){return a.boolean(t)&&(t===!1||t.valueOf()===!1)},a["true"]=function(t){return a.boolean(t)&&(t===!0||t.valueOf()===!0)},a.date=function(t){return"[object Date]"===i.call(t)},a.element=function(t){return void 0!==t&&"undefined"!=typeof HTMLElement&&t instanceof HTMLElement&&1===t.nodeType},a.error=function(t){return"[object Error]"===i.call(t)},a.fn=a["function"]=function(t){var e="undefined"!=typeof window&&t===window.alert
return e||"[object Function]"===i.call(t)},a.number=function(t){return"[object Number]"===i.call(t)},a.infinite=function(t){return 1/0===t||t===-1/0},a.decimal=function(t){return a.number(t)&&!o(t)&&!a.infinite(t)&&t%1!==0},a.divisibleBy=function(t,e){var n=a.infinite(t),r=a.infinite(e),i=a.number(t)&&!o(t)&&a.number(e)&&!o(e)&&0!==e
return n||r||i&&t%e===0},a.int=function(t){return a.number(t)&&!o(t)&&t%1===0},a.maximum=function(t,e){if(o(t))throw new TypeError("NaN is not a valid value")
if(!a.arraylike(e))throw new TypeError("second argument must be array-like")
for(var n=e.length;--n>=0;)if(t<e[n])return!1
return!0},a.minimum=function(t,e){if(o(t))throw new TypeError("NaN is not a valid value")
if(!a.arraylike(e))throw new TypeError("second argument must be array-like")
for(var n=e.length;--n>=0;)if(t>e[n])return!1
return!0},a.nan=function(t){return!a.number(t)||t!==t},a.even=function(t){return a.infinite(t)||a.number(t)&&t===t&&t%2===0},a.odd=function(t){return a.infinite(t)||a.number(t)&&t===t&&t%2!==0},a.ge=function(t,e){if(o(t)||o(e))throw new TypeError("NaN is not a valid value")
return!a.infinite(t)&&!a.infinite(e)&&t>=e},a.gt=function(t,e){if(o(t)||o(e))throw new TypeError("NaN is not a valid value")
return!a.infinite(t)&&!a.infinite(e)&&t>e},a.le=function(t,e){if(o(t)||o(e))throw new TypeError("NaN is not a valid value")
return!a.infinite(t)&&!a.infinite(e)&&e>=t},a.lt=function(t,e){if(o(t)||o(e))throw new TypeError("NaN is not a valid value")
return!a.infinite(t)&&!a.infinite(e)&&e>t},a.within=function(t,e,n){if(o(t)||o(e)||o(n))throw new TypeError("NaN is not a valid value")
if(!a.number(t)||!a.number(e)||!a.number(n))throw new TypeError("all arguments must be numbers")
var r=a.infinite(t)||a.infinite(e)||a.infinite(n)
return r||t>=e&&n>=t},a.object=function(t){return t&&"[object Object]"===i.call(t)},a.hash=function(t){return a.object(t)&&t.constructor===Object&&!t.nodeType&&!t.setInterval},a.regexp=function(t){return"[object RegExp]"===i.call(t)},a.string=function(t){return"[object String]"===i.call(t)}},{}],66:[function(t,e){!function(){"use strict"
var n,r=Object.prototype.hasOwnProperty,i=t("is"),o=t("foreach"),s=!{toString:null}.propertyIsEnumerable("toString"),a=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"]
n=function(t){if(!i.object(t)&&!i.array(t))throw new TypeError("Object.keys called on a non-object")
var e,n=[]
for(e in t)r.call(t,e)&&n.push(e)
return s&&o(a,function(e){r.call(t,e)&&n.push(e)}),n},e.exports=n}()},{foreach:64,is:65}],67:[function(t,e){function n(t,e,r){if("string"==typeof r&&(console.error("db.sublevel(name, seperator<string>) is depreciated"),console.error("use db.sublevel(name, {sep: separator})) if you must"),r={sep:r}),!(this instanceof n))return new n(t,e,r)
if(!t)throw new Error("must provide db")
if(!e)throw new Error("must provide prefix")
r=r||{},r.sep=r.sep||"ÿ",this._parent=t,this._options=r,this.options=r,this._prefix=e,this._root=i(this),t.sublevels[e]=this,this.sublevels={},this.methods={}
var o=this
this.hooks={pre:function(){return o.pre.apply(o,arguments)},post:function(){return o.post.apply(o,arguments)}}}function r(t,e){["valueEncoding","encoding","keyEncoding","reverse","values","keys","limit","fillCache"].forEach(function(n){e.hasOwnProperty(n)&&(t[n]=e[n])})}function i(t){return t._parent?i(t._parent):t}var o=t("events").EventEmitter,s=t("util").inherits,a=t("string-range"),u=t("level-fix-range"),c=t("xtend"),h=t("./batch")
s(n,o)
var f=n.prototype
f._key=function(t){var e=this._options.sep
return e+this._prefix+e+t},f._getOptsAndCb=function(t,e){return"function"==typeof t&&(e=t,t={}),{opts:c(t,this._options),cb:e}},f.sublevel=function(t,e){return this.sublevels[t]?this.sublevels[t]:new n(this,t,e||this._options)},f.put=function(t,e,n,r){var i=this._getOptsAndCb(n,r)
this._root.put(this.prefix(t),e,i.opts,i.cb)},f.get=function(t,e,n){var r=this._getOptsAndCb(e,n)
this._root.get(this.prefix(t),r.opts,r.cb)},f.del=function(t,e,n){var r=this._getOptsAndCb(e,n)
this._root.del(this.prefix(t),r.opts,r.cb)},f.batch=function(t,e,n){if(!Array.isArray(t))return new h(this)
var r=this,i=this._getOptsAndCb(e,n)
t.forEach(function(t){t.key="string"==typeof t.prefix?t.prefix+t.key:(t.prefix||r).prefix(t.key),t.prefix&&(t.prefix=null)}),this._root.batch(t,i.opts,i.cb)},f._getKeyEncoding=function(){return this.options.keyEncoding?this.options.keyEncoding:this._parent&&this._parent._getKeyEncoding?this._parent._getKeyEncoding():void 0},f._getValueEncoding=function(){return this.options.valueEncoding?this.options.valueEncoding:this._parent&&this._parent._getValueEncoding?this._parent._getValueEncoding():void 0},f.prefix=function(t){var e=this._options.sep
return this._parent.prefix()+e+this._prefix+e+(t||"")},f.keyStream=f.createKeyStream=function(t){return t=t||{},t.keys=!0,t.values=!1,this.createReadStream(t)},f.valueStream=f.createValueStream=function(t){return t=t||{},t.keys=!1,t.values=!0,t.keys=!1,this.createReadStream(t)},f.readStream=f.createReadStream=function(t){t=t||{}
var e=i(this),n=this.prefix(),o=a.prefix(t,n)
r(o,c(t,this._options))
var s=e.createReadStream(o)
if(o.values===!1){var u=s.read
if(u)s.read=function(t){var e=u.call(this,t)
return e&&(e=e.substring(n.length)),e}
else{var h=s.emit
s.emit=function(t,e){"data"===t?h.call(this,"data",e.substring(n.length)):h.call(this,t,e)}}return s}if(o.keys===!1)return s
var u=s.read
return u?s.read=function(t){var e=u.call(this,t)
return e&&(e.key=e.key.substring(n.length)),e}:s.on("data",function(t){t.key=t.key.substring(n.length)}),s},f.writeStream=f.createWriteStream=function(){var t=i(this),e=this.prefix(),n=t.createWriteStream.apply(t,arguments),r=n.write,o=this._options.encoding,s=this._options.valueEncoding,a=this._options.keyEncoding,u=!o&&!s&&!a
return n.write=u?function(t){return t.key=e+t.key,r.call(n,t)}:function(t){return t.key=e+t.key,o&&"undefined"==typeof t.encoding&&(t.encoding=o),s&&"undefined"==typeof t.valueEncoding&&(t.valueEncoding=s),a&&"undefined"==typeof t.keyEncoding&&(t.keyEncoding=a),r.call(n,t)},n},f.approximateSize=function(){var t=i(db)
return t.approximateSize.apply(t,arguments)},f.pre=function(t,e){e||(e=t,t=null),t=a.prefix(t,this.prefix(),this._options.sep)
var n=i(this._parent),r=this.prefix()
return n.hooks.pre(u(t),function(t,n,i){e({key:t.key.substring(r.length),value:t.value,type:t.type},function(t,e){n(t,t.prefix?e:e||r)},i)})},f.post=function(t,e){e||(e=t,t=null)
var n=i(this._parent),r=this.prefix()
return t=a.prefix(t,r,this._options.sep),n.hooks.post(u(t),function(t){e({key:t.key.substring(r.length),value:t.value,type:t.type})})}
e.exports=n},{"./batch":55,events:104,"level-fix-range":57,"string-range":60,util:131,xtend:62}],68:[function(t,e){var n=t("stringmap"),r=t("level-sublevel"),i=t("asynquence"),o=t("events").EventEmitter,s=t("expire-unused-keys"),a=t("extend")
e.exports=function(t,e,u){function c(){v.stop(),g.stop()}function h(t){d.del(t),v.forget(t)
var e=m.get(t)
e&&(e.abort(),m.remove(t))}function f(t,n){var r=m.get(t)
r||(r=i(function(n){e(t,function(e,r){d.get(t,function(i,o){!e&&m.has(t)&&(d.put(t,r,function(){y.emit("load",t,r),(i&&i.notFound||!u.comparison(o,r))&&y.emit("change",t,r,o)}),v.touch(t)),n(e,r)})})}),m.set(t,r),r.then(function(e,n,r){m.remove(t),e(n,r)})),"function"==typeof n&&r.then(function(t,e,r){n(e,r),t(e,r)})}function l(t,e){return function(n,r){g.touch(t),"function"==typeof e&&e(n,r)}}u=u||{},u=a({refreshEvery:432e5,checkToSeeIfItemsNeedToBeRefreshedEvery:1e3,ttl:6048e5,comparison:function(t,e){return t===e}},u)
var p=r(t),d=p.sublevel("items"),g=new s(u.ttl,p.sublevel("item-expirations",{valueEncoding:"utf8"}),u.checkToSeeIfItemsNeedToBeRefreshedEvery),v=new s(u.refreshEvery,p.sublevel("refresh",{valueEncoding:"utf8"}),u.checkToSeeIfItemsNeedToBeRefreshedEvery),m=new n,y=Object.create(new o)
return v.on("expire",f),g.on("expire",h),y.stop=c,y.get=function(t,e){d.get(t,function(n,r){n&&n.notFound?f(t,l(t,e)):e&&l(t,e)(n,r)})},y.getLocal=function(t,e){d.get(t,l(t,e))},y.refresh=function(t,e){f(t,l(t,e))},y}},{asynquence:53,events:104,"expire-unused-keys":69,extend:54,"level-sublevel":56,stringmap:70}],69:[function(t,e){function n(t){function e(){n=!1}var n=!1
return function(){if(!n){n=!0
var r=Array.prototype.slice.call(arguments,0)
r.push(e),t.apply(null,r)}}}var r=t("events").EventEmitter
e.exports=function(t,e,i){var o=new r,s=[],a=n(function(n){var r=(new Date).getTime(),i=[]
e.createReadStream().on("data",function(e){parseInt(e.value)+t<r&&i.push(e.key)}).on("end",function(){var t=e.batch()
i.filter(function(t){return-1===s.indexOf(t)}).forEach(function(e){o.emit("expire",e),t.del(e)}),s=[],t.write(n)})})
o.on("touch",function(t){e.put(t,(new Date).getTime())}),o.on("forget",function(t){s.push(t),e.del(t)})
var u=setInterval(a,i||1e3)
return o.touch=o.emit.bind(o,"touch"),o.forget=o.emit.bind(o,"forget"),o.stop=function(){clearInterval(u)},o}},{events:104}],70:[function(t,e){var n=function(){"use strict"
function t(e){return this instanceof t?(this.obj=n(),this.hasProto=!1,this.proto=void 0,void(e&&this.setMany(e))):new t(e)}var e=Object.prototype.hasOwnProperty,n=function(){function t(t){for(var n in t)if(e.call(t,n))return!0
return!1}function n(t){return e.call(t,"__count__")||e.call(t,"__parent__")}var r=!1
if("function"==typeof Object.create&&(t(Object.create(null))||(r=!0)),r===!1&&t({}))throw new Error("StringMap environment error 0, please file a bug at https://github.com/olov/stringmap/issues")
var i=r?Object.create(null):{},o=!1
if(n(i)){if(i.__proto__=null,t(i)||n(i))throw new Error("StringMap environment error 1, please file a bug at https://github.com/olov/stringmap/issues")
o=!0}return function(){var t=r?Object.create(null):{}
return o&&(t.__proto__=null),t}}()
return t.prototype.has=function(t){if("string"!=typeof t)throw new Error("StringMap expected string key")
return"__proto__"===t?this.hasProto:e.call(this.obj,t)},t.prototype.get=function(t){if("string"!=typeof t)throw new Error("StringMap expected string key")
return"__proto__"===t?this.proto:e.call(this.obj,t)?this.obj[t]:void 0},t.prototype.set=function(t,e){if("string"!=typeof t)throw new Error("StringMap expected string key")
"__proto__"===t?(this.hasProto=!0,this.proto=e):this.obj[t]=e},t.prototype.remove=function(t){if("string"!=typeof t)throw new Error("StringMap expected string key")
var e=this.has(t)
return"__proto__"===t?(this.hasProto=!1,this.proto=void 0):delete this.obj[t],e},t.prototype["delete"]=t.prototype.remove,t.prototype.isEmpty=function(){for(var t in this.obj)if(e.call(this.obj,t))return!1
return!this.hasProto},t.prototype.size=function(){var t=0
for(var n in this.obj)e.call(this.obj,n)&&++t
return this.hasProto?t+1:t},t.prototype.keys=function(){var t=[]
for(var n in this.obj)e.call(this.obj,n)&&t.push(n)
return this.hasProto&&t.push("__proto__"),t},t.prototype.values=function(){var t=[]
for(var n in this.obj)e.call(this.obj,n)&&t.push(this.obj[n])
return this.hasProto&&t.push(this.proto),t},t.prototype.items=function(){var t=[]
for(var n in this.obj)e.call(this.obj,n)&&t.push([n,this.obj[n]])
return this.hasProto&&t.push(["__proto__",this.proto]),t},t.prototype.setMany=function(t){if(null===t||"object"!=typeof t&&"function"!=typeof t)throw new Error("StringMap expected Object")
for(var n in t)e.call(t,n)&&this.set(n,t[n])
return this},t.prototype.merge=function(t){for(var e=t.keys(),n=0;n<e.length;n++){var r=e[n]
this.set(r,t.get(r))}return this},t.prototype.map=function(t){for(var e=this.keys(),n=0;n<e.length;n++){var r=e[n]
e[n]=t(this.get(r),r)}return e},t.prototype.forEach=function(t){for(var e=this.keys(),n=0;n<e.length;n++){var r=e[n]
t(this.get(r),r)}},t.prototype.clone=function(){var e=t()
return e.merge(this)},t.prototype.toString=function(){var t=this
return"{"+this.keys().map(function(e){return JSON.stringify(e)+":"+JSON.stringify(t.get(e))}).join(",")+"}"},t}()
"undefined"!=typeof e&&"undefined"!=typeof e.exports&&(e.exports=n)},{}],71:[function(t,e){var n=t("http"),r=t("url"),i=(t("concat-stream"),t("text-metadata-parser"))
e.exports=function(t){var e=function(e,i,o){var s="",a=r.resolve(t,e)
n.get(r.parse(a),function(t){t.setEncoding&&t.setEncoding("utf8"),t.on("data",function(t){null!==s&&(s+=t)}),t.on("error",function(t){s=null,i(t)}),t.on("end",function(e){if(null!==s)if("undefined"!=typeof e&&(s+=e),200!==t.statusCode)i(new Error("Lookup of "+a+" returned status "+t.statusCode+"\n========\n"+s))
else{var n=null
try{n=o(s)}catch(r){i(new Error("Error parsing file with contents:\n"+s+"\n==========\n"+r.message))}null!==n&&i(!1,n)}})}).on("error",function(t){i(new Error("Lookup of "+a+" failed\n========\n"+t.message))})}
return{getIndex:function(t){e("index.json",t,JSON.parse)},getPost:function(t,n){e(t,n,function(e){var n=i(e,{date:"date","boolean":"markdown"})
return n.filename=t,n})}}}},{"concat-stream":72,http:105,"text-metadata-parser":86,url:129}],72:[function(t,e){function n(t){r.Stream.call(this),this.writable=!0,t&&(this.cb=t),this.body=[],this.on("error",function(){})}var r=t("stream"),i=t("bops"),o=t("util")
o.inherits(n,r.Stream),n.prototype.write=function(t){this.emit("data",t),this.body.push(t)},n.prototype.destroy=function(){},n.prototype.arrayConcat=function(t){return 0===t.length?[]:1===t.length?t[0]:t.reduce(function(t,e){return t.concat(e)})},n.prototype.isArray=function(t){return Array.isArray(t)},n.prototype.getBody=function(){return 0!==this.body.length?"string"==typeof this.body[0]?this.body.join(""):this.isArray(this.body[0])?this.arrayConcat(this.body):i.is(this.body[0])?i.join(this.body):this.body:void 0},n.prototype.end=function(){this.emit("end"),this.cb&&this.cb(this.getBody())},e.exports=function(t){return new n(t)},e.exports.ConcatStream=n},{bops:73,stream:128,util:131}],73:[function(t,e){function n(t,e){for(var n in t)e[n]=t[n]}var r={}
e.exports=r,r.from=t("./from.js"),r.to=t("./to.js"),r.is=t("./is.js"),r.subarray=t("./subarray.js"),r.join=t("./join.js"),r.copy=t("./copy.js"),r.create=t("./create.js"),n(t("./read.js"),r),n(t("./write.js"),r)},{"./copy.js":76,"./create.js":77,"./from.js":78,"./is.js":79,"./join.js":80,"./read.js":82,"./subarray.js":83,"./to.js":84,"./write.js":85}],74:[function(t,e){!function(){"use strict"
function t(t){var e,n,i,o,s,a
if(t.length%4>0)throw"Invalid string. Length must be a multiple of 4"
for(s=t.indexOf("="),s=s>0?t.length-s:0,a=[],i=s>0?t.length-4:t.length,e=0,n=0;i>e;e+=4,n+=3)o=r.indexOf(t[e])<<18|r.indexOf(t[e+1])<<12|r.indexOf(t[e+2])<<6|r.indexOf(t[e+3]),a.push((16711680&o)>>16),a.push((65280&o)>>8),a.push(255&o)
return 2===s?(o=r.indexOf(t[e])<<2|r.indexOf(t[e+1])>>4,a.push(255&o)):1===s&&(o=r.indexOf(t[e])<<10|r.indexOf(t[e+1])<<4|r.indexOf(t[e+2])>>2,a.push(o>>8&255),a.push(255&o)),a}function n(t){function e(t){return r[t>>18&63]+r[t>>12&63]+r[t>>6&63]+r[63&t]}var n,i,o,s=t.length%3,a=""
for(n=0,o=t.length-s;o>n;n+=3)i=(t[n]<<16)+(t[n+1]<<8)+t[n+2],a+=e(i)
switch(s){case 1:i=t[t.length-1],a+=r[i>>2],a+=r[i<<4&63],a+="=="
break
case 2:i=(t[t.length-2]<<8)+t[t.length-1],a+=r[i>>10],a+=r[i>>4&63],a+=r[i<<2&63],a+="="}return a}var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
e.exports.toByteArray=t,e.exports.fromByteArray=n}()},{}],75:[function(t,e){function n(t,e,n){e=void 0===e?0:e,n=void 0===n?t.length:n
var u,h,f=0,l=128,p=0
for(s.length=o.length=0;f<t.length;)h=t[f],!p&&h&l?(u=r(h),p+=u,8>u&&(s[s.length]=h&c[6-u])):p?(s[s.length]=h&c[6],--p,!p&&s.length&&(o[o.length]=a(i(s,u)),s.length=0)):o[o.length]=a(h),++f
return s.length&&!p&&(o[o.length]=a(i(s,u)),s.length=0),o.join("")}function r(t){for(var e=0;7>e&&t&u[e];++e);return e}function i(t){for(var e=0,n=0,r=t.length;r>n;++n)e|=t[n]<<6*(r-n-1)
return e}e.exports=n
var o=[],s=[],a=String.fromCharCode,u=[64,32,16,8,4,2,1],c=[0,1,3,7,15,31,63,127]},{}],76:[function(t,e){function n(t,e,n,o,s){return n=arguments.length<3?0:n,o=arguments.length<4?0:o,s=arguments.length<5?t.length:s,s!==o&&0!==e.length&&0!==t.length?(s>t.length&&(s=t.length),e.length-n<s-o&&(s=e.length-n+start),t.buffer!==e.buffer?r(t,e,n,o,s):i(t,e,n,o,s)):void 0}function r(t,e,n,r,i){for(var o=i-r+n,s=n,a=r;o>s;++s,++a)e[s]=t[a]}function i(t,e,n,r,i){for(var s=i+r,a=new Uint8Array(o.call(t,r,s)),u=0;s>r;++r,++u)e[n++]=a[u]}e.exports=n
var o=[].slice},{}],77:[function(t,e){e.exports=function(t){return new Uint8Array(t)}},{}],78:[function(t,e){function n(t,e){return Array.isArray(t)?new Uint8Array(t):a[e||"utf8"](t)}function r(t){for(var e=t.length/2,n=new Uint8Array(e),r="",i=0,o=t.length;o>i;++i)r+=t.charAt(i),i>0&&i%2===1&&(n[i>>>1]=parseInt(r,16),r="")
return n}function i(t){for(var e,n,r=[],i=0,o=t.length;o>i;++i)if(n=t.charCodeAt(i),128&n){e=encodeURIComponent(t.charAt(i)).substr(1).split("%")
for(var s=0,a=e.length;a>s;++s)r[r.length]=parseInt(e[s],16)}else r[r.length]=n
return new Uint8Array(r)}function o(t){return new Uint8Array(s.toByteArray(t))}e.exports=n
var s=t("base64-js"),a={hex:r,utf8:i,base64:o}},{"base64-js":74}],79:[function(t,e){e.exports=function(t){return t instanceof Uint8Array}},{}],80:[function(t,e){function n(t,e){if(!t.length)return new Uint8Array(0)
for(var n=void 0!==e?e:r(t),i=new Uint8Array(n),o=t[0],s=o.length,a=0,u=0,c=0;n>c;)u!==s?i[c++]=o[u++]:(u=0,++a,o=t[a],s=o&&o.length)
return i}function r(t){for(var e=0,n=0,r=t.length;r>n;++n)e+=t[n].byteLength
return e}e.exports=n},{}],81:[function(t,e){function n(t){return new DataView(t.buffer,0)}function r(t){var e=o.get(t.buffer)
return e||o.set(t.buffer,e=new DataView(t.buffer,0)),e}var i,o
e.exports=i={},o="undefined"==typeof WeakMap?null:new WeakMap,i.get=o?r:n},{}],82:[function(t,e){function n(t,e){return t[e]}function r(t,e){var n=t[e]
return 128>n?n:n-256}function i(t,e){var n=v.get(t)
return n.getUint16(e+t.byteOffset,!0)}function o(t,e){var n=v.get(t)
return n.getUint32(e+t.byteOffset,!0)}function s(t,e){var n=v.get(t)
return n.getInt16(e+t.byteOffset,!0)}function a(t,e){var n=v.get(t)
return n.getInt32(e+t.byteOffset,!0)}function u(t,e){var n=v.get(t)
return n.getFloat32(e+t.byteOffset,!0)}function c(t,e){var n=v.get(t)
return n.getFloat64(e+t.byteOffset,!0)}function h(t,e){var n=v.get(t)
return n.getUint16(e+t.byteOffset,!1)}function f(t,e){var n=v.get(t)
return n.getUint32(e+t.byteOffset,!1)}function l(t,e){var n=v.get(t)
return n.getInt16(e+t.byteOffset,!1)}function p(t,e){var n=v.get(t)
return n.getInt32(e+t.byteOffset,!1)}function d(t,e){var n=v.get(t)
return n.getFloat32(e+t.byteOffset,!1)}function g(t,e){var n=v.get(t)
return n.getFloat64(e+t.byteOffset,!1)}e.exports={readUInt8:n,readInt8:r,readUInt16LE:i,readUInt32LE:o,readInt16LE:s,readInt32LE:a,readFloatLE:u,readDoubleLE:c,readUInt16BE:h,readUInt32BE:f,readInt16BE:l,readInt32BE:p,readFloatBE:d,readDoubleBE:g}
var v=t("./mapped.js")},{"./mapped.js":81}],83:[function(t,e){function n(t,e,n){return t.subarray(e||0,n||t.length)}e.exports=n},{}],84:[function(t,e){function n(t,e){return u[e||"utf8"](t)}function r(t){for(var e,n="",r=0,i=t.length;i>r;++r)e=t[r],n+=((240&e)>>>4).toString(16),n+=(15&e).toString(16)
return n}function i(t){return a(t)}function o(t){return s.fromByteArray(t)}e.exports=n
var s=t("base64-js"),a=t("to-utf8"),u={hex:r,utf8:i,base64:o}},{"base64-js":74,"to-utf8":75}],85:[function(t,e){function n(t,e,n){return t[n]=e}function r(t,e,n){return t[n]=0>e?e+256:e}function i(t,e,n){var r=v.get(t)
return r.setUint16(n+t.byteOffset,e,!0)}function o(t,e,n){var r=v.get(t)
return r.setUint32(n+t.byteOffset,e,!0)}function s(t,e,n){var r=v.get(t)
return r.setInt16(n+t.byteOffset,e,!0)}function a(t,e,n){var r=v.get(t)
return r.setInt32(n+t.byteOffset,e,!0)}function u(t,e,n){var r=v.get(t)
return r.setFloat32(n+t.byteOffset,e,!0)}function c(t,e,n){var r=v.get(t)
return r.setFloat64(n+t.byteOffset,e,!0)}function h(t,e,n){var r=v.get(t)
return r.setUint16(n+t.byteOffset,e,!1)}function f(t,e,n){var r=v.get(t)
return r.setUint32(n+t.byteOffset,e,!1)}function l(t,e,n){var r=v.get(t)
return r.setInt16(n+t.byteOffset,e,!1)}function p(t,e,n){var r=v.get(t)
return r.setInt32(n+t.byteOffset,e,!1)}function d(t,e,n){var r=v.get(t)
return r.setFloat32(n+t.byteOffset,e,!1)}function g(t,e,n){var r=v.get(t)
return r.setFloat64(n+t.byteOffset,e,!1)}e.exports={writeUInt8:n,writeInt8:r,writeUInt16LE:i,writeUInt32LE:o,writeInt16LE:s,writeInt32LE:a,writeFloatLE:u,writeDoubleLE:c,writeUInt16BE:h,writeUInt32BE:f,writeInt16BE:l,writeInt32BE:p,writeFloatBE:d,writeDoubleBE:g}
var v=t("./mapped.js")},{"./mapped.js":81}],86:[function(t,e){function n(t){for(var e=t.split("\n"),n=!1,r=!1,i={content:"",metadata:{}},o=0;o<e.length&&!r;o++)if(n)r||(r=!/^\s*$/.test(e[o]))
else{var s=/^([^:]+):\s*([^\r\n]+)\s*$/.exec(e[o])
if(s&&3===s.length){var a=s[1].trim()
i.metadata[a]=s[2]}else{if(0===o)return{content:t,metadata:{}}
n=!0}}return i.content=e.slice(o-1).join("\n"),i}function r(t,e){var r=n(e)
return r.metadata=t(r.metadata),r}function i(t,e,n){var o="string"!=typeof e
"undefined"==typeof n&&"string"!=typeof e&&(n=e)
var s="object"==typeof n?t.extend(n):t
return o?i.bind(null,s):r(s,e)}var o=t("weak-type-wizard")
e.exports=i.bind(null,new o({}))},{"weak-type-wizard":87}],87:[function(t,e){function n(t){return Object.keys(t).reduce(function(e,n){return s(!0,e,r(t[n],n))},{})}function r(t,e){return"string"==typeof t?r([t],e):Array.isArray(t)?t.reduce(function(t,n){return t[n]=e,t},{}):{}}function i(t,e,n){return Object.keys(e).filter(function(e){return"undefined"!=typeof t[e]}).forEach(function(r){var i=n[t[r]]
"function"==typeof i&&(e[r]=i(e[r]))}),e}function o(t,e,r){var u=function(n){var o=s(!0,{},e,n)
return i(t,o,r)}
return u.extend=function(i){var u=i.default
delete i.default
var c=i.cast
delete i.cast
var h=n(i)
return new o(s(!0,{},t,h),s(!0,{},e,u),s(!0,{},a,r,c))},u.getLevelUpEncoding=function(){return{buffer:!1,type:"weak-type-wizard",encode:JSON.stringify,decode:function(t){return u(JSON.parse(t))}}},u}var s=t("extend"),a={"boolean":function(t){return"false"!==t.toString().toLowerCase()&&!(/^\d+$/.test(t)&&0!==parseInt(t))},number:function(t){return parseFloat(t)},string:function(t){return t.toString()},date:function(t){return new Date(t)}},u=new o({},{})
e.exports=function(t){return u.extend(t)}},{extend:54}],88:[function(t,e){function n(t,e){for(var n=0,r=e.indexOf(t);-1!==r;)n++,r=e.indexOf(t,r+1)
return n}function r(t,e,r){return r.replace(/\[\[([\w.-]+)(?:\|([^\]>\n]+))?\]\]/gm,function(r,i,o,s,a){var u=n("<code",a.substr(0,s)),c=n("</code",a.substr(0,s))
return u!==c?r:(o=o||i,t.emit("link",i),'<a href="'+e+i+'">'+o+"</a>")})}var i=t("events").EventEmitter
e.exports=function(t){var e=Object.create(new i)
return e.linkify=r.bind(null,e,t),e}},{events:104}],89:[function(t,e){function n(t,e){function n(t){u.mixinHtml(t),u.parseTemplate(t),u.mixinChildPosts(t),u.mixinRenderedHtmlEmitter(t),t.on("all child posts fetched",function(t){t.templateElements.forEach(n)})}function i(t,e){var r=u.makeNewMixinObject(t)
n(r),r.on("final html rendered",function(t){e(null,t.renderedHtml)})}function o(t){u.mixinHtml(t),u.parseTemplate(t),u.mixinTemplateRactive(t),u.updateEmitterMixin(t),u.mixinTeardownChildren(t),u.mixinChildPosts(t),t.on("child post fetched",function(e){t.torndown||(o(e),t.children.push(e))}),t.on("post changed",function(e){var n=u.makeNewMixinObject(e)
n.elementId=t.elementId,n.data=t.data,t.ractive.teardown(),t.removeAllListeners(),o(n)}),t.ractive.on("teardown",function(){t.torndown=!0,t.teardownChildren(),t.removeAllListeners()})}function s(t){function e(e){t.teardownChildren(),a(e,t.ractive)}t.on("post changed",e),t.change=function(n){t.removeListener("post changed",e),e(n)},t.ractive.on("teardown",function(){t.teardownChildren(),t.torndown=!0})}function a(t,e){var n=u.makeNewMixinObject(t)
return n.ractive=e,u.mixinHtml(n),u.parseTemplate(n),u.updateEmitterMixin(n),u.mixinTeardownChildren(n),u.mixinChildPosts(n),s(n),n.on("child post fetched",function(t){n.torndown||(o(t),n.children.push(t))}),e.set("html",n.html),e.set("metadata",t.metadata),e.set("current",t.filename),n.change}var u=r(t,e)
return{populateRootRactive:a,renderPost:i}}var r=t("./mixins")
e.exports=n},{"./mixins":90}],90:[function(t,e){(function(n){function r(t){try{return new d({el:null,data:t.data,template:t.renderedHtml||t.html,preserveWhitespace:!0}).toHTML()}catch(e){return t.emit("error",e),e.message}}function i(t){var e=Object.create(new p)
return t&&(e.post=t,e.postName=t.filename),e}function o(t,e){var n=f.generatePostDiv(e.elementId),r=t.renderedHtml||t.html
return t.renderedHtml=r.replace(n,e.renderedHtml),t}function s(t,e){function r(){e.emit("all child posts fetched",e)}var i=0
return e.templateElements.forEach(function(n){t(n.postName,function(t,o){i+=1,t?n.err=t:(n.post=o,e.emit("child post fetched",n)),i===e.templateElements.length&&r()})}),0===e.templateElements.length&&n.nextTick(r),e}function a(t,e){return e.html=t(l(e.post)),e}function u(t){return t.on("all child posts fetched",function(t){if(0===t.templateElements.length)t.renderedHtml=r(t),n.nextTick(function(){t.emit("final html rendered",t)})
else{var e=0,i=function(n){o(t,n),e+=1,e>=t.templateElements.length&&(t.renderedHtml=r(t),t.emit("final html rendered",t))}
t.templateElements.forEach(function(t){t.once("final html rendered",i)})}}),t}function c(t){try{t.ractive=new d({el:t.elementId,data:t.data,template:t.html,preserveWhitespace:!0})}catch(e){t.ractive=new d({el:t.elementId,data:{error:e.message},template:v}),t.emit("error",e)}t.emit("ractive created",t)}function h(t){t.children=[],t.teardownChildren=function(){t.children.forEach(function(t){t.ractive&&t.ractive.teardown(),t.torndown=!0})}}var f=t("./templateToolbox.js"),l=f.htmlify,p=t("events").EventEmitter,d=t("ractive"),g=t("./updateEmitterMixin.js"),v=d.parse("{{error}}")
e.exports=function(e,n){return{mixinHtml:a.bind(null,n),makeNewMixinObject:i,mixinRenderedHtmlEmitter:u,parseTemplate:t("./parseTemplate"),mixinChildPosts:s.bind(null,e.getPost),updateEmitterMixin:g(e),mixinTemplateRactive:c,mixinTeardownChildren:h}}}).call(this,t("+0JsKK"))},{"+0JsKK":110,"./parseTemplate":93,"./templateToolbox.js":94,"./updateEmitterMixin.js":95,events:104,ractive:91}],91:[function(t,e){!function(t){"use strict"
var n=t.Ractive,r=void 0,i=function(){var t,e
return t={el:null,template:"",complete:null,preserveWhitespace:!1,append:!1,twoway:!0,modifyArrays:!0,lazy:!1,debug:!1,noIntro:!1,transitionsEnabled:!0,magic:!1,noCssTransform:!1,adapt:[],sanitize:!1,stripComments:!0,isolated:!1,delimiters:["{{","}}"],tripleDelimiters:["{{{","}}}"],computed:null},e={keys:Object.keys(t),defaults:t}}(r),o=function(){return"undefined"!=typeof document?document&&document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"):void 0}(),s={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},a=function(t,e){return t?function(t,n){return n&&n!==e.html?document.createElementNS(n,t):document.createElement(t)}:function(t,n){if(n&&n!==e.html)throw"This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information"
return document.createElement(t)}}(o,s),u="object"==typeof document,c=function(t){try{return Object.defineProperty({},"test",{value:0}),t&&Object.defineProperty(document.createElement("div"),"test",{value:0}),Object.defineProperty}catch(e){return function(t,e,n){t[e]=n.value}}}(u),h=function(t,e,n){try{try{Object.defineProperties({},{test:{value:0}})}catch(r){throw r}return n&&Object.defineProperties(t("div"),{test:{value:0}}),Object.defineProperties}catch(r){return function(t,n){var r
for(r in n)n.hasOwnProperty(r)&&e(t,r,n[r])}}}(a,c,u),f=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},l=function(t){return function(e,n,r){var i
if("string"!=typeof n||!t(r))throw new Error("Bad arguments")
if(i=+e.get(n)||0,!t(i))throw new Error("Cannot add to a non-numeric value")
return e.set(n,i+r)}}(f),p=function(t){return function(e,n){return t(this,e,void 0===n?1:+n)}}(l),d=function(t,e){return null===t&&null===e?!0:"object"==typeof t||"object"==typeof e?!1:t===e},g=function(){function t(t){setTimeout(t,0)}function e(t,e){return function(){for(var n;n=t.shift();)n(e)}}function n(t,e,i,o){var s
if(e===t)throw new TypeError("A promise's fulfillment handler cannot return the same promise")
if(e instanceof r)e.then(i,o)
else if(!e||"object"!=typeof e&&"function"!=typeof e)i(e)
else{try{s=e.then}catch(a){return void o(a)}if("function"==typeof s){var u,c,h
c=function(e){u||(u=!0,n(t,e,i,o))},h=function(t){u||(u=!0,o(t))}
try{s.call(e,c,h)}catch(a){if(!u)return o(a),void(u=!0)}}else i(e)}}var r,i={},o={},s={}
return r=function(a){var u,c,h,f,l,p,d=[],g=[],v=i
return h=function(n){return function(r){v===i&&(u=r,v=n,c=e(v===o?d:g,u),t(c))}},f=h(o),l=h(s),a(f,l),p={then:function(e,o){var s=new r(function(r,a){var u=function(t,e,i){e.push("function"==typeof t?function(e){var i
try{i=t(e),n(s,i,r,a)}catch(o){a(o)}}:i)}
u(e,d,r),u(o,g,a),v!==i&&t(c)})
return s}},p["catch"]=function(t){return this.then(null,t)},p},r.all=function(t){return new r(function(e,n){var r,i,o,s=[]
if(!t.length)return void e(s)
for(o=function(i){t[i].then(function(t){s[i]=t,--r||e(s)},n)},r=i=t.length;i--;)o(i)})},r.resolve=function(t){return new r(function(e){e(t)})},r.reject=function(t){return new r(function(e,n){n(t)})},r}(),v=function(){var t=/\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g
return function(e){return(e||"").replace(t,".$1")}}(),m=["o","ms","moz","webkit"],y=function(t){return"undefined"!=typeof window?(function(t,e,n){var r,i
if(!n.requestAnimationFrame){for(r=0;r<t.length&&!n.requestAnimationFrame;++r)n.requestAnimationFrame=n[t[r]+"RequestAnimationFrame"]
n.requestAnimationFrame||(i=n.setTimeout,n.requestAnimationFrame=function(t){var n,r,o
return n=Date.now(),r=Math.max(0,16-(n-e)),o=i(function(){t(n+r)},r),e=n+r,o})}}(t,0,window),window.requestAnimationFrame):void 0}(m),b=function(){return"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?function(){return window.performance.now()}:function(){return Date.now()}}(),w=[],E=function(t,e){var n=t.indexOf(e);-1!==n&&t.splice(n,1)},_=function(t,e,n){var r,i,o,s,a,u="/* Ractive.js component styles */\n",c={},h=[]
if(e)return t.push(function(){r=t.runloop}),i=document.createElement("style"),i.type="text/css",o=document.getElementsByTagName("head")[0],a=!1,s=i.styleSheet,{add:function(t){t.css&&(c[t._guid]||(c[t._guid]=0,h.push(t.css),r.scheduleCssUpdate()),c[t._guid]+=1)},remove:function(t){t.css&&(c[t._guid]-=1,c[t._guid]||(n(h,t.css),r.scheduleCssUpdate()))},update:function(){var t
h.length?(t=u+h.join(" "),s?s.cssText=t:i.innerHTML=t,a||o.appendChild(i)):a&&o.removeChild(i)}}}(w,u,E),x=function(t,e){var n,r,i,o,s,a
for(n=[],a=t._rendering?t.fragment.docFrag:t.el,r=a.querySelectorAll('input[type="checkbox"][name="{{'+e+'}}"]'),o=r.length,s=0;o>s;s+=1)i=r[s],(i.hasAttribute("checked")||i.checked)&&n.push(i._ractive.value)
return n},k=Object.prototype.hasOwnProperty,S=function(t){do if(t.context)return t.context
while(t=t.parent)
return""},N=function(t,e,n,r){var i,o='Could not resolve reference - too many "../" prefixes'
return t.push(function(){i=t.get}),function(t,s,a){var u,c,h,f,l,p,d,g,v
if(s=e(s),"."===s)return r(a)
if("."===s.charAt(0)){if(u=r(a),c=u?u.split("."):[],"../"===s.substr(0,3)){for(;"../"===s.substr(0,3);){if(!c.length)throw new Error(o)
c.pop(),s=s.substring(3)}return c.push(s),c.join(".")}return u?u+s:s.substring(1)}h=s.split("."),f=h.pop(),l=h.length?"."+h.join("."):""
do if(u=a.context,u&&(v=!0,p=u+l,d=i(t,p),(g=t._wrapped[p])&&(d=g.get()),d&&("object"==typeof d||"function"==typeof d)&&f in d))return u+"."+s
while(a=a.parent)
return v||t._parent&&!t.isolated?n.call(t.data,s)?s:void 0!==i(t,s)?s:void 0:s}}(w,v,k,S),O=function(t){var e,n,r,i,o=[""]
for(e=t.length;e--;)for(n=t[e],r=n.split(".");r.length>1;)r.pop(),i=r.join("."),o[i]!==!0&&(o.push(i),o[i]=!0)
return o},T=function(){function t(t,n,r){var o
for(t._patternObservers.length&&i(t,n,n,r,!0),o=0;o<t._deps.length;o+=1)e(t,n,o,r)}function e(t,e,i,o){var s=t._deps[i]
s&&(n(s[e]),o||r(t._depsMap[e],t,i))}function n(t){var e,n
if(t)for(n=t.length,e=0;n>e;e+=1)t[e].update()}function r(t,n,r,i){var o
if(t)for(o=t.length;o--;)e(n,t[o],r,i)}function i(t,e,n,r,s){var u,c,h,f,l,p,d,g
for(u=t._patternObservers.length;u--;)c=t._patternObservers[u],c.regex.test(n)&&c.update(n)
r||(g=function(e){if(h=t._depsMap[e])for(u=h.length;u--;)f=h[u],l=a.exec(f)[0],p=n?n+"."+l:l,i(t,f,p)},s?(d=o(n),d.forEach(g)):g(e))}function o(t){var e,n,r,i,o,a
for(e=t.split("."),n=s(e.length),o=[],r=function(t,n){return t?"*":e[n]},i=n.length;i--;)a=n[i].map(r).join("."),o[a]||(o.push(a),o[a]=!0)
return o}function s(t){var e,n,r,i,o,s=""
if(!u[t]){for(r=[];s.length<t;)s+=1
for(e=parseInt(s,2),i=function(t){return"1"===t},o=0;e>=o;o+=1){for(n=o.toString(2);n.length<t;)n="0"+n
r[o]=Array.prototype.map.call(n,i)}u[t]=r}return u[t]}var a,u={}
return a=/[^\.]+$/,t.multiple=function(t,n,r){var o,s,a
if(a=n.length,t._patternObservers.length)for(o=a;o--;)i(t,n[o],n[o],r,!0)
for(o=0;o<t._deps.length;o+=1)if(t._deps[o])for(s=a;s--;)e(t,n[s],o,r)},t}(),A=function(t){var e,n,r,i
return e=function(t,e){var o=[]
return o.detachQueue=[],o.remove=r,o.init=i,o._check=n,o._callback=t,o._previous=e,e&&e.push(o),o},n=function(){var t
if(this._ready&&!this.length){for(;t=this.detachQueue.pop();)t.detach()
"function"==typeof this._callback&&this._callback(),this._previous&&this._previous.remove(this)}},r=function(e){t(this,e),this._check()},i=function(){this._ready=!0,this._check()},e}(E),R=function(t,e,n,r,i,o,s,a){function u(){var t,n,r
for(b&&(b.focus(),b=null);t=k.pop();)t.update().deferred=!1
for(;t=w.pop();)t._sort()
for(;t=E.pop();)t.init()
for(;t=_.pop();)t.init()
for(;t=x.pop();)t.update()
for(;t=S.pop();)t.active=!1
for(;t=L.pop();)if(L[t._guid]=!1,t._changes.length){for(r={};n=t._changes.pop();)r[n]=l(t,n)
t.fire("change",r)}d&&(e.update(),d=!1)}function c(){var t,e,n
for(n=L.length;n--;)t=L[n],t._changes.length&&(e=o(t._changes),s.multiple(t,e,!0))
for(h();v;){for(v=!1;t=O.pop();)t.update()
for(;t=N.pop();)t.update().deferred=!1
for(;t=T.pop();)t.deferredUpdate()
for(;t=R.pop();)p(t.root,t.keypath,r(t.root,t.keypath))
for(;t=C.pop();)t.update()}}function h(){var t,e,n
if(I.length)for(t=I.splice(0,I.length);e=t.pop();)e.keypath||(n=i(e.root,e.ref,e.parentFragment),void 0!==n?e.resolve(n):I.push(e))}t.push(function(){l=t.get,p=t.set})
var f,l,p,d,g,v=!1,m=!1,y=0,b=null,w=[],E=[],_=[],x=[],k=[],S=[],N=[],O=[],T=[],A={},R=[],C=[],I=[],L=[]
return f={start:function(t,e){this.addInstance(t),m||(y+=1,g=a(e,g))},end:function(){return m?void h():(--y||(m=!0,c(),m=!1,u()),g.init(),void(g=g._previous))},trigger:function(){return y||m?void h():(m=!0,c(),m=!1,void u())},focus:function(t){b=t},addInstance:function(t){t&&!L[t._guid]&&(L.push(t),L[L._guid]=!0)},addLiveQuery:function(t){w.push(t)},addDecorator:function(t){E.push(t)},addTransition:function(t){t._manager=g,g.push(t),_.push(t)},addObserver:function(t){x.push(t)},addAttribute:function(t){k.push(t)},addBinding:function(t){t.active=!0,S.push(t)},scheduleCssUpdate:function(){y||m?d=!0:e.update()},addEvaluator:function(t){v=!0,N.push(t)},addComputation:function(t){v=!0,O.push(t)},addSelectValue:function(t){v=!0,T.push(t)},addCheckbox:function(t){A[t.keypath]||(v=!0,R.push(t))},addRadio:function(t){v=!0,C.push(t)},addUnresolved:function(t){v=!0,I.push(t)},removeUnresolved:function(t){n(I,t)},detachWhenReady:function(t){g.detachQueue.push(t)}},t.runloop=f,f}(w,_,E,x,N,O,T,A),C=function(t,e,n){var r=[],i={tick:function(){var o,s,a
for(a=e(),n.start(),o=0;o<r.length;o+=1)s=r[o],s.tick(a)||r.splice(o--,1)
n.end(),r.length?t(i.tick):i.running=!1},add:function(e){r.push(e),i.running||(i.running=!0,t(i.tick))},abort:function(t,e){for(var n,i=r.length;i--;)n=r[i],n.root===e&&n.keypath===t&&n.stop()}}
return i}(y,b,R),I=function(){var t=Object.prototype.toString
return function(e){return"[object Array]"===t.call(e)}}(),L=function(t){return function(e){var n,r
if(!e||"object"!=typeof e)return e
if(t(e))return e.slice()
n={}
for(r in e)e.hasOwnProperty(r)&&(n[r]=e[r])
return n}}(I),j={},M=function(t,e,n){switch(e){case"splice":return n
case"sort":case"reverse":return null
case"pop":return t.length?[-1]:null
case"push":return[t.length,0].concat(n)
case"shift":return[0,1]
case"unshift":return[0,0].concat(n)}},P=function(t,e){var n,r,i,o
return e?(n=+(e[0]<0?t.length+e[0]:e[0]),r=Math.max(0,e.length-2),i=void 0!==e[1]?e[1]:t.length-n,i=Math.min(i,t.length-n),o=r-i,{start:n,balance:o,added:r,removed:i}):null},F={TEXT:1,INTERPOLATOR:2,TRIPLE:3,SECTION:4,INVERTED:5,CLOSING:6,ELEMENT:7,PARTIAL:8,COMMENT:9,DELIMCHANGE:10,MUSTACHE:11,TAG:12,ATTRIBUTE:13,COMPONENT:15,NUMBER_LITERAL:20,STRING_LITERAL:21,ARRAY_LITERAL:22,OBJECT_LITERAL:23,BOOLEAN_LITERAL:24,GLOBAL:26,KEY_VALUE_PAIR:27,REFERENCE:30,REFINEMENT:31,MEMBER:32,PREFIX_OPERATOR:33,BRACKETED:34,CONDITIONAL:35,INFIX_OPERATOR:36,INVOCATION:40},B=function po(t,e,n){var r,i
if(n||(i=t._wrapped[e])&&i.teardown()!==!1&&(t._wrapped[e]=null),t._cache[e]=void 0,r=t._cacheMap[e])for(;r.length;)po(t,r.pop())},D=function(){var t=/^\s*[0-9]+\s*$/
return function(e){return t.test(e)?[]:{}}}(),U=function(t,e,n,r,i){function o(t,a,u,c){var h,f,l,p,d,g,v,m
e(t._cache[a],u)||(d=t._computations[a],g=t._wrapped[a],v=t._evaluators[a],d&&!d.setting&&d.set(u),g&&g.reset&&(m=g.reset(u)!==!1,m&&(u=g.get())),v&&(v.value=u),d||v||m||(h=a.split("."),f=h.pop(),l=h.join("."),g=t._wrapped[l],g&&g.set?g.set(f,u):(p=g?g.get():s(t,l),p||(p=n(f),o(t,l,p,!0)),p[f]=u)),r(t,a,m),c||(t._changes.push(a),i(t,a)))}var s
return t.push(function(){s=t.get}),t.set=o,o}(w,d,D,B,T),q=function(t,e,n,r){return function(i,o,s,a){var u,c,h,f,l,p,d,g,v,m
if(u=i.root,c=i.keypath,u._changes.push(c),"sort"===s||"reverse"===s)return void r(u,c,o)
if(a){for(h=a.balance?o.length-Math.min(a.balance,0):a.added,l=a.start;h>l;l+=1)e(u,c+"."+l)
if(f=function(e){e.keypath===c&&e.type===t.SECTION&&!e.inverted&&e.docFrag?e.splice(a):e.update()},u._deps.forEach(function(t){var e=t[c]
e&&e.forEach(f)}),a.added&&a.removed)for(p=Math.max(a.added,a.removed),d=a.start,g=d+p,m=a.added===a.removed,l=d;g>l;l+=1)v=c+"."+l,n(u,v)
m||(e(u,c+".length"),n(u,c+".length",!0))}}}(F,B,T,U),W=function(t,e,n,r,i){var o,s,a,u=[],c=["pop","push","reverse","shift","sort","splice","unshift"]
return c.forEach(function(o){var s=function(){var e,s,a,u,c
for(e=n(this,o,Array.prototype.slice.call(arguments)),s=r(this,e),a=Array.prototype[o].apply(this,arguments),this._ractive.setting=!0,c=this._ractive.wrappers.length;c--;)u=this._ractive.wrappers[c],t.start(u.root),i(u,this,o,s),t.end()
return this._ractive.setting=!1,a}
e(u,o,{value:s})}),o={},o.__proto__?(s=function(t){t.__proto__=u},a=function(t){t.__proto__=Array.prototype}):(s=function(t){var n,r
for(n=c.length;n--;)r=c[n],e(t,r,{value:u[r],configurable:!0})},a=function(t){var e
for(e=c.length;e--;)delete t[c[e]]}),s.unpatch=a,s}(R,c,M,P,q),K=function(t,e,n){var r,i,o
return r={filter:function(t){return e(t)&&(!t._ractive||!t._ractive.setting)},wrap:function(t,e,n){return new i(t,e,n)}},i=function(e,r,i){this.root=e,this.value=r,this.keypath=i,r._ractive||(t(r,"_ractive",{value:{wrappers:[],instances:[],setting:!1},configurable:!0}),n(r)),r._ractive.instances[e._guid]||(r._ractive.instances[e._guid]=0,r._ractive.instances.push(e)),r._ractive.instances[e._guid]+=1,r._ractive.wrappers.push(this)},i.prototype={get:function(){return this.value},teardown:function(){var t,e,r,i,s
if(t=this.value,e=t._ractive,r=e.wrappers,i=e.instances,e.setting)return!1
if(s=r.indexOf(this),-1===s)throw new Error(o)
if(r.splice(s,1),r.length){if(i[this.root._guid]-=1,!i[this.root._guid]){if(s=i.indexOf(this.root),-1===s)throw new Error(o)
i.splice(s,1)}}else delete t._ractive,n.unpatch(this.value)}},o="Something went wrong in a rather interesting way",r}(c,I,W),z=function(t,e,n,r,i){function o(e,n,o){function s(e){var o,s
e.value=n,e.updating||(s=e.ractive,o=e.keypath,e.updating=!0,t.start(s),s._changes.push(o),r(s,o),i(s,o),t.end(),e.updating=!1)}var a,u,c,h,f,l
if(a=e.obj,u=e.prop,o&&!o.configurable){if("length"===u)return
throw new Error('Cannot use magic mode with property "'+u+'" - object is not configurable')}o&&(c=o.get,h=o.set),f=c||function(){return n},l=function(t){h&&h(t),n=c?c():t,l._ractiveWrappers.forEach(s)},l._ractiveWrappers=[e],Object.defineProperty(a,u,{get:f,set:l,enumerable:!0,configurable:!0})}var s,a
try{Object.defineProperty({},"test",{value:0})}catch(u){return!1}return s={filter:function(t,e,r){var i,o,s,a,u
return e?(i=e.split("."),o=i.pop(),s=i.join("."),(a=r._wrapped[s])&&!a.magic?!1:(u=r.get(s),n(u)&&/^[0-9]+$/.test(o)?!1:u&&("object"==typeof u||"function"==typeof u))):!1},wrap:function(t,e,n){return new a(t,e,n)}},a=function(t,e,n){var r,i,s,a
return this.magic=!0,this.ractive=t,this.keypath=n,this.value=e,r=n.split("."),this.prop=r.pop(),i=r.join("."),this.obj=i?t.get(i):t.data,s=this.originalDescriptor=Object.getOwnPropertyDescriptor(this.obj,this.prop),s&&s.set&&(a=s.set._ractiveWrappers)?void(-1===a.indexOf(this)&&a.push(this)):void o(this,e,s)},a.prototype={get:function(){return this.value},reset:function(t){this.updating||(this.updating=!0,this.obj[this.prop]=t,r(this.ractive,this.keypath),this.updating=!1)},set:function(t,n){this.updating||(this.obj[this.prop]||(this.updating=!0,this.obj[this.prop]=e(t),this.updating=!1),this.obj[this.prop][t]=n)},teardown:function(){var t,e,n,r,i
return this.updating?!1:(t=Object.getOwnPropertyDescriptor(this.obj,this.prop),e=t&&t.set,void(e&&(r=e._ractiveWrappers,i=r.indexOf(this),-1!==i&&r.splice(i,1),r.length||(n=this.obj[this.prop],Object.defineProperty(this.obj,this.prop,this.originalDescriptor||{writable:!0,enumerable:!0,configurable:!0}),this.obj[this.prop]=n))))}},s}(R,D,I,B,T),V=function(t,e){if(!t)return!1
var n,r
return n={filter:function(n,r,i){return t.filter(n,r,i)&&e.filter(n)},wrap:function(t,e,n){return new r(t,e,n)}},r=function(n,r,i){this.value=r,this.magic=!0,this.magicWrapper=t.wrap(n,r,i),this.arrayWrapper=e.wrap(n,r,i)},r.prototype={get:function(){return this.value},teardown:function(){this.arrayWrapper.teardown(),this.magicWrapper.teardown()},reset:function(t){return this.magicWrapper.reset(t)}},n}(z,K),H=function(t,e,n,r){function i(t,e){var n,r={}
if(!e)return t
e+="."
for(n in t)t.hasOwnProperty(n)&&(r[e+n]=t[n])
return r}function o(t){var e
return s[t]||(e=t?t+".":"",s[t]=function(n,r){var o
return"string"==typeof n?(o={},o[e+n]=r,o):"object"==typeof n?e?i(n,t):n:void 0}),s[t]}var s={}
return function(i,s,a,u){var c,h,f,l
for(c=i.adapt.length,h=0;c>h;h+=1){if(f=i.adapt[h],"string"==typeof f){if(!t[f])throw new Error('Missing adaptor "'+f+'"')
f=i.adapt[h]=t[f]}if(f.filter(a,s,i))return l=i._wrapped[s]=f.wrap(i,a,s,o(s)),l.value=a,a}return u||(i.magic?r.filter(a,s,i)?i._wrapped[s]=r.wrap(i,a,s):n.filter(a,s,i)&&(i._wrapped[s]=n.wrap(i,a,s)):i.modifyArrays&&e.filter(a,s,i)&&(i._wrapped[s]=e.wrap(i,a,s))),a}}(j,K,z,V),J=function(){function t(t,e){var n,r,i
for(n=e.split(".");n.length;)n.pop(),r=n.join("."),i=t._depsMap[r]||(t._depsMap[r]=[]),void 0===i[e]&&(i[e]=0,i[i.length]=e),i[e]+=1,e=r}return function(e){var n,r,i,o,s
i=e.root,o=e.keypath,s=e.priority,n=i._deps[s]||(i._deps[s]={}),r=n[o]||(n[o]=[]),r.push(e),e.registered=!0,o&&t(i,o)}}(),$=function(){function t(t,e){var n,r,i
for(n=e.split(".");n.length;)n.pop(),r=n.join("."),i=t._depsMap[r],i[e]-=1,i[e]||(i.splice(i.indexOf(e),1),i[e]=void 0),e=r}return function(e){var n,r,i,o,s
if(i=e.root,o=e.keypath,s=e.priority,n=i._deps[s][o],r=n.indexOf(e),-1===r||!e.registered)throw new Error("Attempted to remove a dependant that was no longer registered! This should not happen. If you are seeing this bug in development please raise an issue at https://github.com/RactiveJS/Ractive/issues - thanks")
n.splice(r,1),e.registered=!1,o&&t(i,o)}}(),G=function(t,e,n,r,i,o){var s,a
t.push(function(){s=t.get,a=t.set})
var u=function(t,e,n,r,o){this.root=t,this.keypath=e,this.priority=o,this.otherInstance=n,this.otherKeypath=r,i(this),this.value=s(this.root,this.keypath)}
return u.prototype={update:function(){var t
this.updating||this.counterpart&&this.counterpart.updating||(t=s(this.root,this.keypath),n(t)&&t._ractive&&t._ractive.setting||r(t,this.value)||(this.updating=!0,e.addInstance(this.otherInstance),a(this.otherInstance,this.otherKeypath,t),this.value=t,this.updating=!1))},reassign:function(t){o(this),o(this.counterpart),this.keypath=t,this.counterpart.otherKeypath=t,i(this),i(this.counterpart)},teardown:function(){o(this)}},function(t,e,n,r){var i,o,s,a,c,h
i=n+"="+r,s=t.bindings,s[i]||(s[i]=!0,o=t.instance,a=t.parentFragment.priority,c=new u(e,n,o,r,a),s.push(c),o.twoway&&(h=new u(o,r,e,n,1),s.push(h),c.counterpart=h,h.counterpart=c))}}(w,R,I,d,J,$),X=function(t,e,n){function r(t,r,i,o,s){n(r,o,s,!0),e(r.component,t,i,o)}var i
return t.push(function(){i=t.get}),function(t,e){var n,o,s,a,u
if(n=t._parent,o=t.component.parentFragment,o.indexRefs&&void 0!==(u=o.indexRefs[e]))return t.component.indexRefBindings[e]=e,u
do if(o.context&&(s=o.context+"."+e,a=i(n,s),void 0!==a))return r(n,t,s,e,a),a
while(o=o.parent)
return a=i(n,e),void 0!==a?(r(n,t,e,e,a),a):void 0}}(w,G,U),Q={FAILED_LOOKUP:!0},Y=function(t,e,n,r,i,o){function s(t,e,n){var s,u,c,h,f=t._cache
return void 0===f[e]?((u=t._computations[e])?s=u.value:(c=t._wrapped[e])?s=c.value:e?s=(h=t._evaluators[e])?h.value:a(t,e):(r(t,"",t.data),s=t.data),f[e]=s):s=f[e],s===o&&(s=t._parent&&!t.isolated?i(t,e,n):void 0),n&&n.evaluateWrapped&&(c=t._wrapped[e])&&(s=c.get()),s}function a(t,i){var a,u,c,h,f,l,p,d
return a=i.split("."),u=a.pop(),c=a.join("."),h=s(t,c),(p=t._wrapped[c])&&(h=p.get()),null!==h&&void 0!==h?((f=t._cacheMap[c])?-1===f.indexOf(i)&&f.push(i):t._cacheMap[c]=[i],"object"!=typeof h||u in h?(d=!e.call(h,u),l=d?n(h[u]):h[u],l=r(t,i,l,!1),t._cache[i]=l,l):t._cache[i]=o):void 0}return t.get=s,s}(w,k,L,H,X,Q),Z=function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&"function"==typeof console.warn.apply?function(){console.warn.apply(console,arguments)}:function(){}}(),te=function(){var t=Object.prototype.toString
return function(e){return"object"==typeof e&&"[object Object]"===t.call(e)}}(),ee=function(t,e,n,r,i){var o,s,a
return t.push(function(){s=t.interpolate}),a=/^([+-]?[0-9]+\.?(?:[0-9]+)?)(px|em|ex|%|in|cm|mm|pt|pc)$/,o={number:function(t,e){var n
return i(t)&&i(e)?(t=+t,e=+e,n=e-t,n?function(e){return t+e*n}:function(){return t}):null},array:function(t,e){var r,i,o,a
if(!n(t)||!n(e))return null
for(r=[],i=[],a=o=Math.min(t.length,e.length);a--;)i[a]=s(t[a],e[a])
for(a=o;a<t.length;a+=1)r[a]=t[a]
for(a=o;a<e.length;a+=1)r[a]=e[a]
return function(t){for(var e=o;e--;)r[e]=i[e](t)
return r}},object:function(t,n){var i,o,a,u,c
if(!r(t)||!r(n))return null
i=[],u={},a={}
for(c in t)e.call(t,c)&&(e.call(n,c)?(i.push(c),a[c]=s(t[c],n[c])):u[c]=t[c])
for(c in n)e.call(n,c)&&!e.call(t,c)&&(u[c]=n[c])
return o=i.length,function(t){for(var e,n=o;n--;)e=i[n],u[e]=a[e](t)
return u}},cssLength:function(t,e){var n,r,i,o,s,u,c,h
return 0!==t&&"string"!=typeof t||0!==e&&"string"!=typeof e?null:(n=a.exec(t),r=a.exec(e),i=n?n[2]:"",o=r?r[2]:"",i&&o&&i!==o?null:(c=i||o,s=n?+n[1]:0,u=r?+r[1]:0,h=u-s,h?function(t){return s+t*h+c}:function(){return s+c}))}}}(w,k,I,te,f),ne=function(t,e,n){function r(t){return function(){return t}}var i=function(t,i,o,s){if(t===i)return r(i)
if(s){if(o.interpolators[s])return o.interpolators[s](t,i)||r(i)
e('Missing "'+s+'" interpolator. You may need to download a plugin from [TODO]')}return n.number(t,i)||n.array(t,i)||n.object(t,i)||n.cssLength(t,i)||r(i)}
return t.interpolate=i,i}(w,Z,ee),re=function(t,e,n,r){var i=function(t){var e
this.startTime=Date.now()
for(e in t)t.hasOwnProperty(e)&&(this[e]=t[e])
this.interpolator=n(this.from,this.to,this.root,this.interpolator),this.running=!0}
return i.prototype={tick:function(){var n,i,o,s,a,u
return u=this.keypath,this.running?(s=Date.now(),n=s-this.startTime,n>=this.duration?(null!==u&&(e.start(this.root),r(this.root,u,this.to),e.end()),this.step&&this.step(1,this.to),this.complete(this.to),a=this.root._animations.indexOf(this),-1===a&&t("Animation was not found"),this.root._animations.splice(a,1),this.running=!1,!1):(i=this.easing?this.easing(n/this.duration):n/this.duration,null!==u&&(o=this.interpolator(i),e.start(this.root),r(this.root,u,o),e.end()),this.step&&this.step(i,o),!0)):!1},stop:function(){var e
this.running=!1,e=this.root._animations.indexOf(this),-1===e&&t("Animation was not found"),this.root._animations.splice(e,1)}},i}(Z,R,ne,U),ie=function(t,e,n,r,i,o){function s(e,s,a,c){var h,f,l,p
return s&&(s=n(s)),null!==s&&(p=i(e,s)),r.abort(s,e),t(p,a)?(c.complete&&c.complete(c.to),u):(c.easing&&(h="function"==typeof c.easing?c.easing:e.easing[c.easing],"function"!=typeof h&&(h=null)),f=void 0===c.duration?400:c.duration,l=new o({keypath:s,from:p,to:a,root:e,duration:f,easing:h,interpolator:c.interpolator,step:c.step,complete:c.complete}),r.add(l),e._animations.push(l),l)}var a=function(){},u={stop:a}
return function(t,n,r){var i,o,u,c,h,f,l,p,d,g,v,m,y,b
if(i=new e(function(t){o=t}),"object"==typeof t){r=n||{},f=r.easing,l=r.duration,h=[],p=r.step,d=r.complete,(p||d)&&(v={},r.step=null,r.complete=null,g=function(t){return function(e,n){v[t]=n}})
for(u in t)t.hasOwnProperty(u)&&((p||d)&&(m=g(u),r={easing:f,duration:l},p&&(r.step=m)),r.complete=d?m:a,h.push(s(this,u,t[u],r)))
return(p||d)&&(b={easing:f,duration:l},p&&(b.step=function(t){p(t,v)}),d&&i.then(function(t){d(t,v)}),b.complete=o,y=s(this,null,null,b),h.push(y)),{stop:function(){for(var t;t=h.pop();)t.stop()
y&&y.stop()}}}return r=r||{},r.complete&&i.then(r.complete),r.complete=o,c=s(this,t,n,r),i.stop=function(){c.stop()},i}}(d,g,v,C,Y,re),oe=function(){return this.fragment.detach()},se=function(t){return this.el?this.fragment.find(t):null},ae=function(t,e,n){var r,i,o,s,a,u,c
if(t){for(r=n("div"),i=["matches","matchesSelector"],c=function(t){return function(e,n){return e[t](n)}},a=i.length;a--;){if(o=i[a],r[o])return c(o)
for(u=e.length;u--;)if(s=e[a]+o.substr(0,1).toUpperCase()+o.substring(1),r[s])return c(s)}return function(t,e){var n,r
for(n=(t.parentNode||t.document).querySelectorAll(e),r=n.length;r--;)if(n[r]===t)return!0
return!1}}}(u,m,a),ue=function(t){return function(e,n){var r=this._isComponentQuery?!this.selector||e.name===this.selector:t(e.node,this.selector)
return r?(this.push(e.node||e.instance),n||this._makeDirty(),!0):void 0}}(ae),ce=function(){var t,e,n
t=this._root[this._isComponentQuery?"liveComponentQueries":"liveQueries"],e=this.selector,n=t.indexOf(e),-1!==n&&(t.splice(n,1),t[e]=null)},he=function(){function t(t){var e
return(e=t.parentFragment)?e.owner:t.component&&(e=t.component.parentFragment)?e.owner:void 0}function e(e){var n,r
for(n=[e],r=t(e);r;)n.push(r),r=t(r)
return n}return function(t,n){var r,i,o,s,a,u,c,h,f,l
for(r=e(t.component||t._ractive.proxy),i=e(n.component||n._ractive.proxy),o=r[r.length-1],s=i[i.length-1];o&&o===s;)r.pop(),i.pop(),a=o,o=r[r.length-1],s=i[i.length-1]
if(o=o.component||o,s=s.component||s,f=o.parentFragment,l=s.parentFragment,f===l)return u=f.items.indexOf(o),c=l.items.indexOf(s),u-c||r.length-i.length
if(h=a.fragments)return u=h.indexOf(f),c=h.indexOf(l),u-c||r.length-i.length
throw new Error("An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/RactiveJS/Ractive/issues - thanks!")}}(),fe=function(t){return function(e,n){var r
return e.compareDocumentPosition?(r=e.compareDocumentPosition(n),2&r?1:-1):t(e,n)}}(he),le=function(t,e){return function(){this.sort(this._isComponentQuery?e:t),this._dirty=!1}}(fe,he),pe=function(t){return function(){this._dirty||(t.addLiveQuery(this),this._dirty=!0)}}(R),de=function(t){var e=this.indexOf(this._isComponentQuery?t.instance:t);-1!==e&&this.splice(e,1)},ge=function(t,e,n,r,i,o){return function(s,a,u,c){var h=[]
return t(h,{selector:{value:a},live:{value:u},_isComponentQuery:{value:c},_test:{value:e}}),u?(t(h,{cancel:{value:n},_root:{value:s},_sort:{value:r},_makeDirty:{value:i},_remove:{value:o},_dirty:{value:!1,writable:!0}}),h):h}}(h,ue,ce,le,pe,de),ve=function(t){return function(e,n){var r,i
return this.el?(n=n||{},r=this._liveQueries,(i=r[e])?n&&n.live?i:i.slice():(i=t(this,e,!!n.live,!1),i.live&&(r.push(e),r[e]=i),this.fragment.findAll(e,i),i)):[]}}(ge),me=function(t){return function(e,n){var r,i
return n=n||{},r=this._liveComponentQueries,(i=r[e])?n&&n.live?i:i.slice():(i=t(this,e,!!n.live,!0),i.live&&(r.push(e),r[e]=i),this.fragment.findAllComponents(e,i),i)}}(ge),ye=function(t){return this.fragment.findComponent(t)},be=function(t){var e,n,r,i=this._subs[t]
if(i)for(e=Array.prototype.slice.call(arguments,1),n=0,r=i.length;r>n;n+=1)i[n].apply(this,e)},we=function(t,e,n,r){var i,o={}
t.push(function(){i=t.get})
var s=function(t,e){this.root=t,this.ref=e,this.parentFragment=o,t._unresolvedImplicitDependencies[e]=!0,t._unresolvedImplicitDependencies.push(this),n.addUnresolved(this)}
return s.prototype={resolve:function(){var t=this.root
r(t,this.ref),t._unresolvedImplicitDependencies[this.ref]=!1,e(t._unresolvedImplicitDependencies,this)},teardown:function(){n.removeUnresolved(this)}},s}(w,E,R,T),Ee=function(t,e,n){var r={isTopLevel:!0}
return function(i){var o
return i=t(i),o=e(this,i,r),this._captured&&this._captured[i]!==!0&&(this._captured.push(i),this._captured[i]=!0,void 0===o&&this._unresolvedImplicitDependencies[i]!==!0&&new n(this,i)),o}}(v,Y,we),_e=function(t){var e
return"undefined"!=typeof window&&document&&t?t.nodeType?t:"string"==typeof t&&(e=document.getElementById(t),!e&&document.querySelector&&(e=document.querySelector(t)),e&&e.nodeType)?e:t[0]&&t[0].nodeType?t[0]:null:null},xe=function(t){return function(e,n){if(e=t(e),n=t(n)||null,!e)throw new Error("You must specify a valid target to insert into")
e.insertBefore(this.detach(),n),this.fragment.pNode=this.el=e}}(_e),ke=function(t,e){var n,r,i,o
return n={},r=0,i=t.map(function(t,i){var s,a,u
a=r,u=e.length
do{if(s=e.indexOf(t,a),-1===s)return o=!0,-1
a=s+1}while(n[s]&&u>a)
return s===r&&(r+=1),s!==i&&(o=!0),n[s]=!0,s}),i.unchanged=!o,i},Se=function(t,e){return function(n,r,i,o){var s
n._changes.push(r),s=function(e){e.type===t.REFERENCE?e.update():e.keypath===r&&e.type===t.SECTION&&!e.inverted&&e.docFrag?e.merge(i):e.update()},n._deps.forEach(function(t){var e=t[r]
e&&e.forEach(s)}),o||e(n,r+".length",!0)}}(F,T),Ne=function(t,e,n,r,i,o,s){function a(t){return JSON.stringify(t)}function u(t){if(t===!0)return a
if("string"==typeof t)return c[t]||(c[t]=function(e){return e[t]}),c[t]
if("function"==typeof t)return t
throw new Error("The `compare` option must be a function, or a string representing an identifying field (or `true` to use JSON.stringify)")}var c={}
return function(a,c,h){var f,l,p,d,g,v,m,y
if(f=this.get(a),!n(f)||!n(c))return this.set(a,c,h&&h.complete)
if(g=f.length===c.length,h&&h.compare){d=u(h.compare)
try{l=f.map(d),p=c.map(d)}catch(b){if(this.debug)throw b
e("Merge operation: comparison failed. Falling back to identity checking"),l=f,p=c}}else l=f,p=c
return v=o(l,p),m=new r(function(t){y=t}),t.start(this,y),i(this,a,c,!0),s(this,a,v,g),t.end(),h&&h.complete&&m.then(h.complete),m}}(R,Z,I,g,U,ke,Se),Oe=function(t,e,n){var r=function(t,e,n,r){var i=this
this.root=t,this.keypath=e,this.callback=n,this.defer=r.defer,this.debug=r.debug,this.proxy={update:function(){i.reallyUpdate()}},this.priority=0,this.context=r&&r.context?r.context:t}
return r.prototype={init:function(t){t!==!1?this.update():this.value=n(this.root,this.keypath)},update:function(){return this.defer&&this.ready?void t.addObserver(this.proxy):void this.reallyUpdate()},reallyUpdate:function(){var t,r
if(t=this.value,r=n(this.root,this.keypath),this.value=r,!this.updating){if(this.updating=!0,!e(r,t)||!this.ready)try{this.callback.call(this.context,r,t,this.keypath)}catch(i){if(this.debug||this.root.debug)throw i}this.updating=!1}}},r}(R,d,Y),Te=function(t){return function(e,n){var r,i,o,s,a,u,c
for(r=n.split("."),s=[],u=function(n){var r,i
r=e._wrapped[n]?e._wrapped[n].get():e.get(n)
for(i in r)!r.hasOwnProperty(i)||"_ractive"===i&&t(r)||a.push(n+"."+i)},c=function(t){return t+"."+i};i=r.shift();)"*"===i?(a=[],s.forEach(u),s=a):s[0]?s=s.map(c):s[0]=i
return o={},s.forEach(function(t){o[t]=e.get(t)}),o}}(I),Ae=function(t,e,n,r){var i,o=/\*/
return i=function(t,e,n,r){this.root=t,this.callback=n,this.defer=r.defer,this.debug=r.debug,this.keypath=e,this.regex=new RegExp("^"+e.replace(/\./g,"\\.").replace(/\*/g,"[^\\.]+")+"$"),this.values={},this.defer&&(this.proxies=[]),this.priority="pattern",this.context=r&&r.context?r.context:t},i.prototype={init:function(t){var e,n
if(e=r(this.root,this.keypath),t!==!1)for(n in e)e.hasOwnProperty(n)&&this.update(n)
else this.values=e},update:function(e){var n
{if(!o.test(e))return this.defer&&this.ready?void t.addObserver(this.getProxy(e)):void this.reallyUpdate(e)
n=r(this.root,e)
for(e in n)n.hasOwnProperty(e)&&this.update(e)}},reallyUpdate:function(t){var r=n(this.root,t)
if(this.updating)return void(this.values[t]=r)
if(this.updating=!0,!e(r,this.values[t])||!this.ready){try{this.callback.call(this.context,r,this.values[t],t)}catch(i){if(this.debug||this.root.debug)throw i}this.values[t]=r}this.updating=!1},getProxy:function(t){var e=this
return this.proxies[t]||(this.proxies[t]={update:function(){e.reallyUpdate(t)}}),this.proxies[t]}},i}(R,d,Y,Te),Re=function(t,e,n,r,i){var o=/\*/,s={}
return function(a,u,c,h){var f,l
return u=t(u),h=h||s,o.test(u)?(f=new i(a,u,c,h),a._patternObservers.push(f),l=!0):f=new r(a,u,c,h),e(f),f.init(h.init),f.ready=!0,{cancel:function(){var t
l&&(t=a._patternObservers.indexOf(f),-1!==t&&a._patternObservers.splice(t,1)),n(f)}}}}(v,J,$,Oe,Ae),Ce=function(t,e){return function(n,r,i){var o,s,a,u
if(t(n)){i=r,s=n,o=[]
for(n in s)s.hasOwnProperty(n)&&(r=s[n],o.push(this.observe(n,r,i)))
return{cancel:function(){for(;o.length;)o.pop().cancel()}}}if("function"==typeof n)return i=r,r=n,n="",e(this,n,r,i)
if(a=n.split(" "),1===a.length)return e(this,n,r,i)
for(o=[],u=a.length;u--;)n=a[u],n&&o.push(e(this,n,r,i))
return{cancel:function(){for(;o.length;)o.pop().cancel()}}}}(te,Re),Ie=function(t,e){var n,r
if(!e)if(t)this._subs[t]=[]
else for(t in this._subs)delete this._subs[t]
n=this._subs[t],n&&(r=n.indexOf(e),-1!==r&&n.splice(r,1))},Le=function(t,e){var n,r,i=this
if("object"==typeof t){n=[]
for(r in t)t.hasOwnProperty(r)&&n.push(this.on(r,t[r]))
return{cancel:function(){for(var t;t=n.pop();)t.cancel()}}}return this._subs[t]?this._subs[t].push(e):this._subs[t]=[e],{cancel:function(){i.off(t,e)}}},je=function(){var t
try{Object.create(null),t=Object.create}catch(e){t=function(){var t=function(){}
return function(e,n){var r
return null===e?{}:(t.prototype=e,r=new t,n&&Object.defineProperties(r,n),r)}}()}return t}(),Me=function(t,e){return function(n,r){var i,o,s,a,u
if(n.owner=r.owner,s=n.parent=n.owner.parentFragment,n.root=r.root,n.pNode=r.pNode,n.pElement=r.pElement,n.context=r.context,n.owner.type===t.SECTION&&(n.index=r.index),s&&(a=s.indexRefs)){n.indexRefs=e(null)
for(u in a)n.indexRefs[u]=a[u]}for(n.priority=s?s.priority+1:1,r.indexRef&&(n.indexRefs||(n.indexRefs={}),n.indexRefs[r.indexRef]=r.index),n.items=[],i=r.descriptor?r.descriptor.length:0,o=0;i>o;o+=1)n.items[n.items.length]=n.createItem({parentFragment:n,pElement:r.pElement,descriptor:r.descriptor[o],index:o})}}(F,je),Pe=function(t,e){return t.substr(0,e.length+1)===e+"."},Fe=function(t){return function(e,n){return e===n||t(e,n)}}(Pe),Be=function(t){return function(e,n,r){return e===n?r:t(e,n)?e.replace(n+".",r+"."):void 0}}(Pe),De=function(t,e){return function(n,r,i,o){n[r]&&!t(n[r],o)&&(n[r]=e(n[r],i,o))}}(Fe,Be),Ue=function(t){return function(e,n,r,i){void 0===this.html&&(t(this,"context",r,i),this.indexRefs&&void 0!==this.indexRefs[e]&&this.indexRefs[e]!==n&&(this.indexRefs[e]=n),this.items.forEach(function(t){t.reassign(e,n,r,i)}))}}(De),qe=function(t,e){return{init:t,reassign:e}}(Me,Ue),We=function(t,e){function n(t){return o[t]||(o[t]=e(t))}var r,i,o={}
try{e("table").innerHTML="foo"}catch(s){r=!0,i={TABLE:['<table class="x">',"</table>"],THEAD:['<table><thead class="x">',"</thead></table>"],TBODY:['<table><tbody class="x">',"</tbody></table>"],TR:['<table><tr class="x">',"</tr></table>"],SELECT:['<select class="x">',"</select>"]}}return function(e,o,s,a){var u,c,h=[]
if(e)for(r&&(c=i[o])?(u=n("DIV"),u.innerHTML=c[0]+e+c[1],u=u.querySelector(".x")):s===t.svg?(u=n("DIV"),u.innerHTML='<svg class="x">'+e+"</svg>",u=u.querySelector(".x")):(u=n(o),u.innerHTML=e);u.firstChild;)h.push(u.firstChild),a.appendChild(u.firstChild)
return h}}(s,a),Ke=function(){var t,e=this.node
return e&&(t=e.parentNode)?(t.removeChild(e),e):void 0},ze=function(t,e){var n,r,i
return r=/</g,i=/>/g,n=function(e,n){this.type=t.TEXT,this.descriptor=e.descriptor,n&&(this.node=document.createTextNode(e.descriptor),n.appendChild(this.node))},n.prototype={detach:e,reassign:function(){},teardown:function(t){t&&this.detach()},firstNode:function(){return this.node},toString:function(){return(""+this.descriptor).replace(r,"&lt;").replace(i,"&gt;")}},n}(F,Ke),Ve=function(t,e){return function(n){n.keypath?e(n):t.removeUnresolved(n)}}(R,$),He=function(t){var e=function(e,n,r,i){this.root=e,this.ref=n,this.parentFragment=r,this.resolve=i,t.addUnresolved(this)}
return e.prototype={teardown:function(){t.removeUnresolved(this)}},e}(R),Je=function(t,e,n,r,i){function o(t,e,r){var i,o,s
if(!a.test(t.toString()))return n(t,"_nowrap",{value:!0}),t
if(!t["_"+e._guid]){n(t,"_"+e._guid,{value:function(){var n,r,i,s
if(n=e._captured,n||(e._captured=[]),r=t.apply(e,arguments),e._captured.length)for(i=o.length;i--;)s=o[i],s.updateSoftDependencies(e._captured)
return e._captured=n,r},writable:!0})
for(i in t)t.hasOwnProperty(i)&&(t["_"+e._guid][i]=t[i])
t["_"+e._guid+"_evaluators"]=[]}return o=t["_"+e._guid+"_evaluators"],s=o.indexOf(r),-1===s&&o.push(r),t["_"+e._guid]}var s,a
return a=/this/,s=function(e,n,i,s,a){var u
this.evaluator=i,this.keypath=n,this.root=e,this.argNum=s,this.type=t.REFERENCE,this.priority=a,u=e.get(n),"function"==typeof u&&(u=o(u,e,i)),this.value=i.values[s]=u,r(this)},s.prototype={update:function(){var t=this.root.get(this.keypath)
"function"!=typeof t||t._nowrap||(t=o(t,this.root,this.evaluator)),e(t,this.value)||(this.evaluator.values[this.argNum]=t,this.evaluator.bubble(),this.value=t)},teardown:function(){i(this)}},s}(F,d,c,J,$),$e=function(t,e,n){var r=function(t,n,r){this.root=t,this.keypath=n,this.priority=r.priority,this.evaluator=r,e(this)}
return r.prototype={update:function(){var e=this.root.get(this.keypath)
t(e,this.value)||(this.evaluator.bubble(),this.value=e)},teardown:function(){n(this)}},r}(d,J,$),Ge=function(t,e,n,r,i,o,s,a){function u(t,e){var n,r
if(t=t.replace(/\$\{([0-9]+)\}/g,"_$1"),h[t])return h[t]
for(r=[];e--;)r[e]="_"+e
return n=new Function(r.join(","),"return("+t+")"),h[t]=n,n}var c,h={}
return c=function(t,e,n,r,i,o){var a=this
a.root=t,a.uniqueString=n,a.keypath=e,a.priority=o,a.fn=u(r,i.length),a.values=[],a.refs=[],i.forEach(function(e,n){e&&(e.indexRef?a.values[n]=e.value:a.refs.push(new s(t,e.keypath,a,n,o)))}),a.selfUpdating=a.refs.length<=1},c.prototype={bubble:function(){this.selfUpdating?this.update():this.deferred||(t.addEvaluator(this),this.deferred=!0)},update:function(){var t
if(this.evaluating)return this
this.evaluating=!0
try{t=this.fn.apply(null,this.values)}catch(s){this.root.debug&&e('Error evaluating "'+this.uniqueString+'": '+s.message||s),t=void 0}return n(t,this.value)||(this.value=t,r(this.root,this.keypath),o(this.root,this.keypath,t,!0),i(this.root,this.keypath)),this.evaluating=!1,this},teardown:function(){for(;this.refs.length;)this.refs.pop().teardown()
r(this.root,this.keypath),this.root._evaluators[this.keypath]=null},refresh:function(){this.selfUpdating||(this.deferred=!0)
for(var t=this.refs.length;t--;)this.refs[t].update()
this.deferred&&(this.update(),this.deferred=!1)},updateSoftDependencies:function(t){var e,n,r
for(this.softRefs||(this.softRefs=[]),e=this.softRefs.length;e--;)r=this.softRefs[e],t[r.keypath]||(this.softRefs.splice(e,1),this.softRefs[r.keypath]=!1,r.teardown())
for(e=t.length;e--;)n=t[e],this.softRefs[n]||(r=new a(this.root,n,this),this.softRefs.push(r),this.softRefs[n]=!0)
this.selfUpdating=this.refs.length+this.softRefs.length<=1}},c}(R,Z,d,B,T,H,Je,$e),Xe=function(t,e,n,r,i){function o(t,e){return t.replace(/\$\{([0-9]+)\}/g,function(t,n){return e[n]?e[n].value||e[n].keypath:"undefined"})}function s(t){return"${"+t.replace(/[\.\[\]]/g,"-")+"}"}var a=function(r,i,o,s){var a,u,c,h=this
return a=r.root,this.root=a,this.callback=s,this.owner=r,this.str=o.s,this.args=c=[],this.unresolved=[],this.pending=0,u=i.indexRefs,o.r&&o.r.length?(o.r.forEach(function(r,o){var s,f,l
return u&&void 0!==(s=u[r])?void(c[o]={indexRef:r,value:s}):(f=e(a,r,i))?void(c[o]={keypath:f}):(c[o]=void 0,h.pending+=1,l=new n(a,r,i,function(e){h.resolve(o,e),t(h.unresolved,l)}),void h.unresolved.push(l))}),this.ready=!0,void this.bubble()):(this.resolved=this.ready=!0,void this.bubble())}
return a.prototype={bubble:function(){this.ready&&(this.uniqueString=o(this.str,this.args),this.keypath=s(this.uniqueString),this.createEvaluator(),this.callback(this.keypath))},teardown:function(){for(var t;t=this.unresolved.pop();)t.teardown()},resolve:function(t,e){this.args[t]={keypath:e},this.bubble(),this.resolved=!--this.pending},createEvaluator:function(){var t
this.root._evaluators[this.keypath]?this.root._evaluators[this.keypath].refresh():(t=new r(this.root,this.keypath,this.uniqueString,this.str,this.args,this.owner.priority),this.root._evaluators[this.keypath]=t,t.update())},reassign:function(t,e,n,r){var o
this.args.forEach(function(s){var a
s.keypath&&(a=i(s.keypath,n,r))?(s.keypath=a,o=!0):s.indexRef===t&&(s.value=e,o=!0)}),o&&this.bubble()}},a}(E,N,He,Ge,Be),Qe=function(t,e,n,r,i,o,s){var a=function(i,o,a){var c,h,f,l,p,d=this
return c=i.root,h=i.parentFragment,this.ref=o.r,this.root=i.root,this.mustache=i,this.callback=a,this.pending=0,this.unresolved=[],p=this.members=[],this.indexRefMembers=[],this.keypathObservers=[],this.expressionResolvers=[],o.m.forEach(function(o,a){var g,v,m,y,b,w
return"string"==typeof o?void(d.members[a]=o):o.t===t.REFERENCE?(g=o.n,v=h.indexRefs,v&&void 0!==(m=v[g])?(p[a]=m,void d.indexRefMembers.push({ref:g,index:a})):(l=!0,y=function(t){var e=new u(c,t,i.priority,d,a)
d.keypathObservers.push(e)},(f=n(c,g,h))?void y(f):(p[a]=void 0,d.pending+=1,b=new r(c,g,h,function(t){d.resolve(a,t),e(d.unresolved,b)}),d.unresolved.push(b),null))):(l=!0,d.pending+=1,w=new s(d,h,o,function(t){d.resolve(a,t),e(d.unresolved,w)}),void d.unresolved.push(w))}),l?(this.ready=!0,void this.bubble()):(f=this.getKeypath(),void a(f))}
a.prototype={getKeypath:function(){return this.ref+"."+this.members.join(".")},bubble:function(){this.ready&&!this.pending&&this.callback(this.getKeypath())},resolve:function(t,e){var n=new u(this.root,e,this.mustache.priority,this,t)
n.update(),this.keypathObservers.push(n),this.resolved=!--this.pending,this.bubble()},teardown:function(){for(var t;t=this.unresolved.pop();)t.teardown()},reassign:function(t,e){var n,r,i
for(r=this.indexRefMembers.length;r--;)i=this.indexRefMembers[r],i.ref===t&&(n=!0,this.members[i.index]=e)
n&&this.bubble()}}
var u=function(t,e,n,r,o){this.root=t,this.keypath=e,this.priority=n,this.resolver=r,this.index=o,i(this),this.update()}
return u.prototype={update:function(){var t=this.resolver
t.members[this.index]=this.root.get(this.keypath),t.bubble()},teardown:function(){o(this)}},a}(F,E,N,He,J,$,Xe),Ye=function(t,e,n,r){return function(i,o){var s,a,u,c,h,f,l
h=o.parentFragment,f=o.descriptor,i.root=h.root,i.parentFragment=h,i.descriptor=o.descriptor,i.index=o.index||0,i.priority=h.priority,i.type=o.descriptor.t,l=function(t){i.resolve(t)},(s=f.r)&&(u=h.indexRefs,u&&void 0!==(c=u[s])?(i.indexRef=s,i.value=c,i.render(i.value)):(a=e(i.root,s,i.parentFragment),void 0!==a?l(a):(i.ref=s,t.addUnresolved(i)))),o.descriptor.x&&(i.resolver=new r(i,h,o.descriptor.x,l)),o.descriptor.kx&&(i.resolver=new n(i,o.descriptor.kx,l)),i.descriptor.n&&!i.hasOwnProperty("value")&&i.render(void 0)}}(R,N,Qe,Xe),Ze=function(t,e){var n={evaluateWrapped:!0}
return function(){var r=e(this.root,this.keypath,n)
t(r,this.value)||(this.render(r),this.value=r)}}(d,Y),tn=function(t,e,n){return function(r){var i
if(r!==this.keypath){if(this.registered&&(n(this),this.type===t.SECTION))for(i=this.fragments.length;i--;)this.fragments[i].reassign(null,null,this.keypath,r)
this.keypath=r,e(this),this.update()}}}(F,J,$),en=function(t){return function(e,n,r,i){var o,s
if(this.resolver?this.resolver.reassign(e,n,r,i):this.keypath?(o=t(this.keypath,r,i),o&&this.resolve(o)):void 0!==e&&this.indexRef===e&&(this.value=n,this.render(n)),this.fragments)for(s=this.fragments.length;s--;)this.fragments[s].reassign(e,n,r,i)}}(Be),nn=function(t,e,n,r){return{init:t,update:e,resolve:n,reassign:r}}(Ye,Ze,tn,en),rn=function(t,e,n,r){var i,o,s
return o=/</g,s=/>/g,i=function(e,r){this.type=t.INTERPOLATOR,r&&(this.node=document.createTextNode(""),r.appendChild(this.node)),n.init(this,e)},i.prototype={update:n.update,resolve:n.resolve,reassign:n.reassign,detach:r,teardown:function(t){t&&this.detach(),e(this)},render:function(t){this.node&&(this.node.data=void 0==t?"":t)},firstNode:function(){return this.node},toString:function(){var t=void 0!=this.value?""+this.value:""
return t.replace(o,"&lt;").replace(s,"&gt;")}},i}(F,Ve,nn,Ke),on=function(){var t=[]
return function(e){var n,r,i,o,s,a,u,c,h=this
for(n=this.parentFragment,s=[],e.forEach(function(e,n){var i,o,a,u
return e===n?void(s[e]=h.fragments[n]):(void 0===r&&(r=n),-1===e?void t.push(h.fragments[n]):(i=h.fragments[n],o=e-n,a=h.keypath+"."+n,u=h.keypath+"."+e,i.reassign(h.descriptor.i,n,e,o,a,u),void(s[e]=i)))});u=t.pop();)u.teardown(!0)
if(void 0===r&&(r=this.length),this.length=o=this.root.get(this.keypath).length,o!==r){for(a={descriptor:this.descriptor.f,root:this.root,pNode:n.pNode,owner:this},this.descriptor.i&&(a.indexRef=this.descriptor.i),i=r;o>i;i+=1)(u=s[i])?this.docFrag.appendChild(u.detach(!1)):(a.context=this.keypath+"."+i,a.index=i,u=this.createFragment(a)),this.fragments[i]=u
c=n.findNextNode(this),n.pNode.insertBefore(this.docFrag,c)}}}(),sn=function(t,e){function n(t,e,n){var r,i,o
if(i=e.length,i<t.length)for(o=t.fragments.splice(i,t.length-i);o.length;)o.pop().teardown(!0)
else if(i>t.length)for(r=t.length;i>r;r+=1)n.context=t.keypath+"."+r,n.index=r,t.descriptor.i&&(n.indexRef=t.descriptor.i),t.fragments[r]=t.createFragment(n)
t.length=i}function r(t,e,n){var r,i,o,s
for(o=t.hasKey||(t.hasKey={}),i=t.fragments.length;i--;)s=t.fragments[i],s.index in e||(t.fragments[i].teardown(!0),t.fragments.splice(i,1),o[s.index]=!1)
for(r in e)o[r]||(n.context=t.keypath+"."+r,n.index=r,t.descriptor.i&&(n.indexRef=t.descriptor.i),t.fragments.push(t.createFragment(n)),o[r]=!0)
t.length=t.fragments.length}function i(t,e){t.length||(e.context=t.keypath,e.index=0,t.fragments[0]=t.createFragment(e),t.length=1)}function o(e,n,r,i){var o,s,a,u
if(s=t(n)&&0===n.length,o=r?s||!n:n&&!s){if(e.length||(i.index=0,e.fragments[0]=e.createFragment(i),e.length=1),e.length>1)for(a=e.fragments.splice(1);u=a.pop();)u.teardown(!0)}else e.length&&(e.teardownFragments(!0),e.length=0)}return function(s,a){var u={descriptor:s.descriptor.f,root:s.root,pNode:s.parentFragment.pNode,pElement:s.parentFragment.pElement,owner:s}
return s.descriptor.n?void o(s,a,!0,u):void(t(a)?n(s,a,u):e(a)||"function"==typeof a?s.descriptor.i?r(s,a,u):i(s,u):o(s,a,!1,u))}}(I,te),an=function(t,e){return function(n){var r,i;(i=this.root._wrapped[this.keypath])&&(n=i.get()),this.rendering||(this.rendering=!0,e(this,n),this.rendering=!1,(!this.docFrag||this.docFrag.childNodes.length)&&!this.initialising&&t&&(r=this.parentFragment.findNextNode(this),r&&r.parentNode===this.parentFragment.pNode?this.parentFragment.pNode.insertBefore(this.docFrag,r):this.parentFragment.pNode.appendChild(this.docFrag)))}}(u,sn),un=function(t,e,n,r){var i,o,s,a,u
for(s=t.descriptor.i,i=e;n>i;i+=1)o=t.fragments[i],a=t.keypath+"."+(i-r),u=t.keypath+"."+i,o.index=i,o.reassign(s,i,a,u)},cn=function(t){function e(t){t.teardown(!0)}function n(t,e,n){var r,i,o
for(t.rendering=!0,r={descriptor:t.descriptor.f,root:t.root,pNode:t.parentFragment.pNode,owner:t,indexRef:t.descriptor.i},i=e;n>i;i+=1)r.context=t.keypath+"."+i,r.index=i,t.fragments[i]=t.createFragment(r)
o=t.fragments[n]?t.fragments[n].firstNode():t.parentFragment.findNextNode(t),t.parentFragment.pNode.insertBefore(t.docFrag,o),t.rendering=!1}return function(r){var i,o,s,a,u,c=this
if(i=r.balance){if(o=r.start,c.length+=i,0>i)return c.fragments.splice(o,-i).forEach(e),void t(c,o,c.length,i)
s=o+r.removed,a=o+r.added,u=[s,0],u.length+=i,c.fragments.splice.apply(c.fragments,u),t(c,a,c.length,i),n(c,s,a)}}}(un),hn=function(t,e,n,r,i,o,s){var a,u
return s.push(function(){u=s.DomFragment}),a=function(n,r){this.type=t.SECTION,this.inverted=!!n.descriptor.n,this.fragments=[],this.length=0,r&&(this.docFrag=document.createDocumentFragment()),this.initialising=!0,e.init(this,n),r&&r.appendChild(this.docFrag),this.initialising=!1},a.prototype={update:e.update,resolve:e.resolve,reassign:e.reassign,splice:i,merge:n,detach:function(){var t,e
if(this.docFrag){for(e=this.fragments.length,t=0;e>t;t+=1)this.docFrag.appendChild(this.fragments[t].detach())
return this.docFrag}},teardown:function(t){this.teardownFragments(t),o(this)},firstNode:function(){return this.fragments[0]?this.fragments[0].firstNode():this.parentFragment.findNextNode(this)},findNextNode:function(t){return this.fragments[t.index+1]?this.fragments[t.index+1].firstNode():this.parentFragment.findNextNode(this)},teardownFragments:function(t){for(var e;e=this.fragments.shift();)e.teardown(t)},render:r,createFragment:function(t){var e=new u(t)
return this.docFrag&&this.docFrag.appendChild(e.docFrag),e},toString:function(){var t,e,n
for(t="",e=0,n=this.length,e=0;n>e;e+=1)t+=this.fragments[e].toString()
return t},find:function(t){var e,n,r
for(n=this.fragments.length,e=0;n>e;e+=1)if(r=this.fragments[e].find(t))return r
return null},findAll:function(t,e){var n,r
for(r=this.fragments.length,n=0;r>n;n+=1)this.fragments[n].findAll(t,e)},findComponent:function(t){var e,n,r
for(n=this.fragments.length,e=0;n>e;e+=1)if(r=this.fragments[e].findComponent(t))return r
return null},findAllComponents:function(t,e){var n,r
for(r=this.fragments.length,n=0;r>n;n+=1)this.fragments[n].findAllComponents(t,e)}},a}(F,nn,on,an,cn,Ve,w),fn=function(t,e,n,r,i){var o=function(e,r){this.type=t.TRIPLE,r&&(this.nodes=[],this.docFrag=document.createDocumentFragment()),this.initialising=!0,n.init(this,e),r&&r.appendChild(this.docFrag),this.initialising=!1}
return o.prototype={update:n.update,resolve:n.resolve,reassign:n.reassign,detach:function(){var t,e
if(this.docFrag){for(t=this.nodes.length,e=0;t>e;e+=1)this.docFrag.appendChild(this.nodes[e])
return this.docFrag}},teardown:function(t){t&&(this.detach(),this.docFrag=this.nodes=null),i(this)},firstNode:function(){return this.nodes[0]?this.nodes[0]:this.parentFragment.findNextNode(this)},render:function(t){var e,n
if(this.nodes){for(;this.nodes.length;)e=this.nodes.pop(),e.parentNode.removeChild(e)
if(!t)return void(this.nodes=[])
n=this.parentFragment.pNode,this.nodes=r(t,n.tagName,n.namespaceURI,this.docFrag),this.initialising||n.insertBefore(this.docFrag,this.parentFragment.findNextNode(this)),"SELECT"===n.tagName&&n._ractive&&n._ractive.binding&&n._ractive.binding.update()}},toString:function(){return void 0!=this.value?this.value:""},find:function(t){var n,r,i,o
for(r=this.nodes.length,n=0;r>n;n+=1)if(i=this.nodes[n],1===i.nodeType){if(e(i,t))return i
if(o=i.querySelector(t))return o}return null},findAll:function(t,n){var r,i,o,s,a,u
for(i=this.nodes.length,r=0;i>r;r+=1)if(o=this.nodes[r],1===o.nodeType&&(e(o,t)&&n.push(o),s=o.querySelectorAll(t)))for(a=s.length,u=0;a>u;u+=1)n.push(s[u])}},o}(F,ae,nn,We,Ve),ln=function(t){return function(e,n){return e.a&&e.a.xmlns?e.a.xmlns:"svg"===e.e?t.svg:n.namespaceURI||t.html}}(s),pn=function(){var t,e,n,r
return t="altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern".split(" "),e="attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" "),n=function(t){for(var e={},n=t.length;n--;)e[t[n].toLowerCase()]=t[n]
return e},r=n(t.concat(e)),function(t){var e=t.toLowerCase()
return r[e]||e}}(),dn=function(t,e){return function(n,r){var i,o
if(i=r.indexOf(":"),-1===i||(o=r.substr(0,i),"xmlns"===o))n.name=n.element.namespace!==t.html?e(r):r,n.lcName=n.name.toLowerCase()
else if(r=r.substring(i+1),n.name=e(r),n.lcName=n.name.toLowerCase(),n.namespace=t[o.toLowerCase()],!n.namespace)throw'Unknown namespace ("'+o+'")'}}(s,pn),gn=function(t){return function(e,n){var r,i=null===n.value?"":n.value;(r=n.pNode)&&(e.namespace?r.setAttributeNS(e.namespace,n.name,i):"style"===n.name&&r.style.setAttribute?r.style.setAttribute("cssText",i):"class"!==n.name||r.namespaceURI&&r.namespaceURI!==t.html?r.setAttribute(n.name,i):r.className=i,"id"===e.name&&(n.root.nodes[n.value]=r),"value"===e.name&&(r._ractive.value=n.value)),e.value=n.value}}(s),vn=function(t){var e={"accept-charset":"acceptCharset",accesskey:"accessKey",bgcolor:"bgColor","class":"className",codebase:"codeBase",colspan:"colSpan",contenteditable:"contentEditable",datetime:"dateTime",dirname:"dirName","for":"htmlFor","http-equiv":"httpEquiv",ismap:"isMap",maxlength:"maxLength",novalidate:"noValidate",pubdate:"pubDate",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",usemap:"useMap"}
return function(n,r){var i
!n.pNode||n.namespace||r.pNode.namespaceURI&&r.pNode.namespaceURI!==t.html||(i=e[n.name]||n.name,void 0!==r.pNode[i]&&(n.propertyName=i),("boolean"==typeof r.pNode[i]||"value"===i)&&(n.useProperty=!0))}}(s),mn=function(t){return function(e){var n,r
return n=e.fragment.items,1===n.length&&(r=n[0],r.type===t.INTERPOLATOR&&(r.keypath||r.ref))?r:void 0}}(F),yn=function(t){return function(e,n){var r
if(!t(e)||!t(n))return!1
if(e.length!==n.length)return!1
for(r=e.length;r--;)if(e[r]!==n[r])return!1
return!0}}(I),bn=function(t,e,n,r,i,o){var s,a,u,c,h,f,l,p,d,g,v,m,y,b,w='For two-way binding to work, attribute value must be a single interpolator (e.g. value="{{foo}}")',E="You cannot set up two-way binding against an expression "
return s=function(){var t,n,r,i=this.pNode
return(t=this.interpolator)?t.keypath&&"${"===t.keypath.substr?(e(E+t.keypath),!1):(t.keypath||t.resolve(t.descriptor.r),this.keypath=t.keypath,(n=h(this))?(i._ractive.binding=this.element.binding=n,this.twoway=!0,r=this.root._twowayBindings[this.keypath]||(this.root._twowayBindings[this.keypath]=[]),r.push(n),!0):!1):(e(w),!1)},a=function(){t.start(this._ractive.root),this._ractive.binding.update(),t.end()},u={evaluateWrapped:!0},c=function(){var t=i(this._ractive.root,this._ractive.binding.keypath,u)
this.value=void 0==t?"":t},h=function(t){var e=t.pNode
if("SELECT"===e.tagName)return e.multiple?new l(t,e):new p(t,e)
if("checkbox"===e.type||"radio"===e.type){if("name"===t.propertyName){if("checkbox"===e.type)return new g(t,e)
if("radio"===e.type)return new d(t,e)}return"checked"===t.propertyName?new v(t,e):null}if("value"!==t.lcName)throw new Error("Attempted to set up an illegal two-way binding. This error is unexpected - if you can, please file an issue at https://github.com/RactiveJS/Ractive, or contact @RactiveJS on Twitter. Thanks!")
return"file"===e.type?new m(t,e):e.getAttribute("contenteditable")?new y(t,e):new b(t,e)},l=function(t,e){var n
f(this,t,e),e.addEventListener("change",a,!1),n=i(this.root,this.keypath),void 0===n&&this.update()},l.prototype={value:function(){var t,e,n,r,i,o
for(t=[],e=this.node.options,r=e.length,n=0;r>n;n+=1)i=e[n],i.selected&&(o=i._ractive?i._ractive.value:i.value,t.push(o))
return t},update:function(){var e,r,i
return e=this.attr,r=e.value,i=this.value(),void 0!==r&&n(i,r)||(t.addBinding(e),e.value=i,o(this.root,this.keypath,i),t.trigger()),this},deferUpdate:function(){this.deferred!==!0&&(t.addAttribute(this),this.deferred=!0)},teardown:function(){this.node.removeEventListener("change",a,!1)}},p=function(t,e){var n
f(this,t,e),e.addEventListener("change",a,!1),n=i(this.root,this.keypath),void 0===n&&this.update()},p.prototype={value:function(){var t,e,n,r,i
for(t=this.node.options,n=t.length,e=0;n>e;e+=1)if(r=t[e],t[e].selected)return i=r._ractive?r._ractive.value:r.value},update:function(){var e=this.value()
return t.addBinding(this.attr),this.attr.value=e,o(this.root,this.keypath,e),t.trigger(),this},deferUpdate:function(){this.deferred!==!0&&(t.addAttribute(this),this.deferred=!0)},teardown:function(){this.node.removeEventListener("change",a,!1)}},d=function(e,n){var r
this.radioName=!0,f(this,e,n),n.name="{{"+e.keypath+"}}",n.addEventListener("change",a,!1),n.attachEvent&&n.addEventListener("click",a,!1),r=i(this.root,this.keypath),void 0!==r?n.checked=r==n._ractive.value:t.addRadio(this)},d.prototype={value:function(){return this.node._ractive?this.node._ractive.value:this.node.value},update:function(){var e=this.node
e.checked&&(t.addBinding(this.attr),o(this.root,this.keypath,this.value()),t.trigger())},teardown:function(){this.node.removeEventListener("change",a,!1),this.node.removeEventListener("click",a,!1)}},g=function(e,n){var r,o
this.checkboxName=!0,f(this,e,n),n.name="{{"+this.keypath+"}}",n.addEventListener("change",a,!1),n.attachEvent&&n.addEventListener("click",a,!1),r=i(this.root,this.keypath),void 0!==r?(o=-1!==r.indexOf(n._ractive.value),n.checked=o):t.addCheckbox(this)},g.prototype={changed:function(){return this.node.checked!==!!this.checked},update:function(){this.checked=this.node.checked,t.addBinding(this.attr),o(this.root,this.keypath,r(this.root,this.keypath)),t.trigger()},teardown:function(){this.node.removeEventListener("change",a,!1),this.node.removeEventListener("click",a,!1)}},v=function(t,e){f(this,t,e),e.addEventListener("change",a,!1),e.attachEvent&&e.addEventListener("click",a,!1)},v.prototype={value:function(){return this.node.checked},update:function(){t.addBinding(this.attr),o(this.root,this.keypath,this.value()),t.trigger()},teardown:function(){this.node.removeEventListener("change",a,!1),this.node.removeEventListener("click",a,!1)}},m=function(t,e){f(this,t,e),e.addEventListener("change",a,!1)},m.prototype={value:function(){return this.attr.pNode.files},update:function(){o(this.attr.root,this.attr.keypath,this.value()),t.trigger()},teardown:function(){this.node.removeEventListener("change",a,!1)}},y=function(t,e){f(this,t,e),e.addEventListener("change",a,!1),this.root.lazy||(e.addEventListener("input",a,!1),e.attachEvent&&e.addEventListener("keyup",a,!1))},y.prototype={update:function(){t.addBinding(this.attr),o(this.root,this.keypath,this.node.innerHTML),t.trigger()},teardown:function(){this.node.removeEventListener("change",a,!1),this.node.removeEventListener("input",a,!1),this.node.removeEventListener("keyup",a,!1)}},b=function(t,e){f(this,t,e),e.addEventListener("change",a,!1),this.root.lazy||(e.addEventListener("input",a,!1),e.attachEvent&&e.addEventListener("keyup",a,!1)),this.node.addEventListener("blur",c,!1)},b.prototype={value:function(){var t=this.attr.pNode.value
return+t+""===t&&-1===t.indexOf("e")&&(t=+t),t},update:function(){var e=this.attr,n=this.value()
t.addBinding(e),o(e.root,e.keypath,n),t.trigger()},teardown:function(){this.node.removeEventListener("change",a,!1),this.node.removeEventListener("input",a,!1),this.node.removeEventListener("keyup",a,!1),this.node.removeEventListener("blur",c,!1)}},f=function(t,e,n){t.attr=e,t.node=n,t.root=e.root,t.keypath=e.keypath},s}(R,Z,yn,x,Y,U),wn=function(t,e,n){var r,i,o,s,a,u,c,h,f,l,p,d
return r=function(){var t
if(!this.ready)return this
if(t=this.pNode,"SELECT"===t.tagName&&"value"===this.lcName)return this.update=o,this.deferredUpdate=s,this.update()
if(this.isFileInputValue)return this.update=i,this
if(this.twoway&&"name"===this.lcName){if("radio"===t.type)return this.update=c,this.update()
if("checkbox"===t.type)return this.update=h,this.update()}return"style"===this.lcName&&t.style.setAttribute?(this.update=f,this.update()):"class"!==this.lcName||t.namespaceURI&&t.namespaceURI!==e.html?t.getAttribute("contenteditable")&&"value"===this.lcName?(this.update=p,this.update()):(this.update=d,this.update()):(this.update=l,this.update())},i=function(){return this},s=function(){this.deferredUpdate=this.pNode.multiple?u:a,this.deferredUpdate()},o=function(){return t.addSelectValue(this),this},a=function(){var t,e,n,r,i=this.fragment.getValue()
for(this.value=this.pNode._ractive.value=i,t=this.pNode.options,r=t.length;r--;)if(e=t[r],n=e._ractive?e._ractive.value:e.value,n==i)return e.selected=!0,this
return this},u=function(){var t,e,r,i,o=this.fragment.getValue()
for(n(o)||(o=[o]),t=this.pNode.options,e=t.length;e--;)r=t[e],i=r._ractive?r._ractive.value:r.value,r.selected=-1!==o.indexOf(i)
return this.value=o,this},c=function(){var t,e
return t=this.pNode,e=this.fragment.getValue(),t.checked=e==t._ractive.value,this},h=function(){var t,e
return t=this.pNode,e=this.fragment.getValue(),n(e)?(t.checked=-1!==e.indexOf(t._ractive.value),this):(t.checked=e==t._ractive.value,this)},f=function(){var t,e
return t=this.pNode,e=this.fragment.getValue(),void 0===e&&(e=""),e!==this.value&&(t.style.setAttribute("cssText",e),this.value=e),this},l=function(){var t,e
return t=this.pNode,e=this.fragment.getValue(),void 0===e&&(e=""),e!==this.value&&(t.className=e,this.value=e),this},p=function(){var t,e
return t=this.pNode,e=this.fragment.getValue(),void 0===e&&(e=""),e!==this.value&&(this.active||(t.innerHTML=e),this.value=e),this},d=function(){var t,e,n
if(t=this.pNode,e=this.fragment.getValue(),this.isValueAttribute&&(t._ractive.value=e),void 0==e&&(e=""),e!==this.value){if(this.useProperty)return this.active||(t[this.propertyName]=e),"OPTION"===t.tagName&&t.selected&&(n=this.element.select.binding)&&n.update(),this.value=e,this
if(this.namespace)return t.setAttributeNS(this.namespace,this.name,e),this.value=e,this
"id"===this.lcName&&(void 0!==this.value&&(this.root.nodes[this.value]=void 0),this.root.nodes[e]=t),t.setAttribute(this.name,e),this.value=e}return this},r}(R,s,I),En=function(t){var e
return e=this.str.substr(this.pos,t.length),e===t?(this.pos+=t.length,t):null},_n=function(){var t=/^\s+/
return function(){var e=t.exec(this.remaining())
return e?(this.pos+=e[0].length,e[0]):null}}(),xn=function(t){return function(e){var n=t.exec(e.str.substring(e.pos))
return n?(e.pos+=n[0].length,n[1]||n[0]):null}},kn=function(t){var e,n,r
return e=t(/^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/),n=t(/^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/),r=t(/^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/),function(t){return function(i){var o,s,a,u
for(o=i.pos,s='"',a=!1;!a;)u=e(i)||n(i)||i.getStringMatch(t),u?s+='"'===u?'\\"':"\\'"===u?"'":u:(u=r(i),u?s+="\\u"+("000"+u.charCodeAt(1).toString(16)).slice(-4):a=!0)
return s+='"',JSON.parse(s)}}}(xn),Sn=function(t){return t('"')}(kn),Nn=function(t){return t("'")}(kn),On=function(t,e,n){return function(r){var i,o
return i=r.pos,r.getStringMatch('"')?(o=n(r),r.getStringMatch('"')?{t:t.STRING_LITERAL,v:o}:(r.pos=i,null)):r.getStringMatch("'")?(o=e(r),r.getStringMatch("'")?{t:t.STRING_LITERAL,v:o}:(r.pos=i,null)):null}}(F,Sn,Nn),Tn=function(t,e){var n=e(/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/)
return function(e){var r
return(r=n(e))?{t:t.NUMBER_LITERAL,v:r}:null}}(F,xn),An=function(t){return t(/^[a-zA-Z_$][a-zA-Z_$0-9]*/)}(xn),Rn=function(t,e,n){var r=/^[a-zA-Z_$][a-zA-Z_$0-9]*$/
return function(i){var o
return(o=t(i))?r.test(o.v)?o.v:'"'+o.v.replace(/"/g,'\\"')+'"':(o=e(i))?o.v:(o=n(i))?o:void 0}}(On,Tn,An),Cn=function(t,e,n,r){function i(t){var e,n,i
return t.allowWhitespace(),(e=r(t))?(i={key:e},t.allowWhitespace(),t.getStringMatch(":")?(t.allowWhitespace(),(n=t.getToken())?(i.value=n.v,i):null):null):null}var o,s,a,u,c,h
return s={"true":!0,"false":!1,undefined:void 0,"null":null},a=new RegExp("^(?:"+Object.keys(s).join("|")+")"),u=/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/,c=/\$\{([^\}]+)\}/g,h=/^\$\{([^\}]+)\}/,o=function(t,e){this.str=t,this.values=e,this.pos=0,this.result=this.getToken()},o.prototype={remaining:function(){return this.str.substring(this.pos)},getStringMatch:t,getToken:function(){return this.allowWhitespace(),this.getPlaceholder()||this.getSpecial()||this.getNumber()||this.getString()||this.getObject()||this.getArray()},getPlaceholder:function(){var t
return this.values?(t=h.exec(this.remaining()))&&this.values.hasOwnProperty(t[1])?(this.pos+=t[0].length,{v:this.values[t[1]]}):void 0:null},getSpecial:function(){var t
return(t=a.exec(this.remaining()))?(this.pos+=t[0].length,{v:s[t[0]]}):void 0},getNumber:function(){var t
return(t=u.exec(this.remaining()))?(this.pos+=t[0].length,{v:+t[0]}):void 0},getString:function(){var t,e=n(this)
return e&&(t=this.values)?{v:e.v.replace(c,function(e,n){return t[n]||n})}:e},getObject:function(){var t,e
if(!this.getStringMatch("{"))return null
for(t={};e=i(this);){if(t[e.key]=e.value,this.allowWhitespace(),this.getStringMatch("}"))return{v:t}
if(!this.getStringMatch(","))return null}return null},getArray:function(){var t,e
if(!this.getStringMatch("["))return null
for(t=[];e=this.getToken();){if(t.push(e.v),this.getStringMatch("]"))return{v:t}
if(!this.getStringMatch(","))return null}return null},allowWhitespace:e},function(t,e){var n=new o(t,e)
return n.result?{value:n.result.v,remaining:n.remaining()}:null}}(En,_n,On,Rn),In=function(t,e,n){function r(t){return"string"==typeof t?t:JSON.stringify(t)}var i=function(e){this.type=t.INTERPOLATOR,n.init(this,e)}
return i.prototype={update:n.update,resolve:n.resolve,reassign:n.reassign,render:function(t){this.value=t,this.parentFragment.bubble()},teardown:function(){e(this)},toString:function(){return void 0==this.value?"":r(this.value)}},i}(F,Ve,nn),Ln=function(t,e,n,r,i){var o,s
return i.push(function(){s=i.StringFragment}),o=function(n){this.type=t.SECTION,this.fragments=[],this.length=0,e.init(this,n)},o.prototype={update:e.update,resolve:e.resolve,reassign:e.reassign,teardown:function(){this.teardownFragments(),r(this)},teardownFragments:function(){for(;this.fragments.length;)this.fragments.shift().teardown()
this.length=0},bubble:function(){this.value=this.fragments.join(""),this.parentFragment.bubble()},render:function(t){var e;(e=this.root._wrapped[this.keypath])&&(t=e.get()),n(this,t),this.parentFragment.bubble()},createFragment:function(t){return new s(t)},toString:function(){return this.fragments.join("")}},o}(F,nn,sn,Ve,w),jn=function(t){var e=function(e){this.type=t.TEXT,this.text=e}
return e.prototype={toString:function(){return this.text},reassign:function(){},teardown:function(){}},e}(F),Mn=function(t,e){return function(){var n,r,i,o,s,a,u
if(!this.argsList||this.dirty){if(n={},r=0,o=this.root._guid,u=function(t){return t.map(function(t){var e,i,s
return t.text?t.text:t.fragments?t.fragments.map(function(t){return u(t.items)}).join(""):(e=o+"-"+r++,s=(i=t.root._wrapped[t.keypath])?i.value:t.value,n[e]=s,"${"+e+"}")}).join("")},i=u(this.items),a=e("["+i+"]",n))this.argsList=a.value
else{if(s="Could not parse directive arguments ("+this.toString()+"). If you think this is a bug, please file an issue at http://github.com/RactiveJS/Ractive/issues",this.root.debug)throw new Error(s)
t(s),this.argsList=[i]}this.dirty=!1}return this.argsList}}(Z,Cn),Pn=function(t,e,n,r,i,o,s,a){var u=function(t){n.init(this,t)}
return u.prototype={reassign:n.reassign,createItem:function(e){if("string"==typeof e.descriptor)return new o(e.descriptor)
switch(e.descriptor.t){case t.INTERPOLATOR:return new r(e)
case t.TRIPLE:return new r(e)
case t.SECTION:return new i(e)
default:throw"Something went wrong in a rather interesting way"}},bubble:function(){this.dirty=!0,this.owner.bubble()},teardown:function(){var t,e
for(t=this.items.length,e=0;t>e;e+=1)this.items[e].teardown()},getValue:function(){var e
return 1===this.items.length&&this.items[0].type===t.INTERPOLATOR&&(e=this.items[0].value,void 0!==e)?e:this.toString()},isSimple:function(){var e,n,r
if(void 0!==this.simple)return this.simple
for(e=this.items.length;e--;)if(n=this.items[e],n.type!==t.TEXT){if(n.type!==t.INTERPOLATOR)return this.simple=!1
if(r)return!1
r=!0}return this.simple=!0},toString:function(){return this.items.join("")},toJSON:function(){var t,n=this.getValue()
return"string"==typeof n&&(t=e(n),n=t?t.value:n),n},toArgsList:s},a.StringFragment=u,u}(F,Cn,qe,In,Ln,jn,Mn,w),Fn=function(t,e,n,r,i,o,s,a,u){var c=function(t){return this.type=e.ATTRIBUTE,this.element=t.element,n(this,t.name),null===t.value||"string"==typeof t.value?void r(this,t):(this.root=t.root,this.pNode=t.pNode,this.parentFragment=this.element.parentFragment,this.fragment=new u({descriptor:t.value,root:this.root,owner:this}),this.interpolator=o(this),void(this.pNode&&("value"===this.name&&(this.isValueAttribute=!0,"INPUT"===this.pNode.tagName&&"file"===this.pNode.type&&(this.isFileInputValue=!0)),i(this,t),this.selfUpdating=this.fragment.isSimple(),this.ready=!0)))}
return c.prototype={bind:s,update:a,updateBindings:function(){this.keypath=this.interpolator.keypath||this.interpolator.ref,"name"===this.propertyName&&(this.pNode.name="{{"+this.keypath+"}}")},reassign:function(t,e,n,r){this.fragment&&(this.fragment.reassign(t,e,n,r),this.twoway&&this.updateBindings())},teardown:function(){var t
if(this.boundEvents)for(t=this.boundEvents.length;t--;)this.pNode.removeEventListener(this.boundEvents[t],this.updateModel,!1)
this.fragment&&this.fragment.teardown()},bubble:function(){this.selfUpdating?this.update():!this.deferred&&this.ready&&(t.addAttribute(this),this.deferred=!0)},toString:function(){var t,e
if(null===this.value)return this.name
if("value"!==this.name||"select"!==this.element.lcName)return"name"===this.name&&"input"===this.element.lcName&&(e=this.interpolator)?"name={{"+(e.keypath||e.ref)+"}}":this.fragment?(t=this.fragment.toString(),this.name+"="+JSON.stringify(t)):this.name+"="+JSON.stringify(this.value)}},c}(R,F,dn,gn,vn,mn,bn,wn,Pn),Bn=function(t){return function(e,n,r){var i=new t({element:e,name:n,value:r,root:e.root,pNode:e.node})
e.attributes.push(e.attributes[n]=i),"name"!==n&&i.update()}}(Fn),Dn=function(t){return function(e,n){var r
e.attributes=[]
for(r in n)n.hasOwnProperty(r)&&t(e,r,n[r])
return e.attributes}}(Bn),Un=function(t){for(var e=[],n=t.length;n--;)e[n]=t[n]
return e},qn=function(t){return function(e,n){return e.matchingStaticNodes[n]||(e.matchingStaticNodes[n]=t(e.node.querySelectorAll(n))),e.matchingStaticNodes[n]}}(Un),Wn=function(t,e,n,r,i){function o(t){var e,n,i,o,s,a,u
i=t.node,e=t.root
do for(n=e._liveQueries,u=n.length;u--;)o=n[u],s=n[o],a=r(t,o),s.push.apply(s,a)
while(e=e._parent)}var s,a,u
return i.push(function(){s=i.DomFragment}),a=function(){var t=this.node,e=this.fragment.toString()
t.styleSheet?t.styleSheet.cssText=e:t.innerHTML=e},u=function(){this.node.type&&"text/javascript"!==this.node.type||t("Script tag was updated. This does not cause the code to be re-evaluated!"),this.node.text=this.fragment.toString()},function(t,r,i,c){return"script"===t.lcName||"style"===t.lcName?(t.fragment=new n({descriptor:i.f,root:t.root,owner:t}),void(c&&("script"===t.lcName?(t.bubble=u,t.node.text=t.fragment.toString()):(t.bubble=a,t.bubble())))):void("string"!=typeof i.f||r&&r.namespaceURI&&r.namespaceURI!==e.html?(t.fragment=new s({descriptor:i.f,root:t.root,pNode:r,owner:t,pElement:t}),c&&r.appendChild(t.fragment.docFrag)):(t.html=i.f,c&&(r.innerHTML=t.html,t.matchingStaticNodes={},o(t))))}}(Z,s,Pn,qn,w),Kn=function(t,e){var n=function(n,r,i){var o,s,a,u=this
if(u.root=r,u.node=i.node,o=n.n||n,"string"!=typeof o&&(s=new e({descriptor:o,root:r,owner:i}),o=s.toString(),s.teardown()),n.a?u.params=n.a:n.d&&(u.fragment=new e({descriptor:n.d,root:r,owner:i}),u.params=u.fragment.toArgsList(),u.fragment.bubble=function(){this.dirty=!0,u.params=this.toArgsList(),u.ready&&u.update()}),u.fn=r.decorators[o],!u.fn){if(a='Missing "'+o+'" decorator. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#decorators',r.debug)throw new Error(a)
t(a)}}
return n.prototype={init:function(){var t,e
if(this.params?(e=[this.node].concat(this.params),t=this.fn.apply(this.root,e)):t=this.fn.call(this.root,this.node),!t||!t.teardown)throw new Error("Decorator definition must return an object with a teardown method")
this.actual=t,this.ready=!0},update:function(){this.actual.update?this.actual.update.apply(this.root,this.params):(this.actual.teardown(!0),this.init())},teardown:function(t){this.actual.teardown(),!t&&this.fragment&&this.fragment.teardown()}},n}(Z,Pn),zn=function(t,e){return function(n,r,i){var o=new e(n,r,i)
o.fn&&(i.decorator=o,t.addDecorator(i.decorator))}}(R,Kn),Vn=function(t,e){var n,r,i,o,s,a,u,c,h
return n=function(t,e,n,i){var o,s
o=t.node._ractive.events,s=o[e]||(o[e]=new r(t,e,i)),s.add(n)},r=function(e,n){var r
this.element=e,this.root=e.root,this.node=e.node,this.name=n,this.proxies=[],(r=this.root.events[n])?this.custom=r(this.node,h(n)):("on"+n in this.node||t('Missing "'+this.name+'" event. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#events'),this.node.addEventListener(n,c,!1))},r.prototype={add:function(t){this.proxies.push(new i(this.element,this.root,t))},teardown:function(){var t
for(this.custom?this.custom.teardown():this.node.removeEventListener(this.name,c,!1),t=this.proxies.length;t--;)this.proxies[t].teardown()},fire:function(t){for(var e=this.proxies.length;e--;)this.proxies[e].fire(t)}},i=function(t,n,r){var i
return this.root=n,i=r.n||r,this.n="string"==typeof i?i:new e({descriptor:r.n,root:this.root,owner:t}),r.a?(this.a=r.a,void(this.fire=s)):r.d?(this.d=new e({descriptor:r.d,root:this.root,owner:t}),void(this.fire=a)):void(this.fire=o)},i.prototype={teardown:function(){this.n.teardown&&this.n.teardown(),this.d&&this.d.teardown()},bubble:function(){}},o=function(t){this.root.fire(this.n.toString(),t)},s=function(t){this.root.fire.apply(this.root,[this.n.toString(),t].concat(this.a))},a=function(t){var e=this.d.toArgsList()
"string"==typeof e&&(e=e.substr(1,e.length-2)),this.root.fire.apply(this.root,[this.n.toString(),t].concat(e))},c=function(t){var e=this._ractive
e.events[t.type].fire({node:this,original:t,index:e.index,keypath:e.keypath,context:e.root.get(e.keypath)})},u={},h=function(t){return u[t]?u[t]:u[t]=function(e){var n=e.node._ractive
e.index=n.index,e.keypath=n.keypath,e.context=n.root.get(n.keypath),n.events[t].fire(e)}},n}(Z,Pn),Hn=function(t){return function(e,n){var r,i,o
for(i in n)if(n.hasOwnProperty(i))for(o=i.split("-"),r=o.length;r--;)t(e,o[r],n[i])}}(Vn),Jn=function(t){var e,n,r,i,o
e=t.root
do for(n=e._liveQueries,r=n.length;r--;)i=n[r],o=n[i],o._test(t)&&(t.liveQueries||(t.liveQueries=[])).push(o)
while(e=e._parent)},$n=function(){if(this._inited)throw new Error("Cannot initialize a transition more than once")
this._inited=!0,this._fn.apply(this.root,[this].concat(this.params))},Gn=function(t,e,n){var r,i
if(t)return r={},i=n("div").style,function(t){var n,o,s
if(!r[t])if(void 0!==i[t])r[t]=t
else for(s=t.charAt(0).toUpperCase()+t.substring(1),n=e.length;n--;)if(o=e[n],void 0!==i[o+s]){r[t]=o+s
break}return r[t]}}(u,m,a),Xn=function(t,e,n,r){var i
if(e)return i=window.getComputedStyle||t.getComputedStyle,function(t){var e,i,o,s,a
if(e=window.getComputedStyle(this.node),"string"==typeof t)return a=e[r(t)],"0px"===a&&(a=0),a
if(!n(t))throw new Error("Transition#getStyle must be passed a string, or an array of strings representing CSS properties")
for(i={},o=t.length;o--;)s=t[o],a=e[r(s)],"0px"===a&&(a=0),i[s]=a
return i}}(r,u,I,Gn),Qn=function(t){return function(e,n){var r
if("string"==typeof e)this.node.style[t(e)]=n
else for(r in e)e.hasOwnProperty(r)&&(this.node.style[t(r)]=e[r])
return this}}(Gn),Yn=function(t){return t.replace(/-([a-zA-Z])/g,function(t,e){return e.toUpperCase()})},Zn=function(t,e,n){function r(t){return t}var i=function(i){var o
this.duration=i.duration,this.step=i.step,this.complete=i.complete,"string"==typeof i.easing?(o=i.root.easing[i.easing],o||(t('Missing easing function ("'+i.easing+'"). You may need to download a plugin from [TODO]'),o=r)):o="function"==typeof i.easing?i.easing:r,this.easing=o,this.start=e(),this.end=this.start+this.duration,this.running=!0,n.add(this)}
return i.prototype={tick:function(t){var e,n
return this.running?t>this.end?(this.step&&this.step(1),this.complete&&this.complete(1),!1):(e=t-this.start,n=this.easing(e/this.duration),this.step&&this.step(n),!0):!1},stop:function(){this.abort&&this.abort(),this.running=!1}},i}(Z,b,C),tr=function(t){var e=new RegExp("^-(?:"+t.join("|")+")-")
return function(t){return t.replace(e,"")}}(m),er=function(t){var e=new RegExp("^(?:"+t.join("|")+")([A-Z])")
return function(t){var n
return t?(e.test(t)&&(t="-"+t),n=t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})):""}}(m),nr=function(t,e,n,r,i,o,s,a,u){var c,h,f,l,p,d,g,v={},m={}
if(t)return c=n("div").style,function(){void 0!==c.transition?(h="transition",f="transitionend",l=!0):void 0!==c.webkitTransition?(h="webkitTransition",f="webkitTransitionEnd",l=!0):l=!1}(),h&&(p=h+"Duration",d=h+"Property",g=h+"TimingFunction"),function(t,n,c,h,l,y){setTimeout(function(){var b,w,E,_
_=function(){w&&E&&y()},b=t.node.namespaceURI+t.node.tagName,t.node.style[d]=h.map(s).map(u).join(","),t.node.style[g]=u(c.easing||"linear"),t.node.style[p]=c.duration/1e3+"s",l=function(e){var n
n=h.indexOf(r(a(e.propertyName))),-1!==n&&h.splice(n,1),h.length||(t.root.fire(t.name+":end"),t.node.removeEventListener(f,l,!1),E=!0,_())},t.node.addEventListener(f,l,!1),setTimeout(function(){for(var a,u,p,d,g=h.length,y=[];g--;)d=h[g],a=b+d,v[a]?t.node.style[s(d)]=n[d]:u=t.getStyle(d),void 0===v[a]&&(t.node.style[s(d)]=n[d],v[a]=t.getStyle(d)!=n[d],m[a]=!v[a]),m[a]&&(p=h.indexOf(d),-1===p?e("Something very strange happened with transitions. If you see this message, please let @RactiveJS know. Thanks!"):h.splice(p,1),t.node.style[s(d)]=u,y.push({name:s(d),interpolator:i(u,n[d])}))
y.length?new o({root:t.root,duration:c.duration,easing:r(c.easing),step:function(e){var n,r
for(r=y.length;r--;)n=y[r],t.node.style[n.name]=n.interpolator(e)},complete:function(){w=!0,_()}}):w=!0,h.length||(t.node.removeEventListener(f,l,!1),E=!0,_())},0)},c.delay||0)}}(u,Z,a,Yn,ne,Zn,Gn,tr,er),rr=function(t,e,n,r,i,o){var s
if(e)return s=window.getComputedStyle||t.getComputedStyle,function(t,e,s,a){var u,c=this
"string"==typeof t?(u={},u[t]=e):(u=t,a=s,s=e),s||(n('The "'+c.name+'" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340'),s=c,a=c.complete)
var h=new r(function(t){var e,n,r,a,h,f,l,p
if(!s.duration)return c.setStyle(u),void t()
for(e=Object.keys(u),n=[],r=window.getComputedStyle(c.node),h={},l=e.length;l--;)p=e[l],a=r[i(p)],"0px"===a&&(a=0),a!=u[p]&&(n.push(p),c.node.style[i(p)]=a)
return n.length?void o(c,u,s,n,f,t):void t()})
return a&&(n("t.animateStyle returns a Promise as of 0.4.0. Transition authors should do t.animateStyle(...).then(callback)"),h.then(a)),h}}(r,u,Z,g,Gn,nr),ir=function(t,e){var n
for(n in e)!e.hasOwnProperty(n)||n in t||(t[n]=e[n])
return t},or=function(t){return function(e,n){return"number"==typeof e?e={duration:e}:"string"==typeof e?e="slow"===e?{duration:600}:"fast"===e?{duration:200}:{duration:400}:e||(e={}),t(e,n)}}(ir),sr=function(){this.originalStyle?this.node.setAttribute("style",this.originalStyle):(this.node.getAttribute("style"),this.node.removeAttribute("style"))},ar=function(t,e,n,r,i,o,s,a){var u
return u=function(n,r,i,o){var s,a,u,c=this
if(this.root=r,this.node=i.node,this.isIntro=o,this.originalStyle=this.node.getAttribute("style"),c.complete=function(t){!t&&c.isIntro&&c.resetStyle(),c.node._ractive.transition=null,c._manager.remove(c)},s=n.n||n,"string"!=typeof s&&(a=new e({descriptor:s,root:this.root,owner:i}),s=a.toString(),a.teardown()),this.name=s,n.a?this.params=n.a:n.d&&(a=new e({descriptor:n.d,root:this.root,owner:i}),this.params=a.toArgsList(),a.teardown()),this._fn=r.transitions[s],!this._fn){if(u='Missing "'+s+'" transition. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#transitions',r.debug)throw new Error(u)
return void t(u)}},u.prototype={init:n,getStyle:r,setStyle:i,animateStyle:o,processParams:s,resetStyle:a},u}(Z,Pn,$n,Xn,Qn,rr,or,sr),ur=function(t,e){return function(n,r,i,o){var s,a,u
!r.transitionsEnabled||r._parent&&!r._parent.transitionsEnabled||(s=new e(n,r,i,o),s._fn&&(a=s.node,(u=a._ractive.transition)&&u.complete(),a._ractive.transition=s,t.addTransition(s)))}}(R,ar),cr=function(t,e,n,r,i,o,s,a,u,c,h,f,l,p,d,g,v){function m(t){do if("select"===t.lcName)return t
while(t=t.parent)}return function(y,b,w){var E,_,x,k,S,N,O,T,A,R,C,I
if(y.type=e.ELEMENT,E=y.parentFragment=b.parentFragment,_=E.pNode,x=y.descriptor=b.descriptor,y.parent=b.pElement,y.root=R=E.root,y.index=b.index,y.lcName=x.e.toLowerCase(),y.eventListeners=[],y.customEventListeners=[],y.cssDetachQueue=[],_&&(k=y.namespace=u(x,_),S=k!==n.html?v(x.e):x.e,y.node=s(S,k),R.css&&_===R.el&&y.node.setAttribute("data-rvcguid",R.constructor._guid||R._guid),i(y.node,"_ractive",{value:{proxy:y,keypath:a(E),index:E.indexRefs,events:r(null),root:R}})),N=h(y,x.a),x.f){if(y.node&&y.node.getAttribute("contenteditable")&&y.node.innerHTML){if(I="A pre-populated contenteditable element should not have children",R.debug)throw new Error(I)
o(I)}f(y,y.node,x,w)}w&&x.v&&p(y,x.v),w&&(R.twoway&&(y.bind(),y.node.getAttribute("contenteditable")&&y.node._ractive.binding&&y.node._ractive.binding.update()),N.name&&!N.name.twoway&&N.name.update(),"IMG"===y.node.tagName&&((O=y.attributes.width)||(T=y.attributes.height))&&y.node.addEventListener("load",A=function(){O&&(y.node.width=O.value),T&&(y.node.height=T.value),y.node.removeEventListener("load",A,!1)},!1),w.appendChild(y.node),x.o&&l(x.o,R,y),x.t1&&g(x.t1,R,y,!0),"OPTION"===y.node.tagName&&("SELECT"===_.tagName&&(C=_._ractive.binding)&&C.deferUpdate(),N.value||c(y,"value",x.f),y.node._ractive.value==_._ractive.value&&(y.node.selected=!0)),y.node.autofocus&&t.focus(y.node)),"option"===y.lcName&&(y.select=m(y.parent)),d(y)}}(R,F,s,je,c,Z,a,S,ln,Bn,Dn,Wn,zn,Hn,Jn,ur,pn),hr=function(t,e){function n(t){var e,n,r,i,o
for(i=t.liveQueries.length;i--;)if(e=t.liveQueries[i],n=e.selector,e._remove(t.node),t.matchingStaticNodes&&(r=t.matchingStaticNodes[n]))for(o=r.length;o--;)e.remove(r[o])}return function(r){var i,o,s
for(r&&(this.willDetach=!0,t.detachWhenReady(this)),this.fragment&&this.fragment.teardown(!1);this.attributes.length;)this.attributes.pop().teardown()
if(this.node){for(i in this.node._ractive.events)this.node._ractive.events[i].teardown();(o=this.node._ractive.binding)&&(o.teardown(),s=this.root._twowayBindings[o.attr.keypath],s.splice(s.indexOf(o),1))}this.decorator&&this.decorator.teardown(),this.descriptor.t2&&e(this.descriptor.t2,this.root,this,!1),this.liveQueries&&n(this)}}(R,ur),fr=function(t){return function(e,n,r,i){var o,s,a,u,c,h,f,l,p
for(o=this.attributes.length;o--;)this.attributes[o].reassign(e,n,r,i)
if(s=this.node._ractive){t(s,"keypath",r,i),void 0!=e&&(s.index[e]=n)
for(a in s.events)for(u=s.events[a].proxies,o=u.length;o--;)c=u[o],"object"==typeof c.n&&c.a.reassign(e,n,r,i),c.d&&c.d.reassign(e,n,r,i);(h=s.binding)&&h.keypath.substr(0,r.length)===r&&(f=s.root._twowayBindings[h.keypath],f.splice(f.indexOf(h),1),h.keypath=h.keypath.replace(r,i),f=s.root._twowayBindings[h.keypath]||(s.root._twowayBindings[h.keypath]=[]),f.push(h))}if(this.fragment&&this.fragment.reassign(e,n,r,i),l=this.liveQueries)for(p=this.root,o=l.length;o--;)l[o]._makeDirty()}}(De),lr="area base br col command doctype embed hr img input keygen link meta param source track wbr".split(" "),pr=function(t,e){function n(t){var n,r,i,o,s
if(n=t.attributes.value.value,r=t.select.attributes.value,i=r.interpolator){if(o=t.root.get(i.keypath||i.ref),o==n)return!0
if(t.select.attributes.multiple&&e(o))for(s=o.length;s--;)if(o[s]==n)return!0}}function r(t){var e,n,r,i
return e=t.attributes,n=e.type,r=e.value,i=e.name,n&&"radio"===n.value&&r&&i.interpolator&&r.value===i.interpolator.value?!0:void 0}return function(){var e,i,o,s
for(e="<"+(this.descriptor.y?"!doctype":this.descriptor.e),o=this.attributes.length,i=0;o>i;i+=1)(s=this.attributes[i].toString())&&(e+=" "+s)
return"option"===this.lcName&&n(this)&&(e+=" selected"),"input"===this.lcName&&r(this)&&(e+=" checked"),e+=">",this.html?e+=this.html:this.fragment&&(e+=this.fragment.toString()),-1===t.indexOf(this.descriptor.e)&&(e+="</"+this.descriptor.e+">"),this.stringifying=!1,e}}(lr,I),dr=function(t){return function(e){var n
return t(this.node,e)?this.node:this.html&&(n=this.node.querySelector(e))?n:this.fragment&&this.fragment.find?this.fragment.find(e):void 0}}(ae),gr=function(t){return function(e,n){var r,i
n._test(this,!0)&&n.live&&(this.liveQueries||(this.liveQueries=[])).push(n),this.html&&(r=t(this,e),n.push.apply(n,r),n.live&&!i&&(this.liveQueries||(this.liveQueries=[])).push(n)),this.fragment&&this.fragment.findAll(e,n)}}(qn),vr=function(t){return this.fragment?this.fragment.findComponent(t):void 0},mr=function(t,e){this.fragment&&this.fragment.findAllComponents(t,e)},yr=function(){var t=this.attributes
if(this.node&&(this.binding&&(this.binding.teardown(),this.binding=null),!(this.node.getAttribute("contenteditable")&&t.value&&t.value.bind())))switch(this.descriptor.e){case"select":case"textarea":return void(t.value&&t.value.bind())
case"input":if("radio"===this.node.type||"checkbox"===this.node.type){if(t.name&&t.name.bind())return
if(t.checked&&t.checked.bind())return}if(t.value&&t.value.bind())return}},br=function(t,e,n,r,i,o,s,a,u,c,h){var f=function(t,e){n(this,t,e)}
return f.prototype={detach:function(){var n
if(this.node)return this.node.parentNode&&this.node.parentNode.removeChild(this.node),this.node
if(this.cssDetachQueue.length){for(t.start();n===this.cssDetachQueue.pop();)e.remove(n)
t.end()}},teardown:r,reassign:i,firstNode:function(){return this.node},findNextNode:function(){return null},bubble:function(){},toString:o,find:s,findAll:a,findComponent:u,findAllComponents:c,bind:h},f}(R,_,cr,hr,fr,pr,dr,gr,vr,mr,yr),wr={missingParser:"Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser"},Er={},_r=function(t){var e,n,r
for(r="";t.length;){if(e=t.indexOf("<!--"),n=t.indexOf("-->"),-1===e&&-1===n){r+=t
break}if(-1!==e&&-1===n)throw"Illegal HTML - expected closing comment sequence ('-->')"
if(-1!==n&&-1===e||e>n)throw"Illegal HTML - unexpected closing comment sequence ('-->')"
r+=t.substr(0,e),t=t.substring(n+3)}return r},xr=function(t){return function(e){var n,r,i,o,s,a
for(s=/^\s*\r?\n/,a=/\r?\n\s*$/,n=2;n<e.length;n+=1)r=e[n],i=e[n-1],o=e[n-2],r.type===t.TEXT&&i.type===t.MUSTACHE&&i.mustacheType!==t.PARTIAL&&o.type===t.TEXT&&a.test(o.value)&&s.test(r.value)&&(i.mustacheType!==t.INTERPOLATOR&&i.mustacheType!==t.TRIPLE&&(o.value=o.value.replace(a,"\n")),r.value=r.value.replace(s,""),""===r.value&&e.splice(n--,1))
return e}}(F),kr=function(t){return function(e){var n,r,i,o
for(n=0;n<e.length;n+=1)r=e[n],i=e[n-1],o=e[n+1],(r.mustacheType===t.COMMENT||r.mustacheType===t.DELIMCHANGE)&&(e.splice(n,1),i&&o&&i.type===t.TEXT&&o.type===t.TEXT&&(i.value+=o.value,e.splice(n,1)),n-=1)
return e}}(F),Sr=function(t){var e=t(/^[^\s=]+/)
return function(t){var n,r,i
return t.getStringMatch("=")?(n=t.pos,t.allowWhitespace(),(r=e(t))?(t.allowWhitespace(),(i=e(t))?(t.allowWhitespace(),t.getStringMatch("=")?[r,i]:(t.pos=n,null)):(t.pos=n,null)):(t.pos=n,null)):null}}(xn),Nr=function(t){var e={"#":t.SECTION,"^":t.INVERTED,"/":t.CLOSING,">":t.PARTIAL,"!":t.COMMENT,"&":t.TRIPLE}
return function(t){var n=e[t.str.charAt(t.pos)]
return n?(t.pos+=1,n):null}}(F),Or=function(t,e,n){function r(e){for(var n=[];e.t===t.MEMBER&&e.r.t===t.REFINEMENT;)n.unshift(e.r),e=e.x
return e.t!==t.REFERENCE?null:{r:e.n,m:n}}var i=e(/^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/),o=/^[0-9][1-9]*$/
return function(e,s){var a,u,c,h,f,l,p,d,g
if(a=e.pos,u={type:s?t.TRIPLE:t.MUSTACHE},!(s||((h=e.getExpression())&&(u.mustacheType=t.INTERPOLATOR,e.allowWhitespace(),e.getStringMatch(e.delimiters[1])?e.pos-=e.delimiters[1].length:(e.pos=a,h=null)),h||(c=n(e),c===t.TRIPLE?u={type:t.TRIPLE}:u.mustacheType=c||t.INTERPOLATOR,c!==t.COMMENT&&c!==t.CLOSING||(l=e.remaining(),p=l.indexOf(e.delimiters[1]),-1===p)))))return u.ref=l.substr(0,p),e.pos+=p,u
if(!h&&(e.allowWhitespace(),h=e.getExpression(),l=e.remaining(),d=s?e.tripleDelimiters[1]:e.delimiters[1],l.substr(0,d.length)!==d&&":"!==l.charAt(0)&&(e.pos=a,l=e.remaining(),p=l.indexOf(e.delimiters[1]),-1!==p)))return u.ref=l.substr(0,p).trim(),e.pos+=p,u
for(;h.t===t.BRACKETED&&h.x;)h=h.x
return h.t===t.REFERENCE?u.ref=h.n:h.t===t.NUMBER_LITERAL&&o.test(h.v)?u.ref=h.v:(g=r(h))?u.keypathExpression=g:u.expression=h,f=i(e),null!==f&&(u.indexRef=f),u}}(F,xn,Nr),Tr=function(t,e,n){function r(r,i){var o,s,a=r.pos
return s=i?r.tripleDelimiters:r.delimiters,r.getStringMatch(s[0])?(o=e(r))?r.getStringMatch(s[1])?(r[i?"tripleDelimiters":"delimiters"]=o,{type:t.MUSTACHE,mustacheType:t.DELIMCHANGE}):(r.pos=a,null):(r.allowWhitespace(),o=n(r,i),null===o?(r.pos=a,null):(r.allowWhitespace(),r.getStringMatch(s[1])?o:(r.pos=a,null))):null}return function(){var t=this.tripleDelimiters[0].length>this.delimiters[0].length
return r(this,t)||r(this,!t)}}(F,Sr,Or),Ar=function(t){return function(){var e,n,r
if(!this.getStringMatch("<!--"))return null
if(n=this.remaining(),r=n.indexOf("-->"),-1===r)throw new Error('Unexpected end of input (expected "-->" to close comment)')
return e=n.substr(0,r),this.pos+=r+3,{type:t.COMMENT,content:e}}}(F),Rr=function(t,e){var n,r,i
for(n=e.length;n--;){if(r=t.indexOf(e[n]),!r)return 0;-1!==r&&(!i||i>r)&&(i=r)}return i||-1},Cr=function(t,e,n){var r,i,o,s,a,u,c,h,f,l,p,d,g
return r=function(){return i(this)||o(this)},i=function(e){var n,r,i,o
return n=e.pos,e.inside?null:e.getStringMatch("<")?(r={type:t.TAG},e.getStringMatch("!")&&(r.doctype=!0),r.name=s(e),r.name?(i=a(e),i&&(r.attrs=i),e.allowWhitespace(),e.getStringMatch("/")&&(r.selfClosing=!0),e.getStringMatch(">")?(o=r.name.toLowerCase(),("script"===o||"style"===o)&&(e.inside=o),r):(e.pos=n,null)):(e.pos=n,null)):null},o=function(e){var n,r,i
if(n=e.pos,i=function(t){throw new Error("Unexpected character "+e.remaining().charAt(0)+" (expected "+t+")")},!e.getStringMatch("<"))return null
if(r={type:t.TAG,closing:!0},e.getStringMatch("/")||i('"/"'),r.name=s(e),r.name||i("tag name"),e.getStringMatch(">")||i('">"'),e.inside){if(r.name.toLowerCase()!==e.inside)return e.pos=n,null
e.inside=null}return r},s=e(/^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/),a=function(t){var e,n,r
if(e=t.pos,!t.getStringMatch(" ")&&!t.getStringMatch("\n"))return null
if(t.allowWhitespace(),r=u(t),!r)return t.pos=e,null
for(n=[];null!==r;)n.push(r),t.allowWhitespace(),r=u(t)
return n},u=function(t){var e,n,r
return(n=c(t))?(e={name:n},r=h(t),r&&(e.value=r),e):null},c=e(/^[^\s"'>\/=]+/),h=function(t){var e,n
return e=t.pos,t.allowWhitespace(),t.getStringMatch("=")?(t.allowWhitespace(),n=g(t,"'")||g(t,'"')||f(t),null===n?(t.pos=e,null):n):(t.pos=e,null)},p=e(/^[^\s"'=<>`]+/),l=function(e){var n,r,i
return n=e.pos,(r=p(e))?(-1!==(i=r.indexOf(e.delimiters[0]))&&(r=r.substr(0,i),e.pos=n+r.length),{type:t.TEXT,value:r}):null},f=function(t){var e,n
for(e=[],n=t.getMustache()||l(t);null!==n;)e.push(n),n=t.getMustache()||l(t)
return e.length?e:null},g=function(t,e){var n,r,i
if(n=t.pos,!t.getStringMatch(e))return null
for(r=[],i=t.getMustache()||d(t,e);null!==i;)r.push(i),i=t.getMustache()||d(t,e)
return t.getStringMatch(e)?r:(t.pos=n,null)},d=function(e,r){var i,o,s
if(i=e.pos,s=e.remaining(),o=n(s,[r,e.delimiters[0],e.delimiters[1]]),-1===o)throw new Error("Quoted attribute value must have a closing quote")
return o?(e.pos+=o,{type:t.TEXT,value:s.substr(0,o)}):null},r}(F,xn,Rr),Ir=function(t,e){return function(){var n,r,i
return r=this.remaining(),i=this.inside?"</"+this.inside:"<",(n=this.inside&&!this.interpolate[this.inside]?r.indexOf(i):e(r,[i,this.delimiters[0],this.tripleDelimiters[0]]))?(-1===n&&(n=r.length),this.pos+=n,{type:t.TEXT,value:r.substr(0,n)}):null}}(F,Rr),Lr=function(t){return function(e){var n=e.remaining()
return"true"===n.substr(0,4)?(e.pos+=4,{t:t.BOOLEAN_LITERAL,v:"true"}):"false"===n.substr(0,5)?(e.pos+=5,{t:t.BOOLEAN_LITERAL,v:"false"}):null}}(F),jr=function(t,e){return function(n){var r,i,o
return r=n.pos,n.allowWhitespace(),i=e(n),null===i?(n.pos=r,null):(n.allowWhitespace(),n.getStringMatch(":")?(n.allowWhitespace(),o=n.getExpression(),null===o?(n.pos=r,null):{t:t.KEY_VALUE_PAIR,k:i,v:o}):(n.pos=r,null))}}(F,Rn),Mr=function(t){return function e(n){var r,i,o,s
return r=n.pos,o=t(n),null===o?null:(i=[o],n.getStringMatch(",")?(s=e(n),s?i.concat(s):(n.pos=r,null)):i)}}(jr),Pr=function(t,e){return function(n){var r,i
return r=n.pos,n.allowWhitespace(),n.getStringMatch("{")?(i=e(n),n.allowWhitespace(),n.getStringMatch("}")?{t:t.OBJECT_LITERAL,m:i}:(n.pos=r,null)):(n.pos=r,null)}}(F,Mr),Fr=function go(t){var e,n,r,i
if(e=t.pos,t.allowWhitespace(),r=t.getExpression(),null===r)return null
if(n=[r],t.allowWhitespace(),t.getStringMatch(",")){if(i=go(t),null===i)return t.pos=e,null
n=n.concat(i)}return n},Br=function(t,e){return function(n){var r,i
return r=n.pos,n.allowWhitespace(),n.getStringMatch("[")?(i=e(n),n.getStringMatch("]")?{t:t.ARRAY_LITERAL,m:i}:(n.pos=r,null)):(n.pos=r,null)}}(F,Fr),Dr=function(t,e,n,r,i){return function(o){var s=t(o)||e(o)||n(o)||r(o)||i(o)
return s}}(Tn,Lr,On,Pr,Br),Ur=function(t,e,n){var r,i,o,s
return r=e(/^\.[a-zA-Z_$0-9]+/),i=function(t){var e=o(t)
return e?"."+e:null},o=e(/^\[(0|[1-9][0-9]*)\]/),s=/^(?:Array|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)$/,function(e){var o,a,u,c,h,f,l
for(o=e.pos,a="";e.getStringMatch("../");)a+="../"
if(a||(c=e.getStringMatch(".")||""),u=n(e)||"",!a&&!c&&s.test(u))return{t:t.GLOBAL,v:u}
if("this"!==u||a||c||(u=".",o+=3),h=(a||c)+u,!h)return null
for(;f=r(e)||i(e);)h+=f
return e.getStringMatch("(")&&(l=h.lastIndexOf("."),-1!==l?(h=h.substr(0,l),e.pos=o+h.length):e.pos-=1),{t:t.REFERENCE,n:h}}}(F,xn,An),qr=function(t){return function(e){var n,r
return n=e.pos,e.getStringMatch("(")?(e.allowWhitespace(),(r=e.getExpression())?(e.allowWhitespace(),e.getStringMatch(")")?{t:t.BRACKETED,x:r}:(e.pos=n,null)):(e.pos=n,null)):null}}(F),Wr=function(t,e,n){return function(r){return t(r)||e(r)||n(r)}}(Dr,Ur,qr),Kr=function(t,e){return function(n){var r,i,o
if(r=n.pos,n.allowWhitespace(),n.getStringMatch(".")){if(n.allowWhitespace(),i=e(n))return{t:t.REFINEMENT,n:i}
n.expected("a property name")}return n.getStringMatch("[")?(n.allowWhitespace(),o=n.getExpression(),o||n.expected("an expression"),n.allowWhitespace(),n.getStringMatch("]")||n.expected('"]"'),{t:t.REFINEMENT,x:o}):null}}(F,An),zr=function(t,e,n,r){return function(i){var o,s,a,u
if(s=e(i),!s)return null
for(;s;)if(o=i.pos,a=r(i))s={t:t.MEMBER,x:s,r:a}
else{if(!i.getStringMatch("("))break
if(i.allowWhitespace(),u=n(i),i.allowWhitespace(),!i.getStringMatch(")")){i.pos=o
break}s={t:t.INVOCATION,x:s},u&&(s.o=u)}return s}}(F,Wr,Fr,Kr),Vr=function(t,e){var n,r
return r=function(e,n){return function(r){var i,o
return r.getStringMatch(e)?(i=r.pos,r.allowWhitespace(),o=r.getExpression(),o||r.expected("an expression"),{s:e,o:o,t:t.PREFIX_OPERATOR}):n(r)}},function(){var t,i,o,s,a
for(s="! ~ + - typeof".split(" "),a=e,t=0,i=s.length;i>t;t+=1)o=r(s[t],a),a=o
n=a}(),n}(F,zr),Hr=function(t,e){var n,r
return r=function(e,n){return function(r){var i,o,s
if(o=n(r),!o)return null
for(;;){if(i=r.pos,r.allowWhitespace(),!r.getStringMatch(e))return r.pos=i,o
if("in"===e&&/[a-zA-Z_$0-9]/.test(r.remaining().charAt(0)))return r.pos=i,o
if(r.allowWhitespace(),s=n(r),!s)return r.pos=i,o
o={t:t.INFIX_OPERATOR,s:e,o:[o,s]}}}},function(){var t,i,o,s,a
for(s="* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||".split(" "),a=e,t=0,i=s.length;i>t;t+=1)o=r(s[t],a),a=o
n=a}(),n}(F,Vr),Jr=function(t,e){return function(n){var r,i,o,s
return(i=e(n))?(r=n.pos,n.allowWhitespace(),n.getStringMatch("?")?(n.allowWhitespace(),(o=n.getExpression())?(n.allowWhitespace(),n.getStringMatch(":")?(n.allowWhitespace(),s=n.getExpression(),s?{t:t.CONDITIONAL,o:[i,o,s]}:(n.pos=r,i)):(n.pos=r,i)):(n.pos=r,i)):(n.pos=r,i)):null}}(F,Hr),$r=function(t){return function(){return t(this)}}(Jr),Gr=function(t,e,n,r,i,o,s){var a
return a=function(t,e){var n
for(this.str=t,this.pos=0,this.delimiters=e.delimiters,this.tripleDelimiters=e.tripleDelimiters,this.interpolate=e.interpolate,this.tokens=[];this.pos<this.str.length;)n=this.getToken(),null===n&&this.remaining()&&this.fail(),this.tokens.push(n)},a.prototype={getToken:function(){var t=this.getMustache()||this.getComment()||this.getTag()||this.getText()
return t},getMustache:t,getComment:e,getTag:n,getText:r,getExpression:i,allowWhitespace:o,getStringMatch:s,remaining:function(){return this.str.substring(this.pos)},fail:function(){var t,e
throw t=this.str.substr(0,this.pos).substr(-20),20===t.length&&(t="..."+t),e=this.remaining().substr(0,20),20===e.length&&(e+="..."),new Error("Could not parse template: "+(t?t+"<- ":"")+"failed at character "+this.pos+" ->"+e)},expected:function(t){var e=this.remaining().substr(0,40)
throw 40===e.length&&(e+="..."),new Error('Tokenizer failed: unexpected string "'+e+'" (expected '+t+")")}},a}(Tr,Ar,Cr,Ir,$r,_n,En),Xr=function(t,e,n,r,i){return function(o,s){var a,u
return s=s||{},s.stripComments!==!1&&(o=e(o)),a=new i(o,{delimiters:s.delimiters||t.defaults.delimiters,tripleDelimiters:s.tripleDelimiters||t.defaults.tripleDelimiters,interpolate:{script:s.interpolateScripts!==!1?!0:!1,style:s.interpolateStyles!==!1?!0:!1}}),u=a.tokens,n(u),r(u),u}}(i,_r,xr,kr,Gr),Qr=function(t){var e,n,r,i,o,s,a,u,c
return e=function(t,e){this.text=e?t.value:t.value.replace(c," ")},e.prototype={type:t.TEXT,toJSON:function(){return this.decoded||(this.decoded=u(this.text))},toString:function(){return this.text}},n={quot:34,amp:38,apos:39,lt:60,gt:62,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,copy:169,ordf:170,laquo:171,not:172,shy:173,reg:174,macr:175,deg:176,plusmn:177,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,sup1:185,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,Agrave:192,Aacute:193,Acirc:194,Atilde:195,Auml:196,Aring:197,AElig:198,Ccedil:199,Egrave:200,Eacute:201,Ecirc:202,Euml:203,Igrave:204,Iacute:205,Icirc:206,Iuml:207,ETH:208,Ntilde:209,Ograve:210,Oacute:211,Ocirc:212,Otilde:213,Ouml:214,times:215,Oslash:216,Ugrave:217,Uacute:218,Ucirc:219,Uuml:220,Yacute:221,THORN:222,szlig:223,agrave:224,aacute:225,acirc:226,atilde:227,auml:228,aring:229,aelig:230,ccedil:231,egrave:232,eacute:233,ecirc:234,euml:235,igrave:236,iacute:237,icirc:238,iuml:239,eth:240,ntilde:241,ograve:242,oacute:243,ocirc:244,otilde:245,ouml:246,divide:247,oslash:248,ugrave:249,uacute:250,ucirc:251,uuml:252,yacute:253,thorn:254,yuml:255,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,"int":8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},r=[8364,129,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,141,381,143,144,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,157,382,376],i=new RegExp("&("+Object.keys(n).join("|")+");?","g"),o=/&#x([0-9]+);?/g,s=/&#([0-9]+);?/g,a=function(t){return t?10===t?32:128>t?t:159>=t?r[t-128]:55296>t?t:57343>=t?65533:65535>=t?t:65533:65533},u=function(t){var e
return e=t.replace(i,function(t,e){return n[e]?String.fromCharCode(n[e]):t}),e=e.replace(o,function(t,e){return String.fromCharCode(a(parseInt(e,16)))}),e=e.replace(s,function(t,e){return String.fromCharCode(a(e))})},c=/\s+/g,e}(F),Yr=function(t,e){return function(n,r){return n.type===t.TEXT?(this.pos+=1,new e(n,r)):null}}(F,Qr),Zr=function(t){var e
return e=function(t){this.content=t.content},e.prototype={toJSON:function(){return{t:t.COMMENT,f:this.content}},toString:function(){return"<!--"+this.content+"-->"}},e}(F),ti=function(t,e){return function(n){return n.type===t.COMMENT?(this.pos+=1,new e(n,this.preserveWhitespace)):null}}(F,Zr),ei=function(t,e){function n(t){return JSON.stringify(String(t))}function r(n,i){var o,s
if(n.t===t.REFERENCE&&-1===i.indexOf(n.n)&&i.unshift(n.n),s=n.o||n.m)if(e(s))r(s,i)
else for(o=s.length;o--;)r(s[o],i)
n.x&&r(n.x,i),n.r&&r(n.r,i),n.v&&r(n.v,i)}function i(e,r){var o=function(t){return i(t,r)}
switch(e.t){case t.BOOLEAN_LITERAL:case t.GLOBAL:case t.NUMBER_LITERAL:return e.v
case t.STRING_LITERAL:return n(e.v)
case t.ARRAY_LITERAL:return"["+(e.m?e.m.map(o).join(","):"")+"]"
case t.OBJECT_LITERAL:return"{"+(e.m?e.m.map(o).join(","):"")+"}"
case t.KEY_VALUE_PAIR:return e.k+":"+i(e.v,r)
case t.PREFIX_OPERATOR:return("typeof"===e.s?"typeof ":e.s)+i(e.o,r)
case t.INFIX_OPERATOR:return i(e.o[0],r)+("in"===e.s.substr(0,2)?" "+e.s+" ":e.s)+i(e.o[1],r)
case t.INVOCATION:return i(e.x,r)+"("+(e.o?e.o.map(o).join(","):"")+")"
case t.BRACKETED:return"("+i(e.x,r)+")"
case t.MEMBER:return i(e.x,r)+i(e.r,r)
case t.REFINEMENT:return e.n?"."+e.n:"["+i(e.x,r)+"]"
case t.CONDITIONAL:return i(e.o[0],r)+"?"+i(e.o[1],r)+":"+i(e.o[2],r)
case t.REFERENCE:return"${"+r.indexOf(e.n)+"}"
default:throw new Error("Could not stringify expression token. This error is unexpected")}}var o=function(t){this.refs=[],r(t,this.refs),this.str=i(t,this.refs)}
return o.prototype={toJSON:function(){return this.json||(this.json={r:this.refs,s:this.str}),this.json}},o}(F,te),ni=function(t,e){function n(n){return n.n?n.n:n.x.t===t.STRING_LITERAL||n.x.t===t.NUMBER_LITERAL?n.x.v:n.x.t===t.REFERENCE?n.x:new e(n.x).toJSON()}var r
return r=function(t){this.json={r:t.r,m:t.m.map(n)}},r.prototype={toJSON:function(){return this.json}},r}(F,ei),ri=function(t,e,n){var r=function(r,i){this.type=r.type===t.TRIPLE?t.TRIPLE:r.mustacheType,r.ref&&(this.ref=r.ref),r.keypathExpression&&(this.keypathExpr=new e(r.keypathExpression)),r.expression&&(this.expr=new n(r.expression)),i.pos+=1}
return r.prototype={toJSON:function(){var t
return this.json?this.json:(t={t:this.type},this.ref&&(t.r=this.ref),this.keypathExpr&&(t.kx=this.keypathExpr.toJSON()),this.expr&&(t.x=this.expr.toJSON()),this.json=t,t)},toString:function(){return!1}},r}(F,ni,ei),ii=function(t){var e,n,r,i=""
if(!t)return""
for(n=0,r=t.length;r>n;n+=1){if(e=t[n].toString(),e===!1)return!1
i+=e}return i},oi=function(t){return function(e,n,r){var i,o
return r||n||(i=t(e),i===!1)?o=e.map(function(t){return t.toJSON(n)}):i}}(ii),si=function(t,e,n,r,i){function o(t,n){var r=t.ref,i=e(n.ref.trim())
if(r&&i&&(t.indexRef&&(r+=":"+t.indexRef),r.substr(0,i.length)!==i))throw new Error("Could not parse template: Illegal closing section {{/"+i+"}}. Expected {{/"+t.ref+"}}.")}var s=function(e,n){var s
for(this.ref=e.ref,this.indexRef=e.indexRef,this.inverted=e.mustacheType===t.INVERTED,e.keypathExpression&&(this.keypathExpr=new r(e.keypathExpression)),e.expression&&(this.expr=new i(e.expression)),n.pos+=1,this.items=[],s=n.next();s;){if(s.mustacheType===t.CLOSING){o(this,s),n.pos+=1
break}this.items.push(n.getStub()),s=n.next()}}
return s.prototype={toJSON:function(e){var r
return this.json?this.json:(r={t:t.SECTION},this.ref&&(r.r=this.ref),this.indexRef&&(r.i=this.indexRef),this.inverted&&(r.n=!0),this.expr&&(r.x=this.expr.toJSON()),this.keypathExpr&&(r.kx=this.keypathExpr.toJSON()),this.items.length&&(r.f=n(this.items,e)),this.json=r,r)},toString:function(){return!1}},s}(F,v,oi,ni,ei),ai=function(t,e,n){return function(r){return r.type===t.MUSTACHE||r.type===t.TRIPLE?r.mustacheType===t.SECTION||r.mustacheType===t.INVERTED?new n(r,this):new e(r,this):void 0}}(F,ri,si),ui={li:["li"],dt:["dt","dd"],dd:["dt","dd"],p:"address article aside blockquote dir div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr menu nav ol p pre section table ul".split(" "),rt:["rt","rp"],rp:["rp","rt"],optgroup:["optgroup"],option:["option","optgroup"],thead:["tbody","tfoot"],tbody:["tbody","tfoot"],tr:["tr"],td:["td","th"],th:["td","th"]},ci=function(t){function e(n){var r,i
if("object"!=typeof n)return n
if(t(n))return n.map(e)
r={}
for(i in n)n.hasOwnProperty(i)&&(r[i]=e(n[i]))
return r}return function(t){var n,r,i,o,s,a
for(i={},n=[],r=[],s=t.length,o=0;s>o;o+=1)if(a=t[o],"intro"===a.name){if(i.intro)throw new Error("An element can only have one intro transition")
i.intro=a}else if("outro"===a.name){if(i.outro)throw new Error("An element can only have one outro transition")
i.outro=a}else if("intro-outro"===a.name){if(i.intro||i.outro)throw new Error("An element can only have one intro and one outro transition")
i.intro=a,i.outro=e(a)}else"proxy-"===a.name.substr(0,6)?(a.name=a.name.substring(6),r.push(a)):"on-"===a.name.substr(0,3)?(a.name=a.name.substring(3),r.push(a)):"decorator"===a.name?i.decorator=a:n.push(a)
return i.attrs=n,i.proxies=r,i}}(I),hi=function(t,e){return function(n){var r,i,o,s,a,u,c,h
for(a=function(){throw new Error("Illegal directive")},n.name&&n.value||a(),r={directiveType:n.name},i=n.value,u=[],c=[];i.length;)if(o=i.shift(),o.type===t.TEXT){if(s=o.value.indexOf(":"),-1!==s){s&&u.push({type:t.TEXT,value:o.value.substr(0,s)}),o.value.length>s+1&&(c[0]={type:t.TEXT,value:o.value.substring(s+1)})
break}u.push(o)}else u.push(o)
return c=c.concat(i),r.name=1===u.length&&u[0].type===t.TEXT?u[0].value:u,c.length&&(1===c.length&&c[0].type===t.TEXT?(h=e("["+c[0].value+"]"),r.args=h?h.value:c[0].value):r.dynamicArgs=c),r}}(F,Cn),fi=function(t,e){var n
return n=function(t,e){var n
for(this.tokens=t||[],this.pos=0,this.options=e,this.result=[];n=this.getStub();)this.result.push(n)},n.prototype={getStub:function(){var t=this.next()
return t?this.getText(t)||this.getMustache(t):null},getText:t,getMustache:e,next:function(){return this.tokens[this.pos]}},n}(Yr,ai),li=function(t,e,n){var r
return r=function(e){var n=new t(e)
this.stubs=n.result},r.prototype={toJSON:function(t){var e
return this["json_"+t]?this["json_"+t]:e=this["json_"+t]=n(this.stubs,t)},toString:function(){return void 0!==this.str?this.str:(this.str=e(this.stubs),this.str)}},r}(fi,ii,oi),pi=function(t){return function(e){var n,r
if("string"==typeof e.name){if(!e.args&&!e.dynamicArgs)return e.name
r=e.name}else r=new t(e.name).toJSON()
return n={n:r},e.args?(n.a=e.args,n):(e.dynamicArgs&&(n.d=new t(e.dynamicArgs).toJSON()),n)}}(li),di=function(t,e,n){return function(r){var i,o,s,a,u,c,h
if(this["json_"+r])return this["json_"+r]
if(i={t:t.ELEMENT,e:this.tag},this.doctype&&(i.y=1),this.attributes&&this.attributes.length)for(i.a={},c=this.attributes.length,u=0;c>u;u+=1){if(h=this.attributes[u],o=h.name,i.a[o])throw new Error("You cannot have multiple attributes with the same name")
s=null===h.value?null:h.value.toJSON(r),i.a[o]=s}if(this.items&&this.items.length&&(i.f=e(this.items,r)),this.proxies&&this.proxies.length)for(i.v={},c=this.proxies.length,u=0;c>u;u+=1)a=this.proxies[u],i.v[a.directiveType]=n(a)
return this.intro&&(i.t1=n(this.intro)),this.outro&&(i.t2=n(this.outro)),this.decorator&&(i.o=n(this.decorator)),this["json_"+r]=i,i}}(F,oi,pi),gi=function(t,e){var n
return n="a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr".split(" "),function(){var r,i,o,s,a,u,c,h
if(void 0!==this.str)return this.str
if(-1===n.indexOf(this.tag.toLowerCase()))return this.str=!1
if(this.proxies||this.intro||this.outro||this.decorator)return this.str=!1
if(c=t(this.items),c===!1)return this.str=!1
if(h=-1!==e.indexOf(this.tag.toLowerCase()),r="<"+this.tag,this.attributes)for(i=0,o=this.attributes.length;o>i;i+=1){if(a=this.attributes[i].name,-1!==a.indexOf(":"))return this.str=!1
if("id"===a||"intro"===a||"outro"===a)return this.str=!1
if(s=" "+a,null!==this.attributes[i].value){if(u=this.attributes[i].value.toString(),u===!1)return this.str=!1
""!==u&&(s+="=",s+=/[\s"'=<>`]/.test(u)?'"'+u.replace(/"/g,"&quot;")+'"':u)}r+=s}return this.selfClosing&&!h?(r+="/>",this.str=r):(r+=">",h?this.str=r:(r+=c,r+="</"+this.tag+">",this.str=r))}}(ii,lr),vi=function(t,e,n,r,i,o,s,a,u){var c,h,f,l,p,d=/^\s+/,g=/\s+$/
return c=function(s,a,c){var h,f,l,v,m,y,b
if(a.pos+=1,y=function(t){return{name:t.name,value:t.value?new u(t.value):null}},this.tag=s.name,b=s.name.toLowerCase(),"rv-"===b.substr(0,3)&&(n('The "rv-" prefix for components has been deprecated. Support will be removed in a future version'),this.tag=this.tag.substring(3)),c=c||"pre"===b||"style"===b||"script"===b,s.attrs&&(l=i(s.attrs),f=l.attrs,v=l.proxies,a.options.sanitize&&a.options.sanitize.eventAttributes&&(f=f.filter(p)),f.length&&(this.attributes=f.map(y)),v.length&&(this.proxies=v.map(o)),l.intro&&(this.intro=o(l.intro)),l.outro&&(this.outro=o(l.outro)),l.decorator&&(this.decorator=o(l.decorator))),s.doctype&&(this.doctype=!0),s.selfClosing&&(this.selfClosing=!0),-1!==e.indexOf(b)&&(this.isVoid=!0),!this.selfClosing&&!this.isVoid){for(this.siblings=r[b],this.items=[],h=a.next();h&&h.mustacheType!==t.CLOSING;){if(h.type===t.TAG){if(h.closing){h.name.toLowerCase()===b&&(a.pos+=1)
break}if(this.siblings&&-1!==this.siblings.indexOf(h.name.toLowerCase()))break}this.items.push(a.getStub(c)),h=a.next()}c||(m=this.items[0],m&&m.type===t.TEXT&&(m.text=m.text.replace(d,""),m.text||this.items.shift()),m=this.items[this.items.length-1],m&&m.type===t.TEXT&&(m.text=m.text.replace(g,""),m.text||this.items.pop()))}},c.prototype={toJSON:s,toString:a},h="a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr".split(" "),f="li dd rt rp optgroup option tbody tfoot tr td th".split(" "),l=/^on[a-zA-Z]/,p=function(t){var e=!l.test(t.name)
return e},c}(F,lr,Z,ui,ci,hi,di,gi,li),mi=function(t){return function(e){return this.options.sanitize&&this.options.sanitize.elements&&-1!==this.options.sanitize.elements.indexOf(e.name.toLowerCase())?null:new t(e,this,this.preserveWhitespace)}}(vi),yi=function(t,e,n,r,i){var o
return o=function(t,e){var n,r
for(this.tokens=t||[],this.pos=0,this.options=e,this.preserveWhitespace=e.preserveWhitespace,r=[];n=this.getStub();)r.push(n)
this.result=i(r,e.noStringify,!0)},o.prototype={getStub:function(t){var e=this.next()
return e?this.getText(e,this.preserveWhitespace||t)||this.getComment(e)||this.getMustache(e)||this.getElement(e):null},getText:t,getComment:e,getMustache:n,getElement:r,next:function(){return this.tokens[this.pos]}},o}(Yr,ti,ai,mi,oi),bi=function(t,e,n){var r,i,o,s,a
return i=/^\s*$/,o=/<!--\s*\{\{\s*>\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/,s=/<!--\s*\{\{\s*\/\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/,r=function(r,s){var u,c,h
return s=s||{},o.test(r)?a(r,s):(s.sanitize===!0&&(s.sanitize={elements:"applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title".split(" "),eventAttributes:!0}),u=t(r,s),s.preserveWhitespace||(h=u[0],h&&h.type===e.TEXT&&i.test(h.value)&&u.shift(),h=u[u.length-1],h&&h.type===e.TEXT&&i.test(h.value)&&u.pop()),c=new n(u,s).result,"string"==typeof c?[c]:c)},a=function(t,e){var n,i,a,u,c,h
for(a={},n="",i=t;c=o.exec(i);){if(u=c[1],n+=i.substr(0,c.index),i=i.substring(c.index+c[0].length),h=s.exec(i),!h||h[1]!==u)throw new Error("Inline partials must have a closing delimiter, and cannot be nested")
a[u]=r(i.substr(0,h.index),e),i=i.substring(h.index+h[0].length)}return{main:r(n,e),partials:a}},r}(Xr,F,yi),wi=function(){function t(t,e){var r=n.exec(e)[0]
return null===t||r.length<t.length?r:t}var e=/^\s*$/,n=/^\s*/
return function(n){var r,i,o,s
return r=n.split("\n"),i=r[0],void 0!==i&&e.test(i)&&r.shift(),o=r[r.length-1],void 0!==o&&e.test(o)&&r.pop(),s=r.reduce(t,null),s&&(n=r.map(function(t){return t.replace(s,"")}).join("\n")),n}}(),Ei=function(t,e,n,r,i,o,s){var a,u,c,h
return a=function(r,a){var f,l,p
if(l=c(r,a))return l
if(e&&(f=document.getElementById(a),f&&"SCRIPT"===f.tagName)){if(!o)throw new Error(t.missingParser)
u(o(s(f.text),r.parseOptions),a,i)}if(l=i[a],!l){if(p='Could not find descriptor for partial "'+a+'"',r.debug)throw new Error(p)
return n(p),[]}return h(l)},c=function(e,n){var r
if(e.partials[n]){if("string"==typeof e.partials[n]){if(!o)throw new Error(t.missingParser)
r=o(e.partials[n],e.parseOptions),u(r,n,e.partials)}return h(e.partials[n])}},u=function(t,e,n){var i
if(r(t)){n[e]=t.main
for(i in t.partials)t.partials.hasOwnProperty(i)&&(n[i]=t.partials[i])}else n[e]=t},h=function(t){return 1===t.length&&"string"==typeof t[0]?t[0]:t},a}(wr,u,Z,te,Er,bi,wi),_i=function(t,e){var n
return e?n=t.split("\n").map(function(t,n){return n?e+t:t}).join("\n"):t},xi=function(t,e,n,r){var i,o
return r.push(function(){o=r.DomFragment}),i=function(n,r){var i,s=this.parentFragment=n.parentFragment
if(this.type=t.PARTIAL,this.name=n.descriptor.r,this.index=n.index,!n.descriptor.r)throw new Error("Partials must have a static reference (no expressions). This may change in a future version of Ractive.")
i=e(s.root,n.descriptor.r),this.fragment=new o({descriptor:i,root:s.root,pNode:s.pNode,owner:this}),r&&r.appendChild(this.fragment.docFrag)},i.prototype={firstNode:function(){return this.fragment.firstNode()},findNextNode:function(){return this.parentFragment.findNextNode(this)},detach:function(){return this.fragment.detach()},reassign:function(t,e,n,r){return this.fragment.reassign(t,e,n,r)},teardown:function(t){this.fragment.teardown(t)},toString:function(){var e,r,i,o
return e=this.fragment.toString(),r=this.parentFragment.items[this.index-1],r&&r.type===t.TEXT?(i=r.descriptor.split("\n").pop(),(o=/^\s+$/.exec(i))?n(e,o[0]):e):e},find:function(t){return this.fragment.find(t)},findAll:function(t,e){return this.fragment.findAll(t,e)},findComponent:function(t){return this.fragment.findComponent(t)},findAllComponents:function(t,e){return this.fragment.findAllComponents(t,e)}},i}(F,Ei,_i,w),ki=function(t,e){var n=function(t,n,r){this.parentFragment=t.parentFragment,this.component=t,this.key=n,this.fragment=new e({descriptor:r,root:t.root,owner:this}),this.selfUpdating=this.fragment.isSimple(),this.value=this.fragment.getValue()}
return n.prototype={bubble:function(){this.selfUpdating?this.update():!this.deferred&&this.ready&&(t.addAttribute(this),this.deferred=!0)},update:function(){var t=this.fragment.getValue()
this.component.instance.set(this.key,t),this.value=t},teardown:function(){this.fragment.teardown()}},n}(R,Pn),Si=function(t,e,n,r,i){function o(o,s,a,u){var c,h,f,l,p,d
return f=o.root,l=o.parentFragment,"string"==typeof a?(h=e(a),h?h.value:a):null===a?!0:1===a.length&&a[0].t===t.INTERPOLATOR&&a[0].r?l.indexRefs&&void 0!==l.indexRefs[d=a[0].r]?(o.indexRefBindings[d]=s,l.indexRefs[d]):(p=n(f,a[0].r,l)||a[0].r,u.push({childKeypath:s,parentKeypath:p}),r(f,p)):(c=new i(o,s,a),o.complexParameters.push(c),c.value)}return function(t,e,n,r){var i,s,a
i={},t.complexParameters=[]
for(s in n)n.hasOwnProperty(s)&&(a=o(t,s,n[s],r),(void 0!==a||void 0===e[s])&&(i[s]=a))
return i}}(F,Cn,N,Y,ki),Ni=function(){function t(t,e){var n,r,i
if(n=t.adapt.length?t.adapt.map(function(e){return"object"==typeof e?e:t.adaptors[e]||e}):[],r=e.length)for(i=0;r>i;i+=1)-1===n.indexOf(e[i])&&n.push(e[i])
return n}return function(e,n,r,i,o){var s,a,u,c,h
return a=e.parentFragment,c=e.root,u={content:o||[]},h=t(c,n.defaults.adapt,n.adaptors),s=new n({el:a.pNode,append:!0,data:r,partials:u,magic:c.magic||n.defaults.magic,modifyArrays:c.modifyArrays,_parent:c,_component:e,adapt:h}),i&&(s.insert(i),s.fragment.pNode=s.el=a.pNode),s}}(),Oi=function(t,e,n){return function(r,i){i.forEach(function(i){var o,s
t(r,r.root,i.parentKeypath,i.childKeypath),o=e(r.instance,i.childKeypath),s=e(r.root,i.parentKeypath),void 0!==o&&void 0===s&&n(r.root,i.parentKeypath,o)})}}(G,Y,U),Ti=function(t){function e(e,r,i,o){if("string"!=typeof o){if(r.debug)throw new Error(n)
return void t(n)}e.on(i,function(){var t=Array.prototype.slice.call(arguments)
t.unshift(o),r.fire.apply(r,t)})}var n="Components currently only support simple events - you cannot include arguments. Sorry!"
return function(t,n){var r
for(r in n)n.hasOwnProperty(r)&&e(t.instance,t.root,r,n[r])}}(Z),Ai=function(t){var e,n
for(e=t.root;e;)(n=e._liveComponentQueries[t.name])&&n.push(t.instance),e=e._parent},Ri=function(t,e,n,r,i,o,s){return function(a,u,c){var h,f,l,p,d
if(h=a.parentFragment=u.parentFragment,f=h.root,a.root=f,a.type=t.COMPONENT,a.name=u.descriptor.e,a.index=u.index,a.indexRefBindings={},a.bindings=[],l=f.components[u.descriptor.e],!l)throw new Error('Component "'+u.descriptor.e+'" not found')
d=[],p=n(a,l.data||{},u.descriptor.a,d),r(a,l,p,c,u.descriptor.f),i(a,d),o(a,u.descriptor.v),(u.descriptor.t1||u.descriptor.t2||u.descriptor.o)&&e('The "intro", "outro" and "decorator" directives have no effect on components'),s(a)}}(F,Z,Si,Ni,Oi,Ti,Ai),Ci=function(t,e){function n(t){var e,n
e=t.root
do(n=e._liveComponentQueries[t.name])&&n._remove(t)
while(e=e._parent)}var r=function(e,n){t(this,e,n)}
return r.prototype={firstNode:function(){return this.instance.fragment.firstNode()},findNextNode:function(){return this.parentFragment.findNextNode(this)},detach:function(){return this.instance.fragment.detach()},teardown:function(t){for(;this.complexParameters.length;)this.complexParameters.pop().teardown()
for(;this.bindings.length;)this.bindings.pop().teardown()
n(this),this.shouldDestroy=t,this.instance.teardown()},reassign:function(t,n,r,i){var o,s,a=this.instance,u=a._parent
this.bindings.forEach(function(o){var s
o.root===u&&(o.keypath===t&&a.set(o.otherKeypath,n),(s=e(o.keypath,r,i))&&o.reassign(s))}),(o=this.indexRefBindings[t])&&a.set(o,n),(s=this.root._liveComponentQueries[this.name])&&s._makeDirty()},toString:function(){return this.instance.fragment.toString()},find:function(t){return this.instance.fragment.find(t)},findAll:function(t,e){return this.instance.fragment.findAll(t,e)},findComponent:function(t){return t&&t!==this.name?this.instance.fragment?this.instance.fragment.findComponent(t):null:this.instance},findAllComponents:function(t,e){e._test(this,!0),this.instance.fragment&&this.instance.fragment.findAllComponents(t,e)}},r}(Ri,Be),Ii=function(t,e){var n=function(e,n){this.type=t.COMMENT,this.descriptor=e.descriptor,n&&(this.node=document.createComment(e.descriptor.f),n.appendChild(this.node))}
return n.prototype={detach:e,teardown:function(t){t&&this.detach()},firstNode:function(){return this.node},toString:function(){return"<!--"+this.descriptor.f+"-->"}},n}(F,Ke),Li=function(t,e,n,r,i,o,s,a,u,c,h,f,l){var p=function(t){t.pNode&&(this.docFrag=document.createDocumentFragment()),"string"==typeof t.descriptor?(this.html=t.descriptor,this.docFrag&&(this.nodes=r(this.html,t.pNode.tagName,t.pNode.namespaceURI,this.docFrag))):n.init(this,t)}
return p.prototype={reassign:n.reassign,detach:function(){var t,e
if(this.docFrag){if(this.nodes)for(t=this.nodes.length,e=0;t>e;e+=1)this.docFrag.appendChild(this.nodes[e])
else if(this.items)for(t=this.items.length,e=0;t>e;e+=1)this.docFrag.appendChild(this.items[e].detach())
return this.docFrag}},createItem:function(e){if("string"==typeof e.descriptor)return new i(e,this.docFrag)
switch(e.descriptor.t){case t.INTERPOLATOR:return new o(e,this.docFrag)
case t.SECTION:return new s(e,this.docFrag)
case t.TRIPLE:return new a(e,this.docFrag)
case t.ELEMENT:return this.root.components[e.descriptor.e]?new h(e,this.docFrag):new u(e,this.docFrag)
case t.PARTIAL:return new c(e,this.docFrag)
case t.COMMENT:return new f(e,this.docFrag)
default:throw new Error("Something very strange happened. Please file an issue at https://github.com/RactiveJS/Ractive/issues. Thanks!")}},teardown:function(t){var e
if(this.nodes&&t)for(;e=this.nodes.pop();)e.parentNode.removeChild(e)
else if(this.items)for(;this.items.length;)this.items.pop().teardown(t)
this.nodes=this.items=this.docFrag=null},firstNode:function(){return this.items&&this.items[0]?this.items[0].firstNode():this.nodes?this.nodes[0]||null:null},findNextNode:function(t){var e=t.index
return this.items[e+1]?this.items[e+1].firstNode():this.owner===this.root?this.owner.component?this.owner.component.findNextNode():null:this.owner.findNextNode(this)},toString:function(){var t,e,n,r
if(this.html)return this.html
if(t="",!this.items)return t
for(n=this.items.length,e=0;n>e;e+=1)r=this.items[e],t+=r.toString()
return t},find:function(t){var n,r,i,o,s
if(this.nodes){for(r=this.nodes.length,n=0;r>n;n+=1)if(o=this.nodes[n],1===o.nodeType){if(e(o,t))return o
if(s=o.querySelector(t))return s}return null}if(this.items){for(r=this.items.length,n=0;r>n;n+=1)if(i=this.items[n],i.find&&(s=i.find(t)))return s
return null}},findAll:function(t,n){var r,i,o,s,a,u,c
if(this.nodes){for(i=this.nodes.length,r=0;i>r;r+=1)if(s=this.nodes[r],1===s.nodeType&&(e(s,t)&&n.push(s),a=s.querySelectorAll(t)))for(u=a.length,c=0;u>c;c+=1)n.push(a[c])}else if(this.items)for(i=this.items.length,r=0;i>r;r+=1)o=this.items[r],o.findAll&&o.findAll(t,n)
return n},findComponent:function(t){var e,n,r,i
if(this.items){for(e=this.items.length,n=0;e>n;n+=1)if(r=this.items[n],r.findComponent&&(i=r.findComponent(t)))return i
return null}},findAllComponents:function(t,e){var n,r,i
if(this.items)for(r=this.items.length,n=0;r>n;n+=1)i=this.items[n],i.findAllComponents&&i.findAllComponents(t,e)
return e}},l.DomFragment=p,p}(F,ae,qe,We,ze,rn,hn,fn,br,xi,Ci,Ii,w),ji=function(t,e,n){function r(t){for(var e;e=t._childInitQueue.pop();)e.instance.init&&e.instance.init(e.options),r(e.instance)}return function(i,o){if(this._rendering=!0,t.start(this,o),!this._initing)throw new Error("You cannot call ractive.render() directly!")
this.constructor.css&&e.add(this.constructor),this.fragment=new n({descriptor:this.template,root:this,owner:this,pNode:i}),i&&i.appendChild(this.fragment.docFrag),this._parent&&this._parent._rendering||r(this),delete this._rendering,t.end()}}(R,_,Li),Mi=function(t){return function(){return t("renderHTML() has been deprecated and will be removed in a future version. Please use toHTML() instead"),this.toHTML()}}(Z),Pi=function(t,e,n,r){return function(i,o){var s,a,u
if("function"==typeof i?(o=i,i={}):i=i||{},"object"!=typeof i)throw new Error("The reset method takes either no arguments, or an object containing new data")
return s=new t(function(t){a=t}),o&&s.then(o),e.start(this,a),(u=this._wrapped[""])&&u.reset?u.reset(i)===!1&&(this.data=i):this.data=i,n(this,""),r(this,""),e.end(),this.fire("reset",i),s}}(g,R,B,T),Fi=function(t,e,n,r,i){return function(o,s,a){var u,c,h
if(c=new r(function(t){h=t}),t.start(this,h),e(o)){u=o,a=s
for(o in u)u.hasOwnProperty(o)&&(s=u[o],o=n(o),i(this,o,s))}else o=n(o),i(this,o,s)
return t.end(),a&&c.then(a.bind(this)),c}}(R,te,v,g,U),Bi=function(t){return function(e,n){return t(this,e,void 0===n?-1:-n)}}(l),Di=function(t,e,n,r,i){return function(o){var s,a,u,c,h,f,l,p
if(this.fire("teardown"),c=!this.component||this.component.shouldDestroy,this.constructor.css)if(c)h=o,o=function(){h&&h.call(this),e.remove(this.constructor)}
else{f=this.component.parentFragment
do f.owner.type===t.ELEMENT&&f.owner.willDetach&&(l=f.owner)
while(!l&&(f=f.parent))
if(!l)throw new Error("A component is being torn down but doesn't have a nearest detaching element... this shouldn't happen!")
l.cssDetachQueue.push(this.constructor)}for(a=new r(function(t){u=t}),n.start(this,u),this.fragment.teardown(c);this._animations[0];)this._animations[0].stop()
for(s in this._cache)i(this,s)
for(;p=this._unresolvedImplicitDependencies.pop();)p.teardown()
return n.end(),o&&a.then(o.bind(this)),a}}(F,_,R,g,B),Ui=function(){return this.fragment.toString()},qi=function(t,e){var n
{if("string"==typeof t)return n=this.get(t),this.set(t,!n,e)
if(this.debug)throw new Error("Bad arguments")}},Wi=function(t,e,n,r){return function(i,o){var s,a
return"function"==typeof i?(o=i,i=""):i=i||"",s=new e(function(t){a=t}),t.start(this,a),n(this,i),r(this,i),t.end(),this.fire("update",i),o&&s.then(o.bind(this)),s}}(R,g,B,T),Ki=function(t,e,n){function r(t,i,o,s,a){var u,c,h,f,l,p
if(u=t._twowayBindings[i])for(h=u.length;h--;)f=u[h],(!f.radioName||f.node.checked)&&(f.checkboxName?f.changed()&&s[i]!==!0&&(s[i]=!0,s.push(i)):(l=f.attr.value,p=f.value(),e(l,p)||n(l,p)||(o[i]=p)))
if(a&&(c=t._depsMap[i]))for(h=c.length;h--;)r(t,c[h],o,s,a)}return function(e,n){var i,o,s
if("string"!=typeof e&&(e="",n=!0),r(this,e,i={},o=[],n),s=o.length)for(;s--;)e=o[s],i[e]=t(this,e)
this.set(i)}}(x,yn,d),zi=function(t,e,n,r,i,o,s,a,u,c,h,f,l,p,d,g,v,m,y,b,w,E,_,x){return{add:t,animate:e,detach:n,find:r,findAll:i,findAllComponents:o,findComponent:s,fire:a,get:u,insert:c,merge:h,observe:f,off:l,on:p,render:d,renderHTML:g,reset:v,set:m,subtract:y,teardown:b,toHTML:w,toggle:E,update:_,updateModel:x}}(p,ie,oe,se,ve,me,ye,be,Ee,xe,Ne,Ce,Ie,Le,ji,Mi,Pi,Fi,Bi,Di,Ui,qi,Wi,Ki),Vi={},Hi={linear:function(t){return t},easeIn:function(t){return Math.pow(t,3)},easeOut:function(t){return Math.pow(t-1,3)+1},easeInOut:function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)}},Ji=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e,n
return e=16*Math.random()|0,n="x"==t?e:3&e|8,n.toString(16)})},$i=function(t){for(var e,n,r=Array.prototype.slice.call(arguments,1);n=r.shift();)for(e in n)n.hasOwnProperty(e)&&(t[e]=n[e])
return t},Gi=["adaptors","components","decorators","easing","events","interpolators","partials","transitions","data"],Xi=function(){function t(t){return t.trim?t.trim():t.replace(/^\s+/,"").replace(/\s+$/,"")}function e(t){return t.str}var n=/(?:^|\})?\s*([^\{\}]+)\s*\{/g,r=/\/\*.*?\*\//g,i=/((?:(?:\[[^\]+]\])|(?:[^\s\+\>\~:]))+)((?::[^\s\+\>\~]+)?\s*[\s\+\>\~]?)\s*/g
return function(o,s){var a,u
return u=function(t){var n,r,o,a,u,c,h,f,l=[]
for(n=[];r=i.exec(t);)n.push({str:r[0],base:r[1],modifiers:r[2]})
for(a='[data-rvcguid="'+s+'"]',u=n.map(e),f=n.length;f--;)h=u.slice(),o=n[f],h[f]=o.base+a+o.modifiers||"",c=u.slice(),c[f]=a+" "+c[f],l.push(h.join(" "),c.join(" "))
return l.join(", ")},a=o.replace(r,"").replace(n,function(e,n){var r,i
return r=n.split(",").map(t),i=r.map(u).join(", ")+" ",e.replace(n,i)})}}(),Qi=function(t,e,n,r){return function(i,o){t.forEach(function(t){o[t]&&(i[t]=e(o[t]))}),n(i,"defaults",{value:e(o.defaults)}),o.css&&n(i,"css",{value:o.defaults.noCssTransform?o.css:r(o.css,i._guid)})}}(Gi,je,c,Xi),Yi=function(t,e){return/_super/.test(t)?function(){var n,r=this._super
return this._super=e,n=t.apply(this,arguments),this._super=r,n}:t},Zi=function(t,e){var n
for(n in e)e.hasOwnProperty(n)&&(t[n]=e[n])
return t},to=function(t,e,n,r,i,o){var s={}
return e.concat(t.keys).forEach(function(t){s[t]=!0}),function(a,u){var c,h
e.forEach(function(t){var e=u[t]
e&&(a[t]?i(a[t],e):a[t]=e)}),t.keys.forEach(function(t){var e=u[t]
void 0!==e&&(a.defaults[t]="function"==typeof e&&"function"==typeof a[t]?r(e,a[t]):u[t])})
for(c in u)!s[c]&&u.hasOwnProperty(c)&&(h=u[c],a.prototype[c]="function"==typeof h&&"function"==typeof a.prototype[c]?r(h,a.prototype[c]):h)
u.css&&n(a,"css",{value:a.defaults.noCssTransform?u.css:o(u.css,a._guid)})}}(i,Gi,c,Yi,Zi,Xi),eo=function(t,e){return function(n,r){t(n.defaults.template)&&(n.partials||(n.partials={}),e(n.partials,n.defaults.template.partials),r.partials&&e(n.partials,r.partials),n.defaults.template=n.defaults.template.main)}}(te,Zi),no=function(t,e,n){return function(r){var i
if("string"==typeof r.defaults.template){if(!n)throw new Error(t.missingParser)
if("#"===r.defaults.template.charAt(0)&&e){if(i=document.getElementById(r.defaults.template.substring(1)),!i||"SCRIPT"!==i.tagName)throw new Error("Could not find template element ("+r.defaults.template+")")
r.defaults.template=n(i.innerHTML,r)}else r.defaults.template=n(r.defaults.template,r.defaults)}}}(wr,u,bi),ro=function(t,e){return function(n){var r
if(n.partials)for(r in n.partials)if(n.partials.hasOwnProperty(r)&&"string"==typeof n.partials[r]){if(!e)throw new Error(t.missingParser)
n.partials[r]=e(n.partials[r],n)}}}(wr,bi),io=function(){function t(t){var n="var __ractive=this;return("+t.replace(e,function(t,e){return'__ractive.get("'+e+'")'})+")"
return new Function(n)}var e=/\$\{([^\}]+)\}/g
return function(e){return"function"==typeof e?{get:e}:"string"==typeof e?{get:t(e)}:("object"==typeof e&&"string"==typeof e.get&&(e={get:t(e.get),set:e.set}),e)}}(),oo=function(t,e,n){var r=function(t,n){this.root=t.ractive,this.keypath=n,this.priority=0,this.computation=t,e(this)}
return r.prototype={update:function(){var e
e=this.root.get(this.keypath),t(e,this.value)||this.computation.bubble()},teardown:function(){n(this)}},r}(d,J,$),so=function(t,e,n,r){function i(t,e,n){var i,o,s
for(i=e.length;i--;)o=e[i],n[o.keypath]||(e.splice(i,1),e[o.keypath]=null,o.teardown())
for(i=n.length;i--;)s=n[i],e[s]||(o=new r(t,s),e.push(e[s]=o))}var o=function(t,e,n){this.ractive=t,this.key=e,this.getter=n.get,this.setter=n.set,this.watchers=[],this.update()}
return o.prototype={set:function(t){if(this.setting)return void(this.value=t)
if(!this.setter)throw new Error("Computed properties without setters are read-only in the current version")
this.setter.call(this.ractive,t)},update:function(){var e,r,o,s
e=this.ractive,r=e._captured,r||(e._captured=[])
try{o=this.getter.call(e)}catch(a){e.debug&&t('Failed to compute "'+this.key+'": '+a.message||a),s=!0}i(this,this.watchers,e._captured),e._captured=r,s||(this.setting=!0,this.value=o,n(e,this.key,o),this.setting=!1),this.deferred=!1},bubble:function(){this.watchers.length<=1?this.update():this.deferred||(e.addComputation(this),this.deferred=!0)}},o}(Z,R,U,oo),ao=function(t,e){return function(n,r){var i,o
for(i in r)o=t(r[i]),n._computations[i]=new e(n,i,o)}}(io,so),uo=function(t,e,n,r,i,o,s,a,u,c,h,f,l,p,d,g,v){var m=["adapt","modifyArrays","magic","twoway","lazy","debug","isolated"]
return function(y,b){var w,E,_,x,k,S,N
if(f(b.adaptors)&&(i("The `adaptors` option, to indicate which adaptors should be used with a given Ractive instance, has been deprecated in favour of `adapt`. See [TODO] for more information"),b.adapt=b.adaptors,delete b.adaptors),w=y.constructor.defaults,n.keys.forEach(function(t){void 0===b[t]&&(b[t]=w[t])}),m.forEach(function(t){y[t]=b[t]}),"string"==typeof y.adapt&&(y.adapt=[y.adapt]),y.magic&&!d)throw new Error("Getters and setters (magic mode) are not supported in this browser")
if(u(y,{_initing:{value:!0,writable:!0},_guid:{value:l()},_subs:{value:o(null),configurable:!0},_cache:{value:{}},_cacheMap:{value:o(null)},_deps:{value:[]},_depsMap:{value:o(null)},_patternObservers:{value:[]},_evaluators:{value:o(null)},_computations:{value:o(null)},_twowayBindings:{value:{}},_animations:{value:[]},nodes:{value:{}},_wrapped:{value:o(null)},_liveQueries:{value:[]},_liveComponentQueries:{value:[]},_childInitQueue:{value:[]},_changes:{value:[]},_unresolvedImplicitDependencies:{value:[]}}),b._parent&&b._component&&(u(y,{_parent:{value:b._parent},component:{value:b._component}}),b._component.instance=y),b.el&&(y.el=c(b.el),!y.el&&y.debug))throw new Error("Could not find container element")
if(b.eventDefinitions&&(i("ractive.eventDefinitions has been deprecated in favour of ractive.events. Support will be removed in future versions"),b.events=b.eventDefinitions),r.forEach(function(t){y.constructor[t]?y[t]=s(o(y.constructor[t]),b[t]):b[t]&&(y[t]=b[t])}),y.data||(y.data={}),N=w.computed?s(o(w.computed),b.computed):b.computed,N&&v(y,N),E=b.template,"string"==typeof E){if(!g)throw new Error(e.missingParser)
if("#"===E.charAt(0)&&t){if(_=document.getElementById(E.substring(1)),!_)throw new Error("Could not find template element ("+E+")")
x=g(_.innerHTML,b)}else x=g(E,b)}else x=E
h(x)&&(a(y.partials,x.partials),x=x.main),x&&1===x.length&&"string"==typeof x[0]&&(x=x[0]),y.template=x,s(y.partials,b.partials),y.parseOptions={preserveWhitespace:b.preserveWhitespace,sanitize:b.sanitize,stripComments:b.stripComments},y.transitionsEnabled=b.noIntro?!1:b.transitionsEnabled,t&&!y.el&&(y.el=document.createDocumentFragment()),y.el&&!b.append&&(y.el.innerHTML=""),k=new p(function(t){S=t}),y.render(y.el,S),b.complete&&k.then(b.complete.bind(y)),y.transitionsEnabled=b.transitionsEnabled,y._initing=!1}}(u,wr,i,Gi,Z,je,$i,ir,h,_e,te,I,Ji,g,z,bi,ao),co=function(t,e,n){return function(r,i,o){t.keys.forEach(function(t){var n=o[t],r=i.defaults[t]
"function"==typeof n&&"function"==typeof r&&(o[t]=e(n,r))}),r.beforeInit&&r.beforeInit(o),n(r,o),o._parent&&o._parent._rendering?o._parent._childInitQueue.push({instance:r,options:o}):r.init&&r.init(o)}}(i,Yi,uo),ho=function(t,e,n,r,i,o,s,a,u,c,h){var f
return h.push(function(){f=h.Ractive}),function(h){var l,p,d,g=this
if(h.prototype instanceof f&&(h=r({},h,h.prototype,h.defaults)),l=function(t){c(this,l,t||{})},l.prototype=t(g.prototype),l.prototype.constructor=l,e(l,{extend:{value:g.extend},_guid:{value:n()}}),i(l,g),o(l,h),l.adaptors&&(d=l.defaults.adapt.length))for(;d--;)p=l.defaults.adapt[d],"string"==typeof p&&(l.defaults.adapt[d]=l.adaptors[p]||p)
return h.template&&(a(l),s(l,h),u(l)),l}}(je,h,Ji,$i,Qi,to,eo,no,ro,co,w),fo=function(t,e,n,r,i,o,s,a,u,c,h,f,l,p){var d=function(t){l(this,t)}
return d.prototype=r,n(d,{partials:{value:i},adaptors:{value:o},easing:{value:a},transitions:{value:{}},events:{value:{}},components:{value:s},decorators:{value:{}},interpolators:{value:u},defaults:{value:t.defaults},svg:{value:e},VERSION:{value:"0.4.0"}}),d.eventDefinitions=d.events,d.prototype.constructor=d,d.Promise=c,d.extend=h,d.parse=f,p.Ractive=d,d}(i,o,h,zi,Er,j,Vi,Hi,ee,g,ho,bi,uo,w),lo=function(t,e){for(var n="function";e.length;)e.pop()()
if(typeof Date.now!==n||typeof String.prototype.trim!==n||typeof Object.keys!==n||typeof Array.prototype.indexOf!==n||typeof Array.prototype.forEach!==n||typeof Array.prototype.map!==n||typeof Array.prototype.filter!==n||"undefined"!=typeof window&&typeof window.addEventListener!==n)throw new Error("It looks like you're attempting to use Ractive.js in an older browser. You'll need to use one of the 'legacy builds' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.")
return"undefined"!=typeof window&&window.Node&&!window.Node.prototype.contains&&window.HTMLElement&&window.HTMLElement.prototype.contains&&(window.Node.prototype.contains=window.HTMLElement.prototype.contains),t}(fo,w,r)
"undefined"!=typeof e&&e.exports?e.exports=lo:"function"==typeof define&&define.amd&&define(function(){return lo}),t.Ractive=lo,lo.noConflict=function(){return t.Ractive=n,lo}}("undefined"!=typeof window?window:this)},{}],92:[function(t,e){e.exports=function(t,e){for(var n=0,r=e.indexOf(t);-1!==r;)n++,r=e.indexOf(t,r+1)
return n}},{}],93:[function(t,e){function n(){return Object.create(new a)}function r(t,e){var n=Object.create(t),r=0
return e.forEach(function(t){var e,i,o=t.split("=")
o.length>1?(e=o[0],i=o[1]):(r++,e=r,i=o[0]),n[e]=i}),n}function i(t){var e=t.data
return e||(e=t.ractive?t.ractive.get():{}),t.templateElements=[],t.html=t.html.replace(/::([^:]+)::/gm,function(i,a,u,c){var h=s("<code",c.substr(0,u)),f=s("</code",c.substr(0,u))
if(h!==f)return i
var l=n(),p=a.split("|")
return l.postName=p.shift(0),l.elementId=o.generateId(l.postName),l.data=r(e,p),t.templateElements.push(l),o.generatePostDiv(l.elementId)}),t}var o=t("./templateToolbox"),s=t("./numberOfOccurrances"),a=t("events").EventEmitter
e.exports=i},{"./numberOfOccurrances":92,"./templateToolbox":94,events:104}],94:[function(t,e){function n(t){return t.metadata.markdown!==!1?h.makeHtml(t.content):t.content}function r(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0,n="x"==t?e:3&e|8
return n.toString(16)})}function i(t){return"noddity_post_"+t+"_"+r()}function o(t){var e=f.exec(t)
return null!==e?e[1]:void 0}function s(t){return f.test(t)}function a(t){return'<span class="noddity-template" id="'+t+'"></span>'}function u(t,e){var n=Object.create(e),r=0
return t.forEach(function(t){var e,i,o=t.split("=")
o.length>1?(e=o[0],i=o[1]):(r++,e=r,i=o[0]),n[e]=i}),n}var c=t("pagedown").Converter,h=new c,f=/noddity_post_(.+)_[\da-z]{12}4[\da-z]{19}/
e.exports={generateId:i,getPostName:o,generatePostDiv:a,isAPostDiv:s,getTemplateDataObject:u,htmlify:n}},{pagedown:98}],95:[function(t,e){e.exports=function(t){var e={}
return t.on("post changed",function(t,n){e[t]&&e[t].forEach(function(t){t.emit("post changed",n)})}),function(t){"undefined"==typeof e[t.postName]&&(e[t.postName]=[]),e[t.postName].push(t),t.ractive.on("teardown",function(){e[t.postName]=e[t.postName].filter(function(e){return e!==t})})}}},{}],96:[function(t,e,n){var r
r="object"==typeof n&&"function"==typeof t?n:{},function(){function t(t){return t}function e(){return!1}function n(){}function i(){}n.prototype={chain:function(e,n){var r=this[e]
if(!r)throw new Error("unknown hook "+e)
this[e]=r===t?n:function(){var t=Array.prototype.slice.call(arguments,0)
return t[0]=r.apply(null,t),n.apply(null,t)}},set:function(t,e){if(!this[t])throw new Error("unknown hook "+t)
this[t]=e},addNoop:function(e){this[e]=t},addFalse:function(t){this[t]=e}},r.HookCollection=n,i.prototype={set:function(t,e){this["s_"+t]=e},get:function(t){return this["s_"+t]}},r.Converter=function(){function t(t){return t=t.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,function(t,e,n,r,i,o){return e=e.toLowerCase(),j.set(e,x(n)),i?r:(o&&M.set(e,o.replace(/"/g,"&quot;")),"")})}function e(t){return t=t.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,r),t=t.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,r),t=t.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,r),t=t.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g,r),t=t.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,r)}function r(t,e){var n=e
return n=n.replace(/^\n+/,""),n=n.replace(/\n+$/g,""),n="\n\n~K"+(P.push(n)-1)+"K\n\n"}function o(t,n){t=L.preBlockGamut(t,B),t=p(t)
var r="<hr />\n"
return t=t.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,r),t=t.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm,r),t=t.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,r),t=d(t),t=v(t),t=E(t),t=L.postBlockGamut(t,B),t=e(t),t=_(t,n)}function s(t){return t=L.preSpanGamut(t),t=y(t),t=a(t),t=k(t),t=h(t),t=u(t),t=N(t),t=t.replace(/~P/g,"://"),t=x(t),t=w(t),t=t.replace(/  +\n/g," <br>\n"),t=L.postSpanGamut(t)}function a(t){var e=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi
return t=t.replace(e,function(t){var e=t.replace(/(.)<\/?code>(?=.)/g,"$1`")
return e=C(e,"!"==t.charAt(1)?"\\`*_/":"\\`*_")})}function u(t){return t=t.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,c),t=t.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,c),t=t.replace(/(\[([^\[\]]+)\])()()()()()/g,c)}function c(t,e,n,r,i,o,s,a){void 0==a&&(a="")
var u=e,c=n.replace(/:\/\//g,"~P"),h=r.toLowerCase(),l=i,p=a
if(""==l)if(""==h&&(h=c.toLowerCase().replace(/ ?\n/g," ")),l="#"+h,void 0!=j.get(h))l=j.get(h),void 0!=M.get(h)&&(p=M.get(h))
else{if(!(u.search(/\(\s*\)$/m)>-1))return u
l=""}l=R(l),l=C(l,"*_")
var d='<a href="'+l+'"'
return""!=p&&(p=f(p),p=C(p,"*_"),d+=' title="'+p+'"'),d+=">"+c+"</a>"}function h(t){return t=t.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,l),t=t.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,l)}function f(t){return t.replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function l(t,e,n,r,i,o,s,a){var u=e,c=n,h=r.toLowerCase(),l=i,p=a
if(p||(p=""),""==l){if(""==h&&(h=c.toLowerCase().replace(/ ?\n/g," ")),l="#"+h,void 0==j.get(h))return u
l=j.get(h),void 0!=M.get(h)&&(p=M.get(h))}c=C(f(c),"*_[]()"),l=C(l,"*_")
var d='<img src="'+l+'" alt="'+c+'"'
return p=f(p),p=C(p,"*_"),d+=' title="'+p+'"',d+=" />"}function p(t){return t=t.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(t,e){return"<h1>"+s(e)+"</h1>\n\n"}),t=t.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(t,e){return"<h2>"+s(e)+"</h2>\n\n"}),t=t.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(t,e,n){var r=e.length
return"<h"+r+">"+s(n)+"</h"+r+">\n\n"})}function d(t){t+="~0"
var e=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm
return F?t=t.replace(e,function(t,e,n){var r=e,i=n.search(/[*+-]/g)>-1?"ul":"ol",o=g(r,i)
return o=o.replace(/\s+$/,""),o="<"+i+">"+o+"</"+i+">\n"}):(e=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,t=t.replace(e,function(t,e,n,r){var i=e,o=n,s=r.search(/[*+-]/g)>-1?"ul":"ol",a=g(o,s)
return a=i+"<"+s+">\n"+a+"</"+s+">\n"})),t=t.replace(/~0/,"")}function g(t,e){F++,t=t.replace(/\n{2,}$/,"\n"),t+="~0"
var n=D[e],r=new RegExp("(^[ \\t]*)("+n+")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1("+n+")[ \\t]+))","gm"),i=!1
return t=t.replace(r,function(t,e,n,r){var a=r,u=/\n\n$/.test(a),c=u||a.search(/\n{2,}/)>-1
return c||i?a=o(T(a),!0):(a=d(T(a)),a=a.replace(/\n$/,""),a=s(a)),i=u,"<li>"+a+"</li>\n"}),t=t.replace(/~0/g,""),F--,t}function v(t){return t+="~0",t=t.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(t,e,n){var r=e,i=n
return r=b(T(r)),r=A(r),r=r.replace(/^\n+/g,""),r=r.replace(/\n+$/g,""),r="<pre><code>"+r+"\n</code></pre>","\n\n"+r+"\n\n"+i}),t=t.replace(/~0/,"")}function m(t){return t=t.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(P.push(t)-1)+"K\n\n"}function y(t){return t=t.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(t,e,n,r){var i=r
return i=i.replace(/^([ \t]*)/g,""),i=i.replace(/[ \t]*$/g,""),i=b(i),i=i.replace(/:\/\//g,"~P"),e+"<code>"+i+"</code>"})}function b(t){return t=t.replace(/&/g,"&amp;"),t=t.replace(/</g,"&lt;"),t=t.replace(/>/g,"&gt;"),t=C(t,"*_{}[]\\",!1)}function w(t){return t=t.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g,"$1<strong>$3</strong>$4"),t=t.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g,"$1<em>$3</em>$4")}function E(t){return t=t.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(t,e){var n=e
return n=n.replace(/^[ \t]*>[ \t]?/gm,"~0"),n=n.replace(/~0/g,""),n=n.replace(/^[ \t]+$/gm,""),n=o(n),n=n.replace(/(^|\n)/g,"$1  "),n=n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(t,e){var n=e
return n=n.replace(/^  /gm,"~0"),n=n.replace(/~0/g,"")}),m("<blockquote>\n"+n+"\n</blockquote>")})}function _(t,e){t=t.replace(/^\n+/g,""),t=t.replace(/\n+$/g,"")
for(var n=t.split(/\n{2,}/g),r=[],i=/~K(\d+)K/,o=n.length,a=0;o>a;a++){var u=n[a]
i.test(u)?r.push(u):/\S/.test(u)&&(u=s(u),u=u.replace(/^([ \t]*)/g,"<p>"),u+="</p>",r.push(u))}if(!e){o=r.length
for(var a=0;o>a;a++)for(var c=!0;c;)c=!1,r[a]=r[a].replace(/~K(\d+)K/g,function(t,e){return c=!0,P[e]})}return r.join("\n\n")}function x(t){return t=t.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),t=t.replace(/<(?![a-z\/?!]|~D)/gi,"&lt;")}function k(t){return t=t.replace(/\\(\\)/g,I),t=t.replace(/\\([`*_{}\[\]()>#+-.!])/g,I)}function S(t,e,n,r){if(e)return t
if(")"!==r.charAt(r.length-1))return"<"+n+r+">"
for(var i=r.match(/[()]/g),o=0,s=0;s<i.length;s++)"("===i[s]?0>=o?o=1:o++:o--
var a=""
if(0>o){var u=new RegExp("\\){1,"+-o+"}$")
r=r.replace(u,function(t){return a=t,""})}return"<"+n+r+">"+a}function N(t){t=t.replace(/(="|<)?\b(https?|ftp)(:\/\/[-A-Z0-9+&@#\/%?=~_|\[\]\(\)!:,\.;]*[-A-Z0-9+&@#\/%=~_|\[\])])(?=$|\W)/gi,S)
var e=function(t,e){return'<a href="'+e+'">'+L.plainLinkText(e)+"</a>"}
return t=t.replace(/<((https?|ftp):[^'">\s]+)>/gi,e)}function O(t){return t=t.replace(/~E(\d+)E/g,function(t,e){var n=parseInt(e)
return String.fromCharCode(n)})}function T(t){return t=t.replace(/^(\t|[ ]{1,4})/gm,"~0"),t=t.replace(/~0/g,"")}function A(t){if(!/\t/.test(t))return t
var e,n=["    ","   ","  "," "],r=0
return t.replace(/[\n\t]/g,function(t,i){return"\n"===t?(r=i+1,t):(e=(i-r)%4,r=i+1,n[e])})}function R(t){if(!t)return""
var e=t.length
return t.replace(U,function(n,r){return"~D"==n?"%24":":"!=n||r!=e-1&&!/[0-9\/]/.test(t.charAt(r+1))?"%"+n.charCodeAt(0).toString(16):":"})}function C(t,e,n){var r="(["+e.replace(/([\[\]\\])/g,"\\$1")+"])"
n&&(r="\\\\"+r)
var i=new RegExp(r,"g")
return t=t.replace(i,I)}function I(t,e){var n=e.charCodeAt(0)
return"~E"+n+"E"}var L=this.hooks=new n
L.addNoop("plainLinkText"),L.addNoop("preConversion"),L.addNoop("postNormalization"),L.addNoop("preBlockGamut"),L.addNoop("postBlockGamut"),L.addNoop("preSpanGamut"),L.addNoop("postSpanGamut"),L.addNoop("postConversion")
var j,M,P,F
this.makeHtml=function(n){if(j)throw new Error("Recursive call to converter.makeHtml")
return j=new i,M=new i,P=[],F=0,n=L.preConversion(n),n=n.replace(/~/g,"~T"),n=n.replace(/\$/g,"~D"),n=n.replace(/\r\n/g,"\n"),n=n.replace(/\r/g,"\n"),n="\n\n"+n+"\n\n",n=A(n),n=n.replace(/^[ \t]+$/gm,""),n=L.postNormalization(n),n=e(n),n=t(n),n=o(n),n=O(n),n=n.replace(/~D/g,"$$"),n=n.replace(/~T/g,"~"),n=L.postConversion(n),P=M=j=null,n}
var B=function(t){return o(t)},D={ol:"\\d+[.]",ul:"[*+-]"},U=/(?:["'*()[\]:]|~D)/g}}()},{}],97:[function(t,e,n){!function(){function e(t){return t.replace(/<[^>]*>?/gi,r)}function r(t){return t.match(a)||t.match(u)||t.match(c)?t:""}function i(t){if(""==t)return""
var e=/<\/?\w+[^>]*(\s|$|>)/g,n=t.toLowerCase().match(e),r=(n||[]).length
if(0==r)return t
for(var i,o,s,a="<p><img><br><li><hr>",u=[],c=[],h=!1,f=0;r>f;f++)if(i=n[f].replace(/<\/?(\w+).*/,"$1"),!(u[f]||a.search("<"+i+">")>-1)){if(o=n[f],s=-1,!/^<\//.test(o))for(var l=f+1;r>l;l++)if(!u[l]&&n[l]=="</"+i+">"){s=l
break}-1==s?h=c[f]=!0:u[s]=!0}if(!h)return t
var f=0
return t=t.replace(e,function(t){var e=c[f]?"":t
return f++,e})}var o,s
"object"==typeof n&&"function"==typeof t?(o=n,s=t("./Markdown.Converter").Converter):(o=window.Markdown,s=o.Converter),o.getSanitizingConverter=function(){var t=new s
return t.hooks.chain("postConversion",e),t.hooks.chain("postConversion",i),t}
var a=/^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol|p|pre|s|sup|sub|strong|strike|ul)>|<(br|hr)\s?\/?>)$/i,u=/^(<a\shref="((https?|ftp):\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i,c=/^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i}()},{"./Markdown.Converter":96}],98:[function(t,e,n){n.Converter=t("./Markdown.Converter").Converter,n.getSanitizingConverter=t("./Markdown.Sanitizer").getSanitizingConverter},{"./Markdown.Converter":96,"./Markdown.Sanitizer":97}],99:[function(t,e){!function(t){var n=function(){return"undefined"!=typeof document?document&&document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"):void 0}(),r=function(){var t
try{Object.create(null),t=Object.create}catch(e){t=function(){var t=function(){}
return function(e,n){var r
return null===e?{}:(t.prototype=e,r=new t,n&&Object.defineProperties(r,n),r)}}()}return t}(),i={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},o=function(t,e){return t?function(t,e){return e?document.createElementNS(e,t):document.createElement(t)}:function(t,n){if(n&&n!==e.html)throw"This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See https://github.com/RactiveJS/Ractive/wiki/SVG-and-older-browsers for more information"
return document.createElement(t)}}(n,i),s=function(){return"object"==typeof document?!0:!1}(),a=function(t){try{return Object.defineProperty({},"test",{value:0}),t&&Object.defineProperty(document.createElement("div"),"test",{value:0}),Object.defineProperty}catch(e){return function(t,e,n){t[e]=n.value}}}(s),u=function(t,e,n){try{try{Object.defineProperties({},{test:{value:0}})}catch(r){throw r}return n&&Object.defineProperties(t("div"),{test:{value:0}}),Object.defineProperties}catch(r){return function(t,n){var r
for(r in n)n.hasOwnProperty(r)&&e(t,r,n[r])}}}(o,a,s),c=function(){var t=/\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g
return function(e){return(e||"").replace(t,".$1")}}(),h={},f={TEXT:1,INTERPOLATOR:2,TRIPLE:3,SECTION:4,INVERTED:5,CLOSING:6,ELEMENT:7,PARTIAL:8,COMMENT:9,DELIMCHANGE:10,MUSTACHE:11,TAG:12,ATTRIBUTE:13,COMPONENT:15,NUMBER_LITERAL:20,STRING_LITERAL:21,ARRAY_LITERAL:22,OBJECT_LITERAL:23,BOOLEAN_LITERAL:24,GLOBAL:26,KEY_VALUE_PAIR:27,REFERENCE:30,REFINEMENT:31,MEMBER:32,PREFIX_OPERATOR:33,BRACKETED:34,CONDITIONAL:35,INFIX_OPERATOR:36,INVOCATION:40},l=function(){var t=Object.prototype.toString
return function(e){return"[object Array]"===t.call(e)}}(),p=function(){return function t(e,n){var r,i
if((i=e._wrapped[n])&&i.teardown()!==!1&&(e._wrapped[n]=null),e._cache[n]=void 0,r=e._cacheMap[n])for(;r.length;)t(e,r.pop())}}(),d=function(){return function(t,e){var n,r,i,o,s,a
for(n=[],a=t.rendered?t.el:t.fragment.docFrag,r=a.querySelectorAll('input[type="checkbox"][name="{{'+e+'}}"]'),o=r.length,s=0;o>s;s+=1)i=r[s],(i.hasAttribute("checked")||i.checked)&&(n[n.length]=i._ractive.value)
return n}}(),g=function(t){return function(e){var n,r,i,o,s,a
for(n=e._deferred;r=n.evals.pop();)r.update().deferred=!1
for(;i=n.selectValues.pop();)i.deferredUpdate()
for(;o=n.attrs.pop();)o.update().deferred=!1
for(;s=n.checkboxes.pop();)e.set(s,t(e,s))
for(;a=n.radios.pop();)a.update()}}(d),v=function(){return function(t){var e,n,r,i,o,s
for(e=t._deferred,(n=e.focusable)&&(n.focus(),e.focusable=null);r=e.liveQueries.pop();)r._sort()
for(;i=e.decorators.pop();)i.init()
for(;o=e.transitions.pop();)o.init()
for(;s=e.observers.pop();)s.update()}}(),m=function(){var t=function(t,e){var n,r,i,o
return t._parent&&t._parent._transitionManager?t._parent._transitionManager:(r=[],i=function(){var t,e
for(t=r.length;t--;)e=r[t],o(e.node)&&(e.detach(),r.splice(t,1))},o=function(t){var e,r
for(e=n.active.length;e--;)if(r=n.active[e],t.contains(r))return!1
return!0},n={active:[],push:function(t){n.active[n.active.length]=t},pop:function(t){var e
e=n.active.indexOf(t),-1!==e&&(n.active.splice(e,1),i(),!n.active.length&&n._ready&&n.complete())},complete:function(){e&&e.call(t)},ready:function(){i(),n._ready=!0,n.active.length||n.complete()},detachWhenReady:function(t){r[r.length]=t}})}
return t}(),y=function(){function t(t,r,i,o){var s=t._deps[i]
s&&(e(s[r]),o||n(t._depsMap[r],t,i))}function e(t){var e,n
if(t)for(n=t.length,e=0;n>e;e+=1)t[e].update()}function n(e,n,r,i){var o
if(e)for(o=e.length;o--;)t(n,e[o],r,i)}function r(t,e,n,o,s){var u,c,h,f,l,p,d,g
for(u=t._patternObservers.length;u--;)c=t._patternObservers[u],c.regex.test(n)&&c.update(n)
o||(g=function(e){if(h=t._depsMap[e])for(u=h.length;u--;)f=h[u],l=a.exec(f)[0],p=n+"."+l,r(t,f,p)},s?(d=i(n),d.forEach(g)):g(e))}function i(t){var e,n,r,i,s,a
for(e=t.split("."),n=o(e.length),s=[],r=function(t,n){return t?"*":e[n]},i=n.length;i--;)a=n[i].map(r).join("."),s[a]||(s[s.length]=a,s[a]=!0)
return s}function o(t){var e,n,r,i,o,s=""
if(!u[t]){for(r=[];s.length<t;)s+=1
for(e=parseInt(s,2),i=function(t){return"1"===t},o=0;e>=o;o+=1){for(n=o.toString(2);n.length<t;)n="0"+n
r[o]=Array.prototype.map.call(n,i)}u[t]=r}return u[t]}var s,a,u={}
return a=/[^\.]+$/,s=function(e,n,i){var o
for(e._patternObservers.length&&r(e,n,n,i,!0),o=0;o<e._deps.length;o+=1)t(e,n,o,i)},s.multiple=function(e,n,i){var o,s,a
if(a=n.length,e._patternObservers.length)for(o=a;o--;)r(e,n[o],n[o],i,!0)
for(o=0;o<e._deps.length;o+=1)if(e._deps[o])for(s=a;s--;)t(e,n[s],o,i)},s}(),b=function(t,e,n,r,i,o,s,a){var u,c,h,f,l,p,d,g,v,m
return u={filter:function(t){return n(t)&&(!t._ractive||!t._ractive.setting)},wrap:function(t,e,n){return new h(t,e,n)}},h=function(t,n,r){this.root=t,this.value=n,this.keypath=r,n._ractive||(e(n,"_ractive",{value:{wrappers:[],instances:[],setting:!1},configurable:!0}),f(n)),n._ractive.instances[t._guid]||(n._ractive.instances[t._guid]=0,n._ractive.instances.push(t)),n._ractive.instances[t._guid]+=1,n._ractive.wrappers.push(this)},h.prototype={get:function(){return this.value},teardown:function(){var t,e,n,r,i
if(t=this.value,e=t._ractive,n=e.wrappers,r=e.instances,e.setting)return!1
if(i=n.indexOf(this),-1===i)throw new Error(m)
if(n.splice(i,1),n.length){if(r[this.root._guid]-=1,!r[this.root._guid]){if(i=r.indexOf(this.root),-1===i)throw new Error(m)
r.splice(i,1)}}else delete t._ractive,l(this.value)}},c=function(e,n,o){var s,u,c,h,f
for(s=function(t,s){var c,h,f,l,p,d,g,v,m,y,b,w
if("sort"===n||"reverse"===n)return void t.set(s,e)
for(r(t,s),p=[],d=[],g=0;g<t._deps.length;g+=1)if(c=t._deps[g],c&&(h=c[s])){for(u(s,h,p,d),i(t);p.length;)p.pop().smartUpdate(n,o)
for(;d.length;)d.pop().update()}if("splice"===n&&o.length>2&&o[1])for(v=Math.min(o[1],o.length-2),m=o[0],y=m+v,o[1]===o.length-2&&(w=!0),g=m;y>g;g+=1)b=s+"."+g,a(t,b)
for(i(t),l=[],f=s.split(".");f.length;)f.pop(),l[l.length]=f.join(".")
a.multiple(t,l,!0),w||a(t,s+".length",!0)},u=function(e,n,r,i){var o,s
for(o=n.length;o--;)s=n[o],s.type===t.REFERENCE?s.update():s.keypath===e&&s.type===t.SECTION&&!s.inverted&&s.docFrag?r[r.length]=s:i[i.length]=s},c=e._ractive.wrappers,f=c.length;f--;)h=c[f],s(h.root,h.keypath)},p=[],g=["pop","push","reverse","shift","sort","splice","unshift"],v=function(){},g.forEach(function(t){var n=function(){var e,n,r,a,u={},h={}
for(e=Array.prototype[t].apply(this,arguments),n=this._ractive.instances,a=n.length;a--;)r=n[a],u[r._guid]=r._transitionManager,r._transitionManager=h[r._guid]=s(r,v)
for(this._ractive.setting=!0,c(this,t,arguments),this._ractive.setting=!1,a=n.length;a--;)r=n[a],r._transitionManager=u[r._guid],h[r._guid].ready(),i(r),o(r)
return e}
e(p,t,{value:n})}),d={},d.__proto__?(f=function(t){t.__proto__=p},l=function(t){t.__proto__=Array.prototype}):(f=function(t){var n,r
for(n=g.length;n--;)r=g[n],e(t,r,{value:p[r],configurable:!0})},l=function(t){var e
for(e=g.length;e--;)delete t[g[e]]}),m="Something went wrong in a rather interesting way",u}(f,a,l,p,g,v,m,y),w=function(){var t,e
try{Object.defineProperty({},"test",{value:0})}catch(n){return!1}return t={filter:function(t,e){return!!e},wrap:function(t,n,r){return new e(t,n,r)}},e=function(t,e,n){var r,i,o,s,a,u,c,h,f,l=this
if(this.ractive=t,this.keypath=n,r=n.split("."),this.prop=r.pop(),o=r.join("."),this.obj=o?t.get(o):t.data,s=this.originalDescriptor=Object.getOwnPropertyDescriptor(this.obj,this.prop),s&&s.set&&(a=s.set._ractiveWrappers))return void(-1===a.indexOf(this)&&a.push(this))
if(s&&!s.configurable)throw new Error('Cannot use magic mode with property "'+i+'" - object is not configurable')
s&&(this.value=s.value,u=s.get,c=s.set),h=u||function(){return l.value},f=function(t){var e,n,r
for(c&&c(t),e=f._ractiveWrappers,r=e.length;r--;)n=e[r],n.resetting||n.ractive.set(n.keypath,t)},f._ractiveWrappers=[this],Object.defineProperty(this.obj,this.prop,{get:h,set:f,enumerable:!0,configurable:!0})},e.prototype={get:function(){return this.value},reset:function(t){this.resetting=!0,this.value=t,this.resetting=!1},teardown:function(){var t,e,n,r
t=Object.getOwnPropertyDescriptor(this.obj,this.prop),e=t.set,r=e._ractiveWrappers,r.splice(r.indexOf(this),1),r.length||(n=this.obj[this.prop],Object.defineProperty(this.obj,this.prop,this.originalDescriptor||{writable:!0,enumerable:!0,configrable:!0}),this.obj[this.prop]=n)}},t}(),E=function(t,e,n){function r(t,e){var n,r={}
if(!e)return t
e+="."
for(n in t)t.hasOwnProperty(n)&&(r[e+n]=t[n])
return r}function i(t){var e
return o[t]||(e=t?t+".":"",o[t]=function(n,i){var o
return"string"==typeof n?(o={},o[e+n]=i,o):"object"==typeof n?e?r(n,t):n:void 0}),o[t]}var o={}
return function(r,o,s,a){var u,c,h,f
for(u=r.adaptors.length,c=0;u>c;c+=1){if(h=r.adaptors[c],"string"==typeof h){if(!t[h])throw new Error('Missing adaptor "'+h+'"')
h=r.adaptors[c]=t[h]}if(h.filter(s,o,r))return f=r._wrapped[o]=h.wrap(r,s,o,i(o)),void(f.value=s)}a||(r.magic&&n.filter(s,o,r)?r._wrapped[o]=n.wrap(r,s,o):r.modifyArrays&&e.filter(s,o,r)&&(r._wrapped[o]=e.wrap(r,s,o)))}}(h,b,w),_=function(t,e,n){var r,i,o
return r=function(t){return this._captured&&!this._captured[t]&&(this._captured.push(t),this._captured[t]=!0),i(this,t)},i=function(e,r){var i,s,a,u,c
return r=t(r),i=e._cache,void 0!==(s=i[r])?s:((u=e._wrapped[r])?a=u.value:r?a=(c=e._evaluators[r])?c.value:o(e,r):(n(e,"",e.data),a=e.data),i[r]=a,a)},o=function(t,e){var r,o,s,a,u,c,h
return r=e.split("."),o=r.pop(),s=r.join("."),a=i(t,s),(h=t._wrapped[s])&&(a=h.get()),null!==a&&void 0!==a?((u=t._cacheMap[s])?-1===u.indexOf(e)&&(u[u.length]=e):t._cacheMap[s]=[e],c=a[o],n(t,e,c),t._cache[e]=c,c):void 0},r}(c,h,E),x=function(){var t=Object.prototype.toString
return function(e){return"object"==typeof e&&"[object Object]"===t.call(e)}}(),k=function(){return function(t,e){return null===t&&null===e?!0:"object"==typeof t||"object"==typeof e?!1:t===e}}(),S=function(){var t
return t=function(t,e,n){var r,i,o,s,a,u,c,h,f,l,p
if(p='Could not resolve reference - too many "../" prefixes',"."===e){if(!n.length)return""
r=n[n.length-1]}else if("."===e.charAt(0))if(l=n[n.length-1],s=l?l.split("."):[],"../"===e.substr(0,3)){for(;"../"===e.substr(0,3);){if(!s.length)throw new Error(p)
s.pop(),e=e.substring(3)}s.push(e),r=s.join(".")}else r=l?l+e:e.substring(1)
else{for(i=e.split("."),o=i.pop(),u=i.length?"."+i.join("."):"",n=n.concat();n.length;)if(a=n.pop(),c=a+u,h=t.get(c),(f=t._wrapped[c])&&(h=f.get()),"object"==typeof h&&null!==h&&h.hasOwnProperty(o)){r=a+"."+e
break}r||void 0===t.get(e)||(r=e)}return r?r.replace(/^\./,""):r}}(),N=function(t){var e=Array.prototype.push
return function(n){for(var r,i,o;r=n._pendingResolution.pop();)i=t(n,r.ref,r.contextStack),void 0!==i?r.resolve(i):(o||(o=[])).push(r)
o&&e.apply(n._pendingResolution,o)}}(S),O=function(t,e){return function(n){t(n),e(n)}}(g,v),T=function(){return function(t,e,n){var r,i,o,s,a,u,c
for(r=e.split("."),i=[],(o=t._wrapped[""])?(o.set&&o.set(r.join("."),n),s=o.get()):s=t.data;r.length>1;)a=i[i.length]=r.shift(),u=i.join("."),(o=t._wrapped[u])?(o.set&&o.set(r.join("."),n),s=o.get()):(s.hasOwnProperty(a)||(c||(c=u),s[a]=/^\s*[0-9]+\s*$/.test(r[0])?[]:{}),s=s[a])
return a=r[0],s[a]=n,c}}(),A=function(t,e,n,r,i,o,s,a,u){var c,h,f,l
return c=function(e,r,u){var c,l,p,d,g,v,m
if(l=[],t(e)&&(c=e,u=r),c)for(e in c)c.hasOwnProperty(e)&&(r=c[e],e=n(e),h(this,e,r,l))
else e=n(e),h(this,e,r,l)
if(l.length){if(d=this._transitionManager,this._transitionManager=g=s(this,u),p=f(l),p.length&&i.multiple(this,p,!0),i.multiple(this,l),this._pendingResolution.length&&o(this),a(this),this._transitionManager=d,g.ready(),!this.firingChangeEvent){for(this.firingChangeEvent=!0,m={},v=l.length;v--;)m[l[v]]=this.get(l[v])
this.fire("change",m),this.firingChangeEvent=!1}return this}},h=function(t,e,n,i){var o,s,a,c,h
if(!(a=t._wrapped[e])||!a.reset||l(t,e,n,a,i)===!1){if((h=t._evaluators[e])&&(h.value=n),o=t._cache[e],s=t.get(e),s===n||h){if(n===o&&"object"!=typeof n)return}else c=u(t,e,n)
r(t,c||e),i[i.length]=e}},f=function(t){var e,n,r,i,o=[""]
for(e=t.length;e--;)for(n=t[e],r=n.split(".");r.length>1;)r.pop(),i=r.join("."),o[i]||(o[o.length]=i,o[i]=!0)
return o},l=function(t,n,i,o,s){var a,u,c,h
if(a=o.get(),!e(a,i)&&o.reset(i)===!1)return!1
if(i=o.get(),u=t._cache[n],!e(u,i)){if(t._cache[n]=i,c=t._cacheMap[n])for(h=c.length;h--;)r(t,c[h])
s[s.length]=n}},c}(x,k,c,p,y,N,m,O,T),R=function(t,e,n,r,i){return function(o,s){var a,u
return"function"==typeof o&&(s=o,o=""),u=this._transitionManager,this._transitionManager=a=t(this,s),e(this),n(this,o||""),r(this,o||""),i(this),this._transitionManager=u,a.ready(),"string"==typeof o?this.fire("update",o):this.fire("update"),this}}(m,N,p,y,O),C=function(t){return function(e,n){var r
if(!t(e)||!t(n))return!1
if(e.length!==n.length)return!1
for(r=e.length;r--;)if(e[r]!==n[r])return!1
return!0}}(l),I=function(t,e,n){function r(t,i,o,s,a){var u,c,h,f,l,p
if(u=t._twowayBindings[i])for(h=u.length;h--;)f=u[h],(!f.radioName||f.node.checked)&&(f.checkboxName?f.changed()&&!s[i]&&(s[i]=!0,s[s.length]=i):(l=f.attr.value,p=f.value(),e(l,p)||n(l,p)||(o[i]=p)))
if(a&&(c=t._depsMap[i]))for(h=c.length;h--;)r(t,c[h],o,s,a)}return function(e,n){var i,o,s
if("string"!=typeof e&&(e="",n=!0),r(this,e,i={},o=[],n),s=o.length)for(;s--;)e=o[s],i[e]=t(this,e)
this.set(i)}}(d,C,k),L=function(){return"undefined"!=typeof window?(function(t,e,n){var r,i
if(!n.requestAnimationFrame){for(r=0;r<t.length&&!n.requestAnimationFrame;++r)n.requestAnimationFrame=n[t[r]+"RequestAnimationFrame"]
n.requestAnimationFrame||(i=n.setTimeout,n.requestAnimationFrame=function(t){var n,r,o
return n=Date.now(),r=Math.max(0,16-(n-e)),o=i(function(){t(n+r)},r),e=n+r,o})}}(["ms","moz","webkit","o"],0,window),window.requestAnimationFrame):void 0}(),j=function(t){var e=[],n={tick:function(){var r,i
for(r=0;r<e.length;r+=1)i=e[r],i.tick()||e.splice(r--,1)
e.length?t(n.tick):n.running=!1},add:function(t){e[e.length]=t,n.running||(n.running=!0,n.tick())},abort:function(t,n){for(var r,i=e.length;i--;)r=e[i],r.root===n&&r.keypath===t&&r.stop()}}
return n}(L),M=function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&"function"==typeof console.warn.apply?function(){console.warn.apply(console,arguments)}:function(){}}(),P=function(){return function(t){return!isNaN(parseFloat(t))&&isFinite(t)}}(),F=function(t,e,n){function r(t,e){var n=e-t
return n?function(e){return t+e*n}:function(){return t}}function i(t,e){var n,r,i,o
for(n=[],r=[],o=i=Math.min(t.length,e.length);o--;)r[o]=s(t[o],e[o])
for(o=i;o<t.length;o+=1)n[o]=t[o]
for(o=i;o<e.length;o+=1)n[o]=e[o]
return function(t){for(var e=i;e--;)n[e]=r[e](t)
return n}}function o(t,e){var n,r,i,o,a=[]
i={},r={}
for(o in t)t.hasOwnProperty(o)&&(e.hasOwnProperty(o)?(a[a.length]=o,r[o]=s(t[o],e[o])):i[o]=t[o])
for(o in e)e.hasOwnProperty(o)&&!t.hasOwnProperty(o)&&(i[o]=e[o])
return n=a.length,function(t){for(var e,o=n;o--;)e=a[o],i[e]=r[e](t)
return i}}var s=function(s,a){return n(s)&&n(a)?r(+s,+a):t(s)&&t(a)?i(s,a):e(s)&&e(a)?o(s,a):function(){return a}}
return s}(l,x,P),B=function(t,e){var n=function(t){var n
this.startTime=Date.now()
for(n in t)t.hasOwnProperty(n)&&(this[n]=t[n])
this.interpolator=e(this.from,this.to),this.running=!0}
return n.prototype={tick:function(){var e,n,r,i,o,s
return s=this.keypath,this.running?(i=Date.now(),e=i-this.startTime,e>=this.duration?(null!==s&&this.root.set(s,this.to),this.step&&this.step(1,this.to),this.complete&&this.complete(1,this.to),o=this.root._animations.indexOf(this),-1===o&&t("Animation was not found"),this.root._animations.splice(o,1),this.running=!1,!1):(n=this.easing?this.easing(e/this.duration):e/this.duration,null!==s&&(r=this.interpolator(n),this.root.set(s,r)),this.step&&this.step(n,r),!0)):!1},stop:function(){var e
this.running=!1,e=this.root._animations.indexOf(this),-1===e&&t("Animation was not found"),this.root._animations.splice(e,1)}},n}(M,F),D=function(){return{linear:function(t){return t},easeIn:function(t){return Math.pow(t,3)},easeOut:function(t){return Math.pow(t-1,3)+1},easeInOut:function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)}}}(),U=function(t,e,n,r){function i(i,s,a,u){var c,h,f,l
return null!==s&&(l=i.get(s)),e.abort(s,i),t(l,a)?(u.complete&&u.complete(1,u.to),o):(u.easing&&(c="function"==typeof u.easing?u.easing:i.easing&&i.easing[u.easing]?i.easing[u.easing]:r[u.easing],"function"!=typeof c&&(c=null)),h=void 0===u.duration?400:u.duration,f=new n({keypath:s,from:l,to:a,root:i,duration:h,easing:c,step:u.step,complete:u.complete}),e.add(f),i._animations[i._animations.length]=f,f)}var o={stop:function(){}}
return function(t,e,n){var r,o,s,a,u,c,h,f,l,p,d,g
if("object"==typeof t){n=e||{},a=n.easing,u=n.duration,s=[],c=n.step,h=n.complete,(c||h)&&(l={},n.step=null,n.complete=null,f=function(t){return function(e,n){l[t]=n}})
for(r in t)t.hasOwnProperty(r)&&((c||h)&&(p=f(r),n={easing:a,duration:u},c&&(n.step=p),h&&(n.complete=p)),s[s.length]=i(this,r,t[r],n))
return(c||h)&&(g={easing:a,duration:u},c&&(g.step=function(t){c(t,l)}),h&&(g.complete=function(t){h(t,l)}),s[s.length]=d=i(this,null,null,g)),{stop:function(){for(;s.length;)s.pop().stop()
d&&d.stop()}}}return n=n||{},o=i(this,t,e,n),{stop:function(){o.stop()}}}}(k,j,B,D),q=function(){return function(t,e){var n,r,i=this
if("object"==typeof t){n=[]
for(r in t)t.hasOwnProperty(r)&&(n[n.length]=this.on(r,t[r]))
return{cancel:function(){for(;n.length;)n.pop().cancel()}}}return this._subs[t]?this._subs[t].push(e):this._subs[t]=[e],{cancel:function(){i.off(t,e)}}}}(),W=function(){return function(t,e){var n,r
if(!e)if(t)this._subs[t]=[]
else for(t in this._subs)delete this._subs[t]
n=this._subs[t],n&&(r=n.indexOf(e),-1!==r&&n.splice(r,1))}}(),K=function(){return function(t){var e,n,r,i,o,s,a,u
if(s=t.root,a=t.keypath,u=t.priority,e=s._deps[u]||(s._deps[u]={}),n=e[a]||(e[a]=[]),n[n.length]=t,t.registered=!0,a)for(r=a.split(".");r.length;)r.pop(),i=r.join("."),o=s._depsMap[i]||(s._depsMap[i]=[]),void 0===o[a]&&(o[a]=0,o[o.length]=a),o[a]+=1,a=i}}(),z=function(){return function(t){var e,n,r,i,o,s,a,u
if(s=t.root,a=t.keypath,u=t.priority,e=s._deps[u][a],n=e.indexOf(t),-1===n||!t.registered)throw new Error("Attempted to remove a dependant that was no longer registered! This should not happen. If you are seeing this bug in development please raise an issue at https://github.com/RactiveJS/Ractive/issues - thanks")
if(e.splice(n,1),t.registered=!1,a)for(r=a.split(".");r.length;)r.pop(),i=r.join("."),o=s._depsMap[i],o[a]-=1,o[a]||(o.splice(o.indexOf(a),1),o[a]=void 0),a=i}}(),V=function(t){var e=function(t,e,n,r){var i=this
this.root=t,this.keypath=e,this.callback=n,this.defer=r.defer,this.debug=r.debug,this.proxy={update:function(){i.reallyUpdate()}},this.priority=0,this.context=r&&r.context?r.context:t}
return e.prototype={init:function(t){t!==!1?this.update():this.value=this.root.get(this.keypath)},update:function(){return this.defer&&this.ready?void this.root._deferred.observers.push(this.proxy):void this.reallyUpdate()},reallyUpdate:function(){var e,n
if(e=this.value,n=this.root.get(this.keypath),this.value=n,!this.updating){if(this.updating=!0,!t(n,e)||!this.ready)try{this.callback.call(this.context,n,e,this.keypath)}catch(r){if(this.debug||this.root.debug)throw r}this.updating=!1}}},e}(k),H=function(){return function(t,e){var n,r,i,o,s,a,u
for(n=e.split("."),o=[],a=function(e){var n,r
n=t._wrapped[e]?t._wrapped[e].get():t.get(e)
for(r in n)s.push(e+"."+r)},u=function(t){return t+"."+r};r=n.shift();)"*"===r?(s=[],o.forEach(a),o=s):o[0]?o=o.map(u):o[0]=r
return i={},o.forEach(function(e){i[e]=t.get(e)}),i}}(),J=function(t,e){var n,r=/\*/
return n=function(t,e,n,r){this.root=t,this.callback=n,this.defer=r.defer,this.debug=r.debug,this.keypath=e,this.regex=new RegExp("^"+e.replace(/\./g,"\\.").replace(/\*/g,"[^\\.]+")+"$"),this.values={},this.defer&&(this.proxies=[]),this.priority="pattern",this.context=r&&r.context?r.context:t},n.prototype={init:function(t){var n,r
if(n=e(this.root,this.keypath),t!==!1)for(r in n)n.hasOwnProperty(r)&&this.update(r)
else this.values=n},update:function(t){var n
{if(!r.test(t))return this.defer&&this.ready?void this.root._deferred.observers.push(this.getProxy(t)):void this.reallyUpdate(t)
n=e(this.root,t)
for(t in n)n.hasOwnProperty(t)&&this.update(t)}},reallyUpdate:function(e){var n=this.root.get(e)
if(this.updating)return void(this.values[e]=n)
if(this.updating=!0,!t(n,this.values[e])||!this.ready){try{this.callback.call(this.context,n,this.values[e],e)}catch(r){if(this.debug||this.root.debug)throw r}this.values[e]=n}this.updating=!1},getProxy:function(t){var e=this
return this.proxies[t]||(this.proxies[t]={update:function(){e.reallyUpdate(t)}}),this.proxies[t]}},n}(k,H),$=function(t,e,n,r,i){var o=/\*/,s={}
return function(a,u,c,h){var f,l
return u=t(u),h=h||s,o.test(u)?(f=new i(a,u,c,h),a._patternObservers.push(f),l=!0):f=new r(a,u,c,h),e(f),f.init(h.init),f.ready=!0,{cancel:function(){var t
l&&(t=a._patternObservers.indexOf(f),-1!==t&&a._patternObservers.splice(t,1)),n(f)}}}}(c,K,z,V,J),G=function(t,e){return function(n,r,i){var o,s=[]
if(t(n)){i=r
for(o in n)n.hasOwnProperty(o)&&(r=n[o],s[s.length]=e(this,o,r,i))
return{cancel:function(){for(;s.length;)s.pop().cancel()}}}return e(this,n,r,i)}}(x,$),X=function(){return function(t){var e,n,r,i=this._subs[t]
if(i)for(e=Array.prototype.slice.call(arguments,1),n=0,r=i.length;r>n;n+=1)i[n].apply(this,e)}}(),Q=function(){return function(t){return this.el?this.fragment.find(t):null}}(),Y=function(t,e){var n,r,i,o,s,a,u,c
if(t){for(n=e("div"),r=["matches","matchesSelector"],s=["o","ms","moz","webkit"],c=function(t){return function(e,n){return e[t](n)}},a=r.length;a--;){if(i=r[a],n[i])return c(i)
for(u=s.length;u--;)if(o=s[a]+i.substr(0,1).toUpperCase()+i.substring(1),n[o])return c(o)}return function(t,e){var n,r
for(n=(t.parentNode||t.document).querySelectorAll(e),r=n.length;r--;)if(n[r]===t)return!0
return!1}}}(s,o),Z=function(t){return function(e,n){var r=this._isComponentQuery?!this.selector||e.name===this.selector:t(e.node,this.selector)
return r?(this.push(e.node||e.instance),n||this._makeDirty(),!0):void 0}}(Y),te=function(){return function(){var t,e,n
t=this._root[this._isComponentQuery?"liveComponentQueries":"liveQueries"],e=this.selector,n=t.indexOf(e),-1!==n&&(t.splice(n,1),t[e]=null)}}(),ee=function(){function t(t){var e
return(e=t.parentFragment)?e.owner:t.component&&(e=t.component.parentFragment)?e.owner:void 0}function e(e){var n,r
for(n=[e],r=t(e);r;)n.push(r),r=t(r)
return n}return function(t,n){var r,i,o,s,a,u,c,h,f,l
for(r=e(t.component||t._ractive.proxy),i=e(n.component||n._ractive.proxy),o=r[r.length-1],s=i[i.length-1];o&&o===s;)r.pop(),i.pop(),a=o,o=r[r.length-1],s=i[i.length-1]
if(o=o.component||o,s=s.component||s,f=o.parentFragment,l=s.parentFragment,f===l)return u=f.items.indexOf(o),c=l.items.indexOf(s),u-c||r.length-i.length
if(h=a.fragments)return u=h.indexOf(f),c=h.indexOf(l),u-c||r.length-i.length
throw new Error("An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/RactiveJS/Ractive/issues - thanks!")}}(),ne=function(t){return function(e,n){var r
return e.compareDocumentPosition?(r=e.compareDocumentPosition(n),2&r?1:-1):t(e,n)}}(ee),re=function(t,e){return function(){this.sort(this._isComponentQuery?e:t),this._dirty=!1}}(ne,ee),ie=function(){return function(){this._dirty||(this._root._deferred.liveQueries.push(this),this._dirty=!0)}}(),oe=function(){return function(t){var e=this.indexOf(this._isComponentQuery?t.instance:t.node);-1!==e&&this.splice(e,1)}}(),se=function(t,e,n,r,i,o){return function(s,a,u,c){var h
return h=[],t(h,{selector:{value:a},live:{value:u},_isComponentQuery:{value:c},_test:{value:e}}),u?(t(h,{cancel:{value:n},_root:{value:s},_sort:{value:r},_makeDirty:{value:i},_remove:{value:o},_dirty:{value:!1,writable:!0}}),h):h}}(u,Z,te,re,ie,oe),ae=function(t,e,n,r){return function(t,e){var n,i
return this.el?(e=e||{},n=this._liveQueries,(i=n[t])?e&&e.live?i:i.slice():(i=r(this,t,!!e.live,!1),i.live&&(n.push(t),n[t]=i),this.fragment.findAll(t,i),i)):[]}}(M,Y,u,se),ue=function(){return function(t){return this.fragment.findComponent(t)}}(),ce=function(t,e,n,r){return function(t,e){var n,i
return e=e||{},n=this._liveComponentQueries,(i=n[t])?e&&e.live?i:i.slice():(i=r(this,t,!!e.live,!0),i.live&&(n.push(t),n[t]=i),this.fragment.findAllComponents(t,i),i)}}(M,Y,u,se),he=function(){return function(t){var e
return"undefined"!=typeof window&&document&&t?t.nodeType?t:"string"==typeof t&&(e=document.getElementById(t),!e&&document.querySelector&&(e=document.querySelector(t)),e&&e.nodeType)?e:t[0]&&t[0].nodeType?t[0]:null:null}}(),fe=function(t,e){return function(n,r){var i,o,s,a,u
if(n.owner=r.owner,s=n.owner.parentFragment,n.root=r.root,n.pNode=r.pNode,n.contextStack=r.contextStack||[],n.owner.type===t.SECTION&&(n.index=r.index),s&&(a=s.indexRefs)){n.indexRefs=e(null)
for(u in a)n.indexRefs[u]=a[u]}for(n.priority=s?s.priority+1:1,r.indexRef&&(n.indexRefs||(n.indexRefs={}),n.indexRefs[r.indexRef]=r.index),n.items=[],i=r.descriptor?r.descriptor.length:0,o=0;i>o;o+=1)n.items[n.items.length]=n.createItem({parentFragment:n,descriptor:r.descriptor[o],index:o})}}(f,r),le=function(t){var e={}
return function(n,r,i){var o,s=[]
if(n)for(o=e[r]||(e[r]=t(r)),o.innerHTML=n;o.firstChild;)s[s.length]=o.firstChild,i.appendChild(o.firstChild)
return s}}(o),pe=function(t){var e,n,r
return n=/</g,r=/>/g,e=function(e,n){this.type=t.TEXT,this.descriptor=e.descriptor,n&&(this.node=document.createTextNode(e.descriptor),n.appendChild(this.node))},e.prototype={detach:function(){return this.node.parentNode.removeChild(this.node),this.node},teardown:function(t){t&&this.detach()},firstNode:function(){return this.node},toString:function(){return(""+this.descriptor).replace(n,"&lt;").replace(r,"&gt;")}},e}(f),de=function(t){return function(e){if(e.keypath)t(e)
else{var n=e.root._pendingResolution.indexOf(e);-1!==n&&e.root._pendingResolution.splice(n,1)}}}(z),ge=function(t,e,n,r,i){function o(t,e,r){var i,o,s
if(!a.test(t.toString()))return n(t,"_nowrap",{value:!0}),t
if(!t["_"+e._guid]){n(t,"_"+e._guid,{value:function(){var n,r,i,s
if(n=e._captured,n||(e._captured=[]),r=t.apply(e,arguments),e._captured.length)for(i=o.length;i--;)s=o[i],s.updateSoftDependencies(e._captured)
return e._captured=n,r},writable:!0})
for(i in t)t.hasOwnProperty(i)&&(t["_"+e._guid][i]=t[i])
t["_"+e._guid+"_evaluators"]=[]}return o=t["_"+e._guid+"_evaluators"],s=o.indexOf(r),-1===s&&o.push(r),t["_"+e._guid]}var s,a
return a=/this/,s=function(e,n,i,s,a){var u
this.evaluator=i,this.keypath=n,this.root=e,this.argNum=s,this.type=t.REFERENCE,this.priority=a,u=e.get(n),"function"==typeof u&&(u=o(u,e,i)),this.value=i.values[s]=u,r(this)},s.prototype={update:function(){var t=this.root.get(this.keypath)
"function"!=typeof t||t._nowrap||(t=o(t,this.root,this.evaluator)),e(t,this.value)||(this.evaluator.values[this.argNum]=t,this.evaluator.bubble(),this.value=t)},teardown:function(){i(this)}},s}(f,k,a,K,z),ve=function(t,e,n){var r=function(t,n,r){this.root=t,this.keypath=n,this.priority=r.priority,this.evaluator=r,e(this)}
return r.prototype={update:function(){var e=this.root.get(this.keypath)
t(e,this.value)||(this.evaluator.bubble(),this.value=e)},teardown:function(){n(this)}},r}(k,K,z),me=function(t,e,n,r,i,o,s,a,u){function c(t,e){var n,r
if(t=t.replace(/\$\{([0-9]+)\}/g,"_$1"),f[t])return f[t]
for(r=[];e--;)r[e]="_"+e
return n=new Function(r.join(","),"return("+t+")"),f[t]=n,n}var h,f={}
return h=function(t,e,n,r,i){var o,s
for(this.root=t,this.keypath=e,this.priority=i,this.fn=c(n,r.length),this.values=[],this.refs=[],o=r.length;o--;)(s=r[o])?s[0]?this.values[o]=s[1]:this.refs[this.refs.length]=new a(t,s[1],this,o,i):this.values[o]=void 0
this.selfUpdating=this.refs.length<=1,this.update()},h.prototype={bubble:function(){this.selfUpdating?this.update():this.deferred||(this.root._deferred.evals.push(this),this.deferred=!0)},update:function(){var e
if(this.evaluating)return this
this.evaluating=!0
try{e=this.fn.apply(null,this.values)}catch(i){if(this.root.debug)throw i
e=void 0}return t(e,this.value)||(n(this.root,this.keypath),this.root._cache[this.keypath]=e,s(this.root,this.keypath,e,!0),this.value=e,r(this.root,this.keypath)),this.evaluating=!1,this},teardown:function(){for(;this.refs.length;)this.refs.pop().teardown()
n(this.root,this.keypath),this.root._evaluators[this.keypath]=null},refresh:function(){this.selfUpdating||(this.deferred=!0)
for(var t=this.refs.length;t--;)this.refs[t].update()
this.deferred&&(this.update(),this.deferred=!1)},updateSoftDependencies:function(t){var e,n,r
for(this.softRefs||(this.softRefs=[]),e=this.softRefs.length;e--;)r=this.softRefs[e],t[r.keypath]||(this.softRefs.splice(e,1),this.softRefs[r.keypath]=!1,r.teardown())
for(e=t.length;e--;)n=t[e],this.softRefs[n]||(r=new u(this.root,n,this),this.softRefs[this.softRefs.length]=r,this.softRefs[n]=!0)
this.selfUpdating=this.refs.length+this.softRefs.length<=1}},h}(k,a,p,y,K,z,E,ge,ve),ye=function(t,e){var n=function(e,n,r,i){var o,s
s=this.root=e.root,o=t(s,n,r),void 0!==o?e.resolveRef(i,!1,o):(this.ref=n,this.argNum=i,this.resolver=e,this.contextStack=r,s._pendingResolution[s._pendingResolution.length]=this)}
return n.prototype={resolve:function(t){this.keypath=t,this.resolver.resolveRef(this.argNum,!1,t)},teardown:function(){this.keypath||e(this)}},n}(S,de),be=function(){var t=/^(?:(?:[a-zA-Z$_][a-zA-Z$_0-9]*)|(?:[0-9]|[1-9][0-9]+))$/
return function(e){var n,r,i
for(n=e.split("."),i=n.length;i--;)if(r=n[i],"undefined"===r||!t.test(r))return!1
return!0}}(),we=function(t,e){return function(n,r){var i,o
return i=n.replace(/\$\{([0-9]+)\}/g,function(t,e){return r[e]?r[e][1]:"undefined"}),o=t(i),e(o)?o:"${"+i.replace(/[\.\[\]]/g,"-")+"}"}}(c,be),Ee=function(t,e){function n(t,e,n){var i,o
if(i=t._depsMap[e])for(o=i.length;o--;)r(t,i[o],n)}function r(t,e,r){var i,o,s,a
for(i=t._deps.length;i--;)if(o=t._deps[i],o&&(s=o[e]))for(a=s.length;a--;)r.push(s[a])
n(t,e,r)}return function(n,i,o){var s,a,u
for(s=[],r(n,i,s),a=s.length;a--;)u=s[a],e(u),u.keypath=u.keypath.replace(i,o),t(u),u.update()}}(K,z),_e=function(t,e,n,r){var i=function(t){var n,r,i,o,s
if(this.root=t.root,this.mustache=t,this.args=[],this.scouts=[],n=t.descriptor.x,s=t.parentFragment.indexRefs,this.str=n.s,i=this.unresolved=this.args.length=n.r?n.r.length:0,!i)return this.resolved=this.ready=!0,void this.bubble()
for(r=0;i>r;r+=1)o=n.r[r],s&&void 0!==s[o]?this.resolveRef(r,!0,s[o]):this.scouts[this.scouts.length]=new e(this,o,t.contextStack,r)
this.ready=!0,this.bubble()}
return i.prototype={bubble:function(){var t
this.ready&&(t=this.keypath,this.keypath=n(this.str,this.args),"${"===this.keypath.substr(0,2)&&this.createEvaluator(),t?r(this.root,t,this.keypath):this.mustache.resolve(this.keypath))},teardown:function(){for(;this.scouts.length;)this.scouts.pop().teardown()},resolveRef:function(t,e,n){this.args[t]=[e,n],this.bubble(),this.resolved=!--this.unresolved},createEvaluator:function(){this.root._evaluators[this.keypath]?this.root._evaluators[this.keypath].refresh():this.root._evaluators[this.keypath]=new t(this.root,this.keypath,this.str,this.args,this.mustache.priority)}},i}(me,ye,we,Ee),xe=function(t,e){return function(n,r){var i,o,s
s=n.parentFragment=r.parentFragment,n.root=s.root,n.contextStack=s.contextStack,n.descriptor=r.descriptor,n.index=r.index||0,n.priority=s.priority,n.type=r.descriptor.t,r.descriptor.r&&(s.indexRefs&&void 0!==s.indexRefs[r.descriptor.r]?(o=s.indexRefs[r.descriptor.r],n.indexRef=r.descriptor.r,n.value=o,n.render(n.value)):(i=t(n.root,r.descriptor.r,n.contextStack),void 0!==i?n.resolve(i):(n.ref=r.descriptor.r,n.root._pendingResolution[n.root._pendingResolution.length]=n))),r.descriptor.x&&(n.expressionResolver=new e(n)),n.descriptor.n&&!n.hasOwnProperty("value")&&n.render(void 0)}}(S,_e),ke=function(t,e,n){return function(r){r!==this.keypath&&(this.registered&&n(this),this.keypath=r,e(this),this.update(),this.root.twoway&&this.parentFragment.owner.type===t.ATTRIBUTE&&this.parentFragment.owner.element.bind(),this.expressionResolver&&this.expressionResolver.resolved&&(this.expressionResolver=null))}}(f,K,z),Se=function(t){return function(){var e,n
n=this.root.get(this.keypath),(e=this.root._wrapped[this.keypath])&&(n=e.get()),t(n,this.value)||(this.render(n),this.value=n)}}(k),Ne=function(t,e,n,r,i){var o,s,a
return s=/</g,a=/>/g,o=function(e,r){this.type=t.INTERPOLATOR,r&&(this.node=document.createTextNode(""),r.appendChild(this.node)),n(this,e)},o.prototype={update:i,resolve:r,detach:function(){return this.node.parentNode.removeChild(this.node),this.node},teardown:function(t){t&&this.detach(),e(this)},render:function(t){this.node&&(this.node.data=void 0==t?"":t)},firstNode:function(){return this.node},toString:function(){var t=void 0!=this.value?""+this.value:""
return t.replace(s,"&lt;").replace(a,"&gt;")}},o}(f,de,xe,ke,Se),Oe=function(t,e,n){function r(t,e,n){var r,i,o
if(i=e.length,i<t.length)for(o=t.fragments.splice(i,t.length-i);o.length;)o.pop().teardown(!0)
else if(i>t.length)for(r=t.length;i>r;r+=1)n.contextStack=t.contextStack.concat(t.keypath+"."+r),n.index=r,t.descriptor.i&&(n.indexRef=t.descriptor.i),t.fragments[r]=t.createFragment(n)
t.length=i}function i(t,e,r){var i,o
o=t.fragmentsById||(t.fragmentsById=n(null))
for(i in o)void 0===e[i]&&o[i]&&(o[i].teardown(!0),o[i]=null)
for(i in e)void 0===e[i]||o[i]||(r.contextStack=t.contextStack.concat(t.keypath+"."+i),r.index=i,t.descriptor.i&&(r.indexRef=t.descriptor.i),o[i]=t.createFragment(r))}function o(t,e){t.length||(e.contextStack=t.contextStack.concat(t.keypath),e.index=0,t.fragments[0]=t.createFragment(e),t.length=1)}function s(e,n,r,i){var o,s,a,u
if(s=t(n)&&0===n.length,o=r?s||!n:n&&!s){if(e.length||(i.contextStack=e.contextStack,i.index=0,e.fragments[0]=e.createFragment(i),e.length=1),e.length>1)for(a=e.fragments.splice(1);u=a.pop();)u.teardown(!0)}else e.length&&(e.teardownFragments(!0),e.length=0)}return function(n,a){var u
return u={descriptor:n.descriptor.f,root:n.root,pNode:n.parentFragment.pNode,owner:n},n.descriptor.n?void s(n,a,!0,u):void(t(a)?r(n,a,u):e(a)?n.descriptor.i?i(n,a,u):o(n,u):s(n,a,!1,u))}}(l,x,r),Te=function(t,e,n){function r(e,n,s,a,u,c,h){var f,l,p,d
if(!e.html){for(e.indexRefs&&void 0!==e.indexRefs[n]&&(e.indexRefs[n]=a),f=e.contextStack.length;f--;)p=e.contextStack[f],p.substr(0,c.length)===c&&(e.contextStack[f]=p.replace(c,h))
for(f=e.items.length;f--;)switch(l=e.items[f],l.type){case t.ELEMENT:i(l,n,s,a,u,c,h)
break
case t.PARTIAL:r(l.fragment,n,s,a,u,c,h)
break
case t.COMPONENT:r(l.instance.fragment,n,s,a,u,c,h),(d=e.root._liveComponentQueries[l.name])&&d._makeDirty()
break
case t.SECTION:case t.INTERPOLATOR:case t.TRIPLE:o(l,n,s,a,u,c,h)}}}function i(t,e,n,i,o,s,a){var u,c,h,f,l,p,d,g,v,m
for(u=t.attributes.length;u--;)c=t.attributes[u],c.fragment&&(r(c.fragment,e,n,i,o,s,a),c.twoway&&c.updateBindings())
if(h=t.node._ractive){h.keypath.substr(0,s.length)===s&&(h.keypath=h.keypath.replace(s,a)),void 0!==e&&(h.index[e]=i)
for(f in h.events)for(l=h.events[f].proxies,u=l.length;u--;)p=l[u],"object"==typeof p.n&&r(p.a,e,n,i,o,s,a),p.d&&r(p.d,e,n,i,o,s,a);(d=h.binding)&&d.keypath.substr(0,s.length)===s&&(g=h.root._twowayBindings[d.keypath],g.splice(g.indexOf(d),1),d.keypath=d.keypath.replace(s,a),g=h.root._twowayBindings[d.keypath]||(h.root._twowayBindings[d.keypath]=[]),g.push(d))}if(t.fragment&&r(t.fragment,e,n,i,o,s,a),v=t.liveQueries)for(m=t.root,u=v.length;u--;)m._liveQueries[v[u]]._makeDirty()}function o(t,e,i,o,s,a,u){var c
if(t.descriptor.x&&(t.expressionResolver&&t.expressionResolver.teardown(),t.expressionResolver=new n(t)),t.keypath?t.keypath.substr(0,a.length)===a&&t.resolve(t.keypath.replace(a,u)):t.indexRef===e&&(t.value=o,t.render(o)),t.fragments)for(c=t.fragments.length;c--;)r(t.fragments[c],e,i,o,s,a,u)}return r}(f,z,_e),Ae=function(t,e,n){return function(t,r,i,o,s){var a,u,c,h,f,l,p
for(c=r.descriptor.i,a=i;o>a;a+=1)u=r.fragments[a],h=a-s,f=a,l=r.keypath+"."+(a-s),p=r.keypath+"."+a,u.index+=s,e(u,c,h,f,s,l,p)
n(t)}}(f,Te,g),Re=function(t){return function(e){var n,r,i,o,s,a,u,c,h,f,l=this
if(n=this.parentFragment,a=[],e.forEach(function(e,n){var o,s,c
return e===n?void(a[e]=l.fragments[n]):(void 0===r&&(r=n),-1===e?void(u||(u=[])).push(l.fragments[n]):(o=e-n,s=l.keypath+"."+n,c=l.keypath+"."+e,t(l.fragments[n],l.descriptor.i,n,e,o,s,c),a[e]=l.fragments[n],void(i=!0)))}),u)for(;h=u.pop();)h.teardown(!0)
if(void 0===r&&(r=this.length),s=this.root.get(this.keypath).length,s!==r){for(c={descriptor:this.descriptor.f,root:this.root,pNode:n.pNode,owner:this},this.descriptor.i&&(c.indexRef=this.descriptor.i),o=r;s>o;o+=1)(h=a[o])?this.docFrag.appendChild(h.detach(!1)):(c.contextStack=this.contextStack.concat(this.keypath+"."+o),c.index=o,h=this.createFragment(c)),this.fragments[o]=h
f=n.findNextNode(this),n.pNode.insertBefore(this.docFrag,f),this.length=s}}}(Te),Ce=function(){return[]}(),Ie=function(t,e,n,r,i,o,s,a,u,c,h){var f,l
return h.push(function(){l=h.DomFragment}),f=function(e,r){this.type=t.SECTION,this.inverted=!!e.descriptor.n,this.fragments=[],this.length=0,r&&(this.docFrag=document.createDocumentFragment()),this.initialising=!0,n(this,e),r&&r.appendChild(this.docFrag),this.initialising=!1},f.prototype={update:r,resolve:i,smartUpdate:function(t,e){var n;("push"===t||"unshift"===t||"splice"===t)&&(n={descriptor:this.descriptor.f,root:this.root,pNode:this.parentFragment.pNode,owner:this},this.descriptor.i&&(n.indexRef=this.descriptor.i)),this[t]&&(this.rendering=!0,this[t](n,e),this.rendering=!1)},pop:function(){this.length&&(this.fragments.pop().teardown(!0),this.length-=1)},push:function(t,e){var n,r,i
for(n=this.length,r=n+e.length,i=n;r>i;i+=1)t.contextStack=this.contextStack.concat(this.keypath+"."+i),t.index=i,this.fragments[i]=this.createFragment(t)
this.length+=e.length,this.parentFragment.pNode.insertBefore(this.docFrag,this.parentFragment.findNextNode(this))},shift:function(){this.splice(null,[0,1])},unshift:function(t,e){this.splice(t,[0,0].concat(new Array(e.length)))},splice:function(t,e){var n,r,i,o,s,u,c,h,f
if(e.length&&(u=+(e[0]<0?this.length+e[0]:e[0]),r=Math.max(0,e.length-2),i=void 0!==e[1]?e[1]:this.length-u,i=Math.min(i,this.length-u),o=r-i)){if(0>o){for(c=u-o,s=u;c>s;s+=1)this.fragments[s].teardown(!0)
this.fragments.splice(u,-o)}else{for(c=u+o,n=this.fragments[u]?this.fragments[u].firstNode():this.parentFragment.findNextNode(this),h=[u,0].concat(new Array(o)),this.fragments.splice.apply(this.fragments,h),s=u;c>s;s+=1)t.contextStack=this.contextStack.concat(this.keypath+"."+s),t.index=s,this.fragments[s]=this.createFragment(t)
this.parentFragment.pNode.insertBefore(this.docFrag,n)}this.length+=o,f=u+r,a(this.root,this,f,this.length,o)}},merge:u,detach:function(){var t,e
for(e=this.fragments.length,t=0;e>t;t+=1)this.docFrag.appendChild(this.fragments[t].detach())
return this.docFrag},teardown:function(t){this.teardownFragments(t),c(this)},firstNode:function(){return this.fragments[0]?this.fragments[0].firstNode():this.parentFragment.findNextNode(this)},findNextNode:function(t){return this.fragments[t.index+1]?this.fragments[t.index+1].firstNode():this.parentFragment.findNextNode(this)},teardownFragments:function(t){for(var e,n;n=this.fragments.shift();)n.teardown(t)
if(this.fragmentsById)for(e in this.fragmentsById)this.fragments[e]&&(this.fragmentsById[e].teardown(t),this.fragmentsById[e]=null)},render:function(t){var n,r;(r=this.root._wrapped[this.keypath])&&(t=r.get()),this.rendering||(this.rendering=!0,o(this,t),this.rendering=!1,(!this.docFrag||this.docFrag.childNodes.length)&&!this.initialising&&e&&(n=this.parentFragment.findNextNode(this),n&&n.parentNode===this.parentFragment.pNode?this.parentFragment.pNode.insertBefore(this.docFrag,n):this.parentFragment.pNode.appendChild(this.docFrag)))},createFragment:function(t){var e=new l(t)
return this.docFrag&&this.docFrag.appendChild(e.docFrag),e},toString:function(){var t,e,n,r
for(t="",e=0,r=this.length,e=0;r>e;e+=1)t+=this.fragments[e].toString()
if(this.fragmentsById)for(n in this.fragmentsById)this.fragmentsById[n]&&(t+=this.fragmentsById[n].toString())
return t},find:function(t){var e,n,r
for(n=this.fragments.length,e=0;n>e;e+=1)if(r=this.fragments[e].find(t))return r
return null},findAll:function(t,e){var n,r
for(r=this.fragments.length,n=0;r>n;n+=1)this.fragments[n].findAll(t,e)},findComponent:function(t){var e,n,r
for(n=this.fragments.length,e=0;n>e;e+=1)if(r=this.fragments[e].findComponent(t))return r
return null},findAllComponents:function(t,e){var n,r
for(r=this.fragments.length,n=0;r>n;n+=1)this.fragments[n].findAllComponents(t,e)}},f}(f,s,xe,Se,ke,Oe,Te,Ae,Re,de,Ce),Le=function(t,e,n,r,i,o,s){var a=function(e,r){this.type=t.TRIPLE,r&&(this.nodes=[],this.docFrag=document.createDocumentFragment()),this.initialising=!0,n(this,e),r&&r.appendChild(this.docFrag),this.initialising=!1}
return a.prototype={update:r,resolve:i,detach:function(){for(var t=this.nodes.length;t--;)this.docFrag.appendChild(this.nodes[t])
return this.docFrag},teardown:function(t){t&&(this.detach(),this.docFrag=this.nodes=null),s(this)},firstNode:function(){return this.nodes[0]?this.nodes[0]:this.parentFragment.findNextNode(this)},render:function(t){var e,n
if(this.nodes){for(;this.nodes.length;)e=this.nodes.pop(),e.parentNode.removeChild(e)
if(!t)return void(this.nodes=[])
n=this.parentFragment.pNode,this.nodes=o(t,n.tagName,this.docFrag),this.initialising||n.insertBefore(this.docFrag,this.parentFragment.findNextNode(this))}},toString:function(){return void 0!=this.value?this.value:""},find:function(t){var n,r,i,o
for(r=this.nodes.length,n=0;r>n;n+=1)if(i=this.nodes[n],1===i.nodeType){if(e(i,t))return i
if(o=i.querySelector(t))return o}return null},findAll:function(t,n){var r,i,o,s,a,u
for(i=this.nodes.length,r=0;i>r;r+=1)if(o=this.nodes[r],1===o.nodeType&&(e(o,t)&&n.push(o),s=o.querySelectorAll(t)))for(a=s.length,u=0;a>u;u+=1)n.push(s[u])}},a}(f,Y,xe,Se,ke,le,de),je=function(t){return function(e,n){return e.a&&e.a.xmlns?e.a.xmlns:"svg"===e.e?t.svg:n.namespaceURI||t.html}}(i),Me=function(){var t,e,n,r
return t="altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern".split(" "),e="attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" "),n=function(t){for(var e={},n=t.length;n--;)e[t[n].toLowerCase()]=t[n]
return e},r=n(t.concat(e)),function(t){var e=t.toLowerCase()
return r[e]||e}}(),Pe=function(t,e){return function(n,r){var i,o
if(i=r.indexOf(":"),-1===i||(o=r.substr(0,i),"xmlns"===o))n.name=n.element.namespace!==t.html?e(r):r,n.lcName=n.name.toLowerCase()
else if(r=r.substring(i+1),n.name=e(r),n.lcName=n.name.toLowerCase(),n.namespace=t[o.toLowerCase()],!n.namespace)throw'Unknown namespace ("'+o+'")'}}(i,Me),Fe=function(t){return function(e,n){var r,i=null===n.value?"":n.value;(r=n.pNode)&&(e.namespace?r.setAttributeNS(e.namespace,n.name,i):"style"===n.name&&r.style.setAttribute?r.style.setAttribute("cssText",i):"class"!==n.name||r.namespaceURI&&r.namespaceURI!==t.html?r.setAttribute(n.name,i):r.className=i,"id"===e.name&&(n.root.nodes[n.value]=r),"value"===e.name&&(r._ractive.value=n.value)),e.value=n.value}}(i),Be=function(t){var e={"accept-charset":"acceptCharset",accesskey:"accessKey",bgcolor:"bgColor","class":"className",codebase:"codeBase",colspan:"colSpan",contenteditable:"contentEditable",datetime:"dateTime",dirname:"dirName","for":"htmlFor","http-equiv":"httpEquiv",ismap:"isMap",maxlength:"maxLength",novalidate:"noValidate",pubdate:"pubDate",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",usemap:"useMap"}
return function(n,r){var i
!n.pNode||n.namespace||r.pNode.namespaceURI&&r.pNode.namespaceURI!==t.html||(i=e[n.name]||n.name,void 0!==r.pNode[i]&&(n.propertyName=i),("boolean"==typeof r.pNode[i]||"value"===i)&&(n.useProperty=!0))}}(i),De=function(t,e,n,r){var i,o,s,a,u,c,h,f,l,p,d,g,v,m
return i=function(){var t,e,n,r=this.pNode
return this.fragment&&(t=o(this))?(this.interpolator=t,this.keypath=t.keypath||t.descriptor.r,(e=u(this))?(r._ractive.binding=this.element.binding=e,this.twoway=!0,n=this.root._twowayBindings[this.keypath]||(this.root._twowayBindings[this.keypath]=[]),n[n.length]=e,!0):!1):!1},s=function(){this._ractive.binding.update()},a=function(){var t=this._ractive.root.get(this._ractive.binding.keypath)
this.value=void 0==t?"":t},o=function(n){var r,i
return 1!==n.fragment.items.length?null:(r=n.fragment.items[0],r.type!==t.INTERPOLATOR?null:r.keypath||r.ref?r.keypath&&"${"===r.keypath.substr(0,2)?(i="You cannot set up two-way binding against an expression "+r.keypath,n.root.debug&&e(i),null):r:null)},u=function(t){var n=t.pNode
if("SELECT"===n.tagName)return n.multiple?new h(t,n):new f(t,n)
if("checkbox"===n.type||"radio"===n.type){if("name"===t.propertyName){if("checkbox"===n.type)return new p(t,n)
if("radio"===n.type)return new l(t,n)}return"checked"===t.propertyName?new d(t,n):null}return"value"!==t.lcName&&e("This is... odd"),"file"===n.type?new g(t,n):n.getAttribute("contenteditable")?new v(t,n):new m(t,n)},h=function(t,e){var n
c(this,t,e),e.addEventListener("change",s,!1),n=this.root.get(this.keypath),void 0===n&&this.update()},h.prototype={value:function(){var t,e,n,r
for(t=[],e=this.node.options,r=e.length,n=0;r>n;n+=1)e[n].selected&&(t[t.length]=e[n]._ractive.value)
return t},update:function(){var t,e,r
return t=this.attr,e=t.value,r=this.value(),void 0!==e&&n(r,e)||(t.receiving=!0,t.value=r,this.root.set(this.keypath,r),t.receiving=!1),this},deferUpdate:function(){this.deferred!==!0&&(this.root._deferred.attrs.push(this),this.deferred=!0)},teardown:function(){this.node.removeEventListener("change",s,!1)}},f=function(t,e){var n
c(this,t,e),e.addEventListener("change",s,!1),n=this.root.get(this.keypath),void 0===n&&this.update()},f.prototype={value:function(){var t,e,n
for(t=this.node.options,n=t.length,e=0;n>e;e+=1)if(t[e].selected)return t[e]._ractive.value},update:function(){var t=this.value()
return this.attr.receiving=!0,this.attr.value=t,this.root.set(this.keypath,t),this.attr.receiving=!1,this},deferUpdate:function(){this.deferred!==!0&&(this.root._deferred.attrs.push(this),this.deferred=!0)},teardown:function(){this.node.removeEventListener("change",s,!1)}},l=function(t,e){var n
this.radioName=!0,c(this,t,e),e.name="{{"+t.keypath+"}}",e.addEventListener("change",s,!1),e.attachEvent&&e.addEventListener("click",s,!1),n=this.root.get(this.keypath),void 0!==n?e.checked=n==e._ractive.value:this.root._deferred.radios.push(this)},l.prototype={value:function(){return this.node._ractive?this.node._ractive.value:this.node.value},update:function(){var t=this.node
t.checked&&(this.attr.receiving=!0,this.root.set(this.keypath,this.value()),this.attr.receiving=!1)},teardown:function(){this.node.removeEventListener("change",s,!1),this.node.removeEventListener("click",s,!1)}},p=function(t,e){var n,r
this.checkboxName=!0,c(this,t,e),e.name="{{"+this.keypath+"}}",e.addEventListener("change",s,!1),e.attachEvent&&e.addEventListener("click",s,!1),n=this.root.get(this.keypath),void 0!==n?(r=-1!==n.indexOf(e._ractive.value),e.checked=r):-1===this.root._deferred.checkboxes.indexOf(this.keypath)&&this.root._deferred.checkboxes.push(this.keypath)},p.prototype={changed:function(){return this.node.checked!==!!this.checked},update:function(){this.checked=this.node.checked,this.attr.receiving=!0,this.root.set(this.keypath,r(this.root,this.keypath)),this.attr.receiving=!1},teardown:function(){this.node.removeEventListener("change",s,!1),this.node.removeEventListener("click",s,!1)}},d=function(t,e){c(this,t,e),e.addEventListener("change",s,!1),e.attachEvent&&e.addEventListener("click",s,!1)},d.prototype={value:function(){return this.node.checked},update:function(){this.attr.receiving=!0,this.root.set(this.keypath,this.value()),this.attr.receiving=!1},teardown:function(){this.node.removeEventListener("change",s,!1),this.node.removeEventListener("click",s,!1)}},g=function(t,e){c(this,t,e),e.addEventListener("change",s,!1)},g.prototype={value:function(){return this.attr.pNode.files},update:function(){this.attr.root.set(this.attr.keypath,this.value())},teardown:function(){this.node.removeEventListener("change",s,!1)}},v=function(t,e){c(this,t,e),e.addEventListener("change",s,!1),this.root.lazy||(e.addEventListener("input",s,!1),e.attachEvent&&e.addEventListener("keyup",s,!1))},v.prototype={update:function(){this.attr.receiving=!0,this.root.set(this.keypath,this.node.innerHTML),this.attr.receiving=!1},teardown:function(){this.node.removeEventListener("change",s,!1),this.node.removeEventListener("input",s,!1),this.node.removeEventListener("keyup",s,!1)}},m=function(t,e){c(this,t,e),e.addEventListener("change",s,!1),this.root.lazy||(e.addEventListener("input",s,!1),e.attachEvent&&e.addEventListener("keyup",s,!1)),this.node.addEventListener("blur",a,!1)},m.prototype={value:function(){var t=this.attr.pNode.value
return+t+""===t&&-1===t.indexOf("e")&&(t=+t),t},update:function(){var t=this.attr,e=this.value()
t.receiving=!0,t.root.set(t.keypath,e),t.receiving=!1},teardown:function(){this.node.removeEventListener("change",s,!1),this.node.removeEventListener("input",s,!1),this.node.removeEventListener("keyup",s,!1),this.node.removeEventListener("blur",a,!1)}},c=function(t,e,n){t.attr=e,t.node=n,t.root=e.root,t.keypath=e.keypath},i}(f,M,C,d),Ue=function(t,e){var n,r,i,o,s,a,u,c,h,f,l,p
return n=function(){var t
if(!this.ready)return this
if(t=this.pNode,"SELECT"===t.tagName&&"value"===this.lcName)return this.update=i,this.deferredUpdate=o,this.update()
if(this.isFileInputValue)return this.update=r,this
if(this.twoway&&"name"===this.lcName){if("radio"===t.type)return this.update=u,this.update()
if("checkbox"===t.type)return this.update=c,this.update()}return"style"===this.lcName&&t.style.setAttribute?(this.update=h,this.update()):"class"!==this.lcName||t.namespaceURI&&t.namespaceURI!==e.html?t.getAttribute("contenteditable")&&"value"===this.lcName?(this.update=l,this.update()):(this.update=p,this.update()):(this.update=f,this.update())},r=function(){return this},o=function(){this.deferredUpdate=this.pNode.multiple?a:s,this.deferredUpdate()},i=function(){return this.root._deferred.selectValues.push(this),this},s=function(){var t,e,n,r=this.fragment.getValue()
for(this.value=this.pNode._ractive.value=r,t=this.pNode.options,n=t.length;n--;)if(e=t[n],e._ractive.value==r)return e.selected=!0,this
return this},a=function(){var e,n,r=this.fragment.getValue()
for(t(r)||(r=[r]),e=this.pNode.options,n=e.length;n--;)e[n].selected=-1!==r.indexOf(e[n]._ractive.value)
return this.value=r,this},u=function(){var t,e
return t=this.pNode,e=this.fragment.getValue(),t.checked=e==t._ractive.value,this},c=function(){var e,n
return e=this.pNode,n=this.fragment.getValue(),t(n)?(e.checked=-1!==n.indexOf(e._ractive.value),this):(e.checked=n==e._ractive.value,this)},h=function(){var t,e
return t=this.pNode,e=this.fragment.getValue(),void 0===e&&(e=""),e!==this.value&&(t.style.setAttribute("cssText",e),this.value=e),this},f=function(){var t,e
return t=this.pNode,e=this.fragment.getValue(),void 0===e&&(e=""),e!==this.value&&(t.className=e,this.value=e),this},l=function(){var t,e
return t=this.pNode,e=this.fragment.getValue(),void 0===e&&(e=""),e!==this.value&&(this.receiving||(t.innerHTML=e),this.value=e),this},p=function(){var t,e
if(t=this.pNode,e=this.fragment.getValue(),this.isValueAttribute&&(t._ractive.value=e),void 0===e&&(e=""),e!==this.value){if(this.useProperty)return this.receiving||(t[this.propertyName]=e),this.value=e,this
if(this.namespace)return t.setAttributeNS(this.namespace,this.name,e),this.value=e,this
"id"===this.lcName&&(void 0!==this.value&&(this.root.nodes[this.value]=void 0),this.root.nodes[e]=t),t.setAttribute(this.name,e),this.value=e}return this},n}(l,i),qe=function(){return function(t){var e
return e=this.str.substr(this.pos,t.length),e===t?(this.pos+=t.length,t):null}}(),We=function(){var t=/^\s+/
return function(){var e=t.exec(this.remaining())
return e?(this.pos+=e[0].length,e[0]):null}}(),Ke=function(){return function(t){return function(e){var n=t.exec(e.str.substring(e.pos))
return n?(e.pos+=n[0].length,n[1]||n[0]):null}}}(),ze=function(){function t(t){var e
return t.getStringMatch("\\")?(e=t.str.charAt(t.pos),t.pos+=1,e):null}return function(e){var n,r=""
for(n=t(e);n;)r+=n,n=t(e)
return r||null}}(),Ve=function(t,e){var n=t(/^[^\\"]+/),r=t(/^[^\\']+/)
return function i(t,o){var s,a,u,c,h,f
if(s=t.pos,a="",f=o?r:n,u=e(t),u&&(a+=u),c=f(t),c&&(a+=c),!a)return""
for(h=i(t,o);""!==h;)a+=h
return a}}(Ke,ze),He=function(t,e){return function(n){var r,i
return r=n.pos,n.getStringMatch('"')?(i=e(n,!1),n.getStringMatch('"')?{t:t.STRING_LITERAL,v:i}:(n.pos=r,null)):n.getStringMatch("'")?(i=e(n,!0),n.getStringMatch("'")?{t:t.STRING_LITERAL,v:i}:(n.pos=r,null)):null}}(f,Ve),Je=function(t,e){var n=e(/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/)
return function(e){var r
return(r=n(e))?{t:t.NUMBER_LITERAL,v:r}:null}}(f,Ke),$e=function(t){return t(/^[a-zA-Z_$][a-zA-Z_$0-9]*/)}(Ke),Ge=function(t,e,n){var r=/^[a-zA-Z_$][a-zA-Z_$0-9]*$/
return function(i){var o
return(o=t(i))?r.test(o.v)?o.v:'"'+o.v.replace(/"/g,'\\"')+'"':(o=e(i))?o.v:(o=n(i))?o:void 0}}(He,Je,$e),Xe=function(t,e,n,r){function i(t){var e,n,i
return t.allowWhitespace(),(e=r(t))?(i={key:e},t.allowWhitespace(),t.getStringMatch(":")?(t.allowWhitespace(),(n=t.getToken())?(i.value=n.v,i):null):null):null}var o,s,a,u,c,h
return s={"true":!0,"false":!1,undefined:void 0,"null":null},a=new RegExp("^(?:"+Object.keys(s).join("|")+")"),u=/^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/,c=/\$\{([^\}]+)\}/g,h=/^\$\{([^\}]+)\}/,o=function(t,e){this.str=t,this.values=e,this.pos=0,this.result=this.getToken()},o.prototype={remaining:function(){return this.str.substring(this.pos)},getStringMatch:t,getToken:function(){return this.allowWhitespace(),this.getPlaceholder()||this.getSpecial()||this.getNumber()||this.getString()||this.getObject()||this.getArray()},getPlaceholder:function(){var t
return this.values?(t=h.exec(this.remaining()))&&this.values.hasOwnProperty(t[1])?(this.pos+=t[0].length,{v:this.values[t[1]]}):void 0:null},getSpecial:function(){var t
return(t=a.exec(this.remaining()))?(this.pos+=t[0].length,{v:s[t[0]]}):void 0},getNumber:function(){var t
return(t=u.exec(this.remaining()))?(this.pos+=t[0].length,{v:+t[0]}):void 0},getString:function(){var t,e=n(this)
return e&&(t=this.values)?{v:e.v.replace(c,function(e,n){return t[n]||n})}:e},getObject:function(){var t,e
if(!this.getStringMatch("{"))return null
for(t={};e=i(this);){if(t[e.key]=e.value,this.allowWhitespace(),this.getStringMatch("}"))return{v:t}
if(!this.getStringMatch(","))return null}return null},getArray:function(){var t,e
if(!this.getStringMatch("["))return null
for(t=[];e=this.getToken();){if(t.push(e.v),this.getStringMatch("]"))return{v:t}
if(!this.getStringMatch(","))return null}return null},allowWhitespace:e},function(t,e){var n=new o(t,e)
return n.result?{value:n.result.v,remaining:n.remaining()}:null}}(qe,We,He,Ge),Qe=function(t,e,n,r,i){function o(t){return"string"==typeof t?t:JSON.stringify(t)}var s=function(e){this.type=t.INTERPOLATOR,n(this,e)}
return s.prototype={update:r,resolve:i,render:function(t){this.value=t,this.parentFragment.bubble()},teardown:function(){e(this)},toString:function(){return void 0==this.value?"":o(this.value)}},s}(f,de,xe,Se,ke),Ye=function(t,e,n,r,i,o,s){var a,u
return s.push(function(){u=s.StringFragment}),a=function(n){this.type=t.SECTION,this.fragments=[],this.length=0,e(this,n)},a.prototype={update:n,resolve:r,teardown:function(){this.teardownFragments(),o(this)},teardownFragments:function(){for(;this.fragments.length;)this.fragments.shift().teardown()
this.length=0},bubble:function(){this.value=this.fragments.join(""),this.parentFragment.bubble()},render:function(t){var e;(e=this.root._wrapped[this.keypath])&&(t=e.get()),i(this,t),this.parentFragment.bubble()},createFragment:function(t){return new u(t)},toString:function(){return this.fragments.join("")}},a}(f,xe,Se,ke,Oe,de,Ce),Ze=function(t){var e=function(e){this.type=t.TEXT,this.text=e}
return e.prototype={toString:function(){return this.text},teardown:function(){}},e}(f),tn=function(t,e){return function(){var n,r,i,o,s,a,u
if(!this.argsList||this.dirty){if(n={},r=0,o=this.root._guid,u=function(t){return t.map(function(t){var e,i,s
return t.text?t.text:t.fragments?t.fragments.map(function(t){return u(t.items)}).join(""):(e=o+"-"+r++,s=(i=t.root._wrapped[t.keypath])?i.value:t.value,n[e]=s,"${"+e+"}")}).join("")},i=u(this.items),a=e("["+i+"]",n))this.argsList=a.value
else{if(s="Could not parse directive arguments ("+this.toString()+"). If you think this is a bug, please file an issue at http://github.com/RactiveJS/Ractive/issues",this.root.debug)throw new Error(s)
t(s),this.argsList=[i]}this.dirty=!1}return this.argsList}}(M,Xe),en=function(t,e,n,r,i,o,s,a){var u=function(t){n(this,t)}
return u.prototype={createItem:function(e){if("string"==typeof e.descriptor)return new o(e.descriptor)
switch(e.descriptor.t){case t.INTERPOLATOR:return new r(e)
case t.TRIPLE:return new r(e)
case t.SECTION:return new i(e)
default:throw"Something went wrong in a rather interesting way"}},bubble:function(){this.dirty=!0,this.owner.bubble()},teardown:function(){var t,e
for(t=this.items.length,e=0;t>e;e+=1)this.items[e].teardown()},getValue:function(){var e
return 1===this.items.length&&this.items[0].type===t.INTERPOLATOR&&(e=this.items[0].value,void 0!==e)?e:this.toString()},isSimple:function(){var e,n,r
if(void 0!==this.simple)return this.simple
for(e=this.items.length;e--;)if(n=this.items[e],n.type!==t.TEXT){if(n.type!==t.INTERPOLATOR)return this.simple=!1
if(r)return!1
r=!0}return this.simple=!0},toString:function(){return this.items.join("")},toJSON:function(){var t,n=this.getValue()
return"string"==typeof n&&(t=e(n),n=t?t.value:n),n},toArgsList:s},a.StringFragment=u,u}(f,Xe,fe,Qe,Ye,Ze,tn,Ce),nn=function(t,e,n,r,i,o,s){var a=function(i){return this.type=t.ATTRIBUTE,this.element=i.element,e(this,i.name),null===i.value||"string"==typeof i.value?void n(this,i):(this.root=i.root,this.pNode=i.pNode,this.parentFragment=this.element.parentFragment,this.fragment=new s({descriptor:i.value,root:this.root,owner:this,contextStack:i.contextStack}),void(this.pNode&&("value"===this.name&&(this.isValueAttribute=!0,"INPUT"===this.pNode.tagName&&"file"===this.pNode.type&&(this.isFileInputValue=!0)),r(this,i),this.selfUpdating=this.fragment.isSimple(),this.ready=!0)))}
return a.prototype={bind:i,update:o,updateBindings:function(){this.keypath=this.interpolator.keypath||this.interpolator.ref,"name"===this.propertyName&&(this.pNode.name="{{"+this.keypath+"}}")},teardown:function(){var t
if(this.boundEvents)for(t=this.boundEvents.length;t--;)this.pNode.removeEventListener(this.boundEvents[t],this.updateModel,!1)
this.fragment&&this.fragment.teardown()},bubble:function(){this.selfUpdating?this.update():!this.deferred&&this.ready&&(this.root._deferred.attrs.push(this),this.deferred=!0)},toString:function(){var t
return null===this.value?this.name:this.fragment?(t=this.fragment.toString(),this.name+"="+JSON.stringify(t)):this.name+"="+JSON.stringify(this.value)}},a}(f,Pe,Fe,Be,De,Ue,en),rn=function(t){return function(e,n){var r,i,o
e.attributes=[]
for(r in n)n.hasOwnProperty(r)&&(i=n[r],o=new t({element:e,name:r,value:i,root:e.root,pNode:e.node,contextStack:e.parentFragment.contextStack}),e.attributes[e.attributes.length]=e.attributes[r]=o,"name"!==r&&o.update())
return e.attributes}}(nn),on=function(t,e,n,r){var i,o,s
return r.push(function(){i=r.DomFragment}),o=function(){var t=this.node,e=this.fragment.toString()
t.styleSheet&&(t.styleSheet.cssText=e),t.innerHTML=e},s=function(){this.node.type&&"text/javascript"!==this.node.type||t("Script tag was updated. This does not cause the code to be re-evaluated!"),this.node.innerHTML=this.fragment.toString()},function(t,r,a,u){var c,h,f,l,p
if("script"===t.lcName||"style"===t.lcName)return t.fragment=new n({descriptor:a.f,root:t.root,contextStack:t.parentFragment.contextStack,owner:t}),void(u&&("script"===t.lcName?(t.bubble=s,t.node.innerHTML=t.fragment.toString()):(t.bubble=o,t.bubble())))
if("string"!=typeof a.f||r&&r.namespaceURI&&r.namespaceURI!==e.html)t.fragment=new i({descriptor:a.f,root:t.root,pNode:r,contextStack:t.parentFragment.contextStack,owner:t}),u&&r.appendChild(t.fragment.docFrag)
else if(t.html=a.f,u)for(r.innerHTML=t.html,c=t.root._liveQueries,h=c.length;h--;)if(f=c[h],(l=r.querySelectorAll(f))&&(p=l.length))for((t.liveQueries||(t.liveQueries=[])).push(f),t.liveQueries[f]=[];p--;)t.liveQueries[f][p]=l[p]}}(M,i,en,Ce),sn=function(t,e){var n=function(n,r,i,o){var s,a,u
if(this.root=r,this.node=i.node,s=n.n||n,"string"!=typeof s&&(a=new e({descriptor:s,root:this.root,owner:i,contextStack:o}),s=a.toString(),a.teardown()),n.a?this.params=n.a:n.d&&(a=new e({descriptor:n.d,root:this.root,owner:i,contextStack:o}),this.params=a.toArgsList(),a.teardown()),this.fn=r.decorators[s],!this.fn){if(u='Missing "'+s+'" decorator. You may need to download a plugin via https://github.com/RactiveJS/Ractive/wiki/Plugins#decorators',r.debug)throw new Error(u)
t(u)}}
return n.prototype={init:function(){var t,e
if(this.params?(e=[this.node].concat(this.params),t=this.fn.apply(this.root,e)):t=this.fn.call(this.root,this.node),!t||!t.teardown)throw new Error("Decorator definition must return an object with a teardown method")
this.teardown=t.teardown}},n}(M,en),an=function(t){return function(e,n,r,i){r.decorator=new t(e,n,r,i),r.decorator.fn&&n._deferred.decorators.push(r.decorator)}}(sn),un=function(t,e){var n,r,i,o,s,a,u,c,h
return n=function(t,e,n,i,o){var s,a
s=t.node._ractive.events,a=s[e]||(s[e]=new r(t,e,i,o)),a.add(n)},r=function(e,n,r){var i
this.element=e,this.root=e.root,this.node=e.node,this.name=n,this.contextStack=r,this.proxies=[],(i=this.root.events[n])?this.custom=i(this.node,h(n)):("on"+n in this.node||t('Missing "'+this.name+'" event. You may need to download a plugin via https://github.com/RactiveJS/Ractive/wiki/Plugins#events'),this.node.addEventListener(n,c,!1))},r.prototype={add:function(t){this.proxies[this.proxies.length]=new i(this.element,this.root,t,this.contextStack)},teardown:function(){var t
for(this.custom?this.custom.teardown():this.node.removeEventListener(this.name,c,!1),t=this.proxies.length;t--;)this.proxies[t].teardown()},fire:function(t){for(var e=this.proxies.length;e--;)this.proxies[e].fire(t)}},i=function(t,n,r,i){var u
return this.root=n,u=r.n||r,this.n="string"==typeof u?u:new e({descriptor:r.n,root:this.root,owner:t,contextStack:i}),r.a?(this.a=r.a,void(this.fire=s)):r.d?(this.d=new e({descriptor:r.d,root:this.root,owner:t,contextStack:i}),void(this.fire=a)):void(this.fire=o)},i.prototype={teardown:function(){this.n.teardown&&this.n.teardown(),this.d&&this.d.teardown()},bubble:function(){}},o=function(t){this.root.fire(this.n.toString(),t)},s=function(t){this.root.fire.apply(this.root,[this.n.toString(),t].concat(this.a))},a=function(t){var e=this.d.toArgsList()
"string"==typeof e&&(e=e.substr(1,e.length-2)),this.root.fire.apply(this.root,[this.n.toString(),t].concat(e))},c=function(t){var e=this._ractive
e.events[t.type].fire({node:this,original:t,index:e.index,keypath:e.keypath,context:e.root.get(e.keypath)})},u={},h=function(t){return u[t]?u[t]:u[t]=function(e){var n=e.node._ractive
e.index=n.index,e.keypath=n.keypath,e.context=n.root.get(n.keypath),n.events[t].fire(e)}},n}(M,en),cn=function(t){return function(e,n){var r,i,o
for(i in n)if(n.hasOwnProperty(i))for(o=i.split("-"),r=o.length;r--;)t(e,o[r],n[i],e.parentFragment.contextStack)}}(un),hn=function(){return function(t){var e,n,r,i,o
for(e=t.root,n=e._liveQueries,r=n.length;r--;)i=n[r],o=n[i],o._test(t)&&((t.liveQueries||(t.liveQueries=[])).push(i),t.liveQueries[i]=[t.node])}}(),fn=function(){return function(t){return t.replace(/-([a-zA-Z])/g,function(t,e){return e.toUpperCase()})}}(),ln=function(){return function(t,e){var n
for(n in e)e.hasOwnProperty(n)&&!t.hasOwnProperty(n)&&(t[n]=e[n])
return t}}(),pn=function(t,e,n,r,i,o,s,a){function u(t){var e,n,r
if(!v[t])if(void 0!==l[t])v[t]=t
else for(r=t.charAt(0).toUpperCase()+t.substring(1),e=p.length;e--;)if(n=p[e],void 0!==l[n+r]){v[t]=n+r
break}return v[t]}function c(t){return t.replace(g,"")}function h(t){var e
return d.test(t)&&(t="-"+t),e=t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})}var f,l,p,d,g,v,m,y,b,w,E,_
if(t)return l=e("div").style,function(){void 0!==l.transition?(y="transition",_="transitionend",m=!0):void 0!==l.webkitTransition?(y="webkitTransition",_="webkitTransitionEnd",m=!0):m=!1}(),y&&(b=y+"Duration",w=y+"Property",E=y+"TimingFunction"),f=function(t,e,r,i,o){var s,u,c,h=this
if(this.root=e,this.node=r.node,this.isIntro=o,this.originalStyle=this.node.getAttribute("style"),this.complete=function(t){!t&&h.isIntro&&h.resetStyle(),h._manager.pop(h.node),h.node._ractive.transition=null},s=t.n||t,"string"!=typeof s&&(u=new a({descriptor:s,root:this.root,owner:r,contextStack:i}),s=u.toString(),u.teardown()),this.name=s,t.a?this.params=t.a:t.d&&(u=new a({descriptor:t.d,root:this.root,owner:r,contextStack:i}),this.params=u.toArgsList(),u.teardown()),this._fn=e.transitions[s],!this._fn){if(c='Missing "'+s+'" transition. You may need to download a plugin via https://github.com/RactiveJS/Ractive/wiki/Plugins#transitions',e.debug)throw new Error(c)
return void n(c)}},f.prototype={init:function(){if(this._inited)throw new Error("Cannot initialize a transition more than once")
this._inited=!0,this._fn.apply(this.root,[this].concat(this.params))},getStyle:function(t){var e,n,r,o,s
if(e=window.getComputedStyle(this.node),"string"==typeof t)return s=e[u(t)],"0px"===s&&(s=0),s
if(!i(t))throw new Error("Transition#getStyle must be passed a string, or an array of strings representing CSS properties")
for(n={},r=t.length;r--;)o=t[r],s=e[u(o)],"0px"===s&&(s=0),n[o]=s
return n},setStyle:function(t,e){var n
if("string"==typeof t)this.node.style[u(t)]=e
else for(n in t)t.hasOwnProperty(n)&&(this.node.style[u(n)]=t[n])
return this},animateStyle:function(t,e,r,i){var s,a,f,l,p,d,g,v,m,y=this
for("string"==typeof t?(p={},p[t]=e):(p=t,i=r,r=e),r||(n('The "'+y.name+'" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340'),r=y,i=y.complete),r.duration||(y.setStyle(p),i&&i()),s=Object.keys(p),a=[],f=window.getComputedStyle(y.node),d={},v=s.length;v--;)m=s[v],l=f[u(m)],"0px"===l&&(l=0),l!=p[m]&&(a[a.length]=m,y.node.style[u(m)]=l)
return a.length?void setTimeout(function(){y.node.style[w]=s.map(u).map(h).join(","),y.node.style[E]=h(r.easing||"linear"),y.node.style[b]=r.duration/1e3+"s",g=function(t){var e
e=a.indexOf(o(c(t.propertyName))),-1!==e&&a.splice(e,1),a.length||(y.root.fire(y.name+":end"),y.node.removeEventListener(_,g,!1),i&&i())},y.node.addEventListener(_,g,!1),setTimeout(function(){for(var t=a.length;t--;)m=a[t],y.node.style[u(m)]=p[m]},0)},r.delay||0):void(i&&i())},resetStyle:function(){this.originalStyle?this.node.setAttribute("style",this.originalStyle):(this.node.getAttribute("style"),this.node.removeAttribute("style"))},processParams:function(t,e){return"number"==typeof t?t={duration:t}:"string"==typeof t?t="slow"===t?{duration:600}:"fast"===t?{duration:200}:{duration:400}:t||(t={}),s(t,e)}},p=["o","ms","moz","webkit"],d=new RegExp("^(?:"+p.join("|")+")([A-Z])"),g=new RegExp("^-(?:"+p.join("|")+")-"),v={},f}(s,o,M,P,l,fn,ln,en),dn=function(t,e){return function(t,n,r,i,o){var s,a,u
!n.transitionsEnabled||n._parent&&!n._parent.transitionsEnabled||(s=new e(t,n,r,i,o),s._fn&&(a=s.node,s._manager=n._transitionManager,(u=a._ractive.transition)&&u.complete(),a._ractive.transition=s,s._manager.push(a),o?n._deferred.transitions.push(s):s.init()))}}(M,pn),gn=function(t,e,n,r,i,o,s,a,u,c,h,f,l,p,d){return function(i,g,v){var m,y,b,w,E,_,x,k,S,N,O,T,A
if(i.type=t.ELEMENT,m=i.parentFragment=g.parentFragment,y=m.pNode,b=m.contextStack,w=i.descriptor=g.descriptor,i.root=O=m.root,i.index=g.index,i.lcName=w.e.toLowerCase(),i.eventListeners=[],i.customEventListeners=[],y&&(E=i.namespace=a(w,y),_=E!==e.html?d(w.e):w.e,i.node=s(_,E),r(i.node,"_ractive",{value:{proxy:i,keypath:b.length?b[b.length-1]:"",index:m.indexRefs,events:n(null),root:O}})),x=u(i,w.a),w.f){if(i.node&&i.node.getAttribute("contenteditable")&&i.node.innerHTML){if(A="A pre-populated contenteditable element should not have children",O.debug)throw new Error(A)
o(A)}c(i,i.node,w,v)}v&&w.v&&f(i,w.v),v&&(O.twoway&&(i.bind(),i.node.getAttribute("contenteditable")&&i.node._ractive.binding&&i.node._ractive.binding.update()),x.name&&!x.name.twoway&&x.name.update(),"IMG"===i.node.tagName&&((k=i.attributes.width)||(S=i.attributes.height))&&i.node.addEventListener("load",N=function(){k&&(i.node.width=k.value),S&&(i.node.height=S.value),i.node.removeEventListener("load",N,!1)},!1),v.appendChild(i.node),w.o&&h(w.o,O,i,b),w.t1&&p(w.t1,O,i,b,!0),"OPTION"===i.node.tagName&&("SELECT"===y.tagName&&(T=y._ractive.binding)&&T.deferUpdate(),i.node._ractive.value==y._ractive.value&&(i.node.selected=!0)),i.node.autofocus&&(O._deferred.focusable=i.node)),l(i)}}(f,i,r,a,Y,M,o,je,rn,on,an,cn,hn,dn,Me),vn=function(t){return function(e){var n,r,i,o,s,a,u,c,h
for(this.fragment&&this.fragment.teardown(!1);this.attributes.length;)this.attributes.pop().teardown()
if(this.node){for(n in this.node._ractive.events)this.node._ractive.events[n].teardown();(r=this.node._ractive.binding)&&(r.teardown(),i=this.root._twowayBindings[r.attr.keypath],i.splice(i.indexOf(r),1))}if(this.decorator&&this.decorator.teardown(),this.descriptor.t2&&t(this.descriptor.t2,this.root,this,this.parentFragment.contextStack,!1),e&&this.root._transitionManager.detachWhenReady(this),s=this.liveQueries)for(o=s.length;o--;)if(a=s[o],c=this.liveQueries[a])for(h=c.length,u=this.root._liveQueries[a];h--;)u._remove(c[h])}}(dn),mn=function(){return"area base br col command doctype embed hr img input keygen link meta param source track wbr".split(" ")}(),yn=function(t){return function(){var e,n,r
for(e="<"+(this.descriptor.y?"!doctype":this.descriptor.e),r=this.attributes.length,n=0;r>n;n+=1)e+=" "+this.attributes[n].toString()
return e+=">",this.html?e+=this.html:this.fragment&&(e+=this.fragment.toString()),-1===t.indexOf(this.descriptor.e)&&(e+="</"+this.descriptor.e+">"),e}}(mn),bn=function(t){return function(e){var n
return t(this.node,e)?this.node:this.html&&(n=this.node.querySelector(e))?n:this.fragment&&this.fragment.find?this.fragment.find(e):void 0}}(Y),wn=function(){return function(t,e){var n,r,i,o,s
if(e._test(this,!0)&&e.live&&((this.liveQueries||(this.liveQueries=[])).push(t),this.liveQueries[t]=[this.node]),this.html&&(n=this.node.querySelectorAll(t))&&(i=n.length))for(e.live&&(this.liveQueries[t]||((this.liveQueries||(this.liveQueries=[])).push(t),this.liveQueries[t]=[]),s=this.liveQueries[t]),r=0;i>r;r+=1)o=n[r],e.push(o),e.live&&s.push(o)
this.fragment&&this.fragment.findAll(t,e)}}(),En=function(){return function(t){return this.fragment?this.fragment.findComponent(t):void 0}}(),_n=function(){return function(t,e){this.fragment&&this.fragment.findAllComponents(t,e)}}(),xn=function(){return function(){var t=this.attributes
if(this.node&&(this.binding&&(this.binding.teardown(),this.binding=null),!(this.node.getAttribute("contenteditable")&&t.value&&t.value.bind())))switch(this.descriptor.e){case"select":case"textarea":return void(t.value&&t.value.bind())
case"input":if("radio"===this.node.type||"checkbox"===this.node.type){if(t.name&&t.name.bind())return
if(t.checked&&t.checked.bind())return}if(t.value&&t.value.bind())return}}}(),kn=function(t,e,n,r,i,o,s,a){var u=function(e,n){t(this,e,n)}
return u.prototype={detach:function(){return this.node?(this.node.parentNode&&this.node.parentNode.removeChild(this.node),this.node):void 0},teardown:e,firstNode:function(){return this.node},findNextNode:function(){return null},bubble:function(){},toString:n,find:r,findAll:i,findComponent:o,findAllComponents:s,bind:a},u}(gn,vn,yn,bn,wn,En,_n,xn),Sn={missingParser:"Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser"},Nn={},On=function(){return function(t){var e,n,r
for(r="";t.length;){if(e=t.indexOf("<!--"),n=t.indexOf("-->"),-1===e&&-1===n){r+=t
break}if(-1!==e&&-1===n)throw"Illegal HTML - expected closing comment sequence ('-->')"
if(-1!==n&&-1===e||e>n)throw"Illegal HTML - unexpected closing comment sequence ('-->')"
r+=t.substr(0,e),t=t.substring(n+3)}return r}}(),Tn=function(t){return function(e){var n,r,i,o,s,a
for(s=/^\s*\r?\n/,a=/\r?\n\s*$/,n=2;n<e.length;n+=1)r=e[n],i=e[n-1],o=e[n-2],r.type===t.TEXT&&i.type===t.MUSTACHE&&o.type===t.TEXT&&a.test(o.value)&&s.test(r.value)&&(i.mustacheType!==t.INTERPOLATOR&&i.mustacheType!==t.TRIPLE&&(o.value=o.value.replace(a,"\n")),r.value=r.value.replace(s,""),""===r.value&&e.splice(n--,1))
return e}}(f),An=function(t){return function(e){var n,r,i,o
for(n=0;n<e.length;n+=1)r=e[n],i=e[n-1],o=e[n+1],(r.mustacheType===t.COMMENT||r.mustacheType===t.DELIMCHANGE)&&(e.splice(n,1),i&&o&&i.type===t.TEXT&&o.type===t.TEXT&&(i.value+=o.value,e.splice(n,1)),n-=1)
return e}}(f),Rn=function(t){var e=t(/^[^\s=]+/)
return function(t){var n,r,i
return t.getStringMatch("=")?(n=t.pos,t.allowWhitespace(),(r=e(t))?(t.allowWhitespace(),(i=e(t))?(t.allowWhitespace(),t.getStringMatch("=")?[r,i]:(t.pos=n,null)):(t.pos=n,null)):(t.pos=n,null)):null}}(Ke),Cn=function(t){var e={"#":t.SECTION,"^":t.INVERTED,"/":t.CLOSING,">":t.PARTIAL,"!":t.COMMENT,"&":t.TRIPLE}
return function(t){var n=e[t.str.charAt(t.pos)]
return n?(t.pos+=1,n):null}}(f),In=function(t,e,n){var r=e(/^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/),i=/^[0-9][1-9]*$/
return function(e,o){var s,a,u,c,h,f,l
if(s=e.pos,a={type:o?t.TRIPLE:t.MUSTACHE},!(o||((c=e.getExpression())&&(a.mustacheType=t.INTERPOLATOR,e.allowWhitespace(),e.getStringMatch(e.delimiters[1])?e.pos-=e.delimiters[1].length:(e.pos=s,c=null)),c||(u=n(e),u===t.TRIPLE?a={type:t.TRIPLE}:a.mustacheType=u||t.INTERPOLATOR,u!==t.COMMENT&&u!==t.CLOSING||(f=e.remaining(),l=f.indexOf(e.delimiters[1]),-1===l)))))return a.ref=f.substr(0,l),e.pos+=l,a
for(c||(e.allowWhitespace(),c=e.getExpression());c.t===t.BRACKETED&&c.x;)c=c.x
return c.t===t.REFERENCE?a.ref=c.n:c.t===t.NUMBER_LITERAL&&i.test(c.v)?a.ref=c.v:a.expression=c,h=r(e),null!==h&&(a.indexRef=h),a}}(f,Ke,Cn),Ln=function(t,e,n){function r(r,i){var o,s,a=r.pos
return s=i?r.tripleDelimiters:r.delimiters,r.getStringMatch(s[0])?(o=e(r))?r.getStringMatch(s[1])?(r[i?"tripleDelimiters":"delimiters"]=o,{type:t.MUSTACHE,mustacheType:t.DELIMCHANGE}):(r.pos=a,null):(r.allowWhitespace(),o=n(r,i),null===o?(r.pos=a,null):(r.allowWhitespace(),r.getStringMatch(s[1])?o:(r.pos=a,null))):null}return function(){var t=this.tripleDelimiters[0].length>this.delimiters[0].length
return r(this,t)||r(this,!t)}}(f,Rn,In),jn=function(t){return function(){var e,n,r
if(!this.getStringMatch("<!--"))return null
if(n=this.remaining(),r=n.indexOf("-->"),-1===r)throw new Error('Unexpected end of input (expected "-->" to close comment)')
return e=n.substr(0,r),this.pos+=r+3,{type:t.COMMENT,content:e}}}(f),Mn=function(){return function(t,e){var n,r,i
for(n=e.length;n--;){if(r=t.indexOf(e[n]),!r)return 0;-1!==r&&(!i||i>r)&&(i=r)}return i||-1}}(),Pn=function(t,e,n){var r,i,o,s,a,u,c,h,f,l,p,d,g
return r=function(){return i(this)||o(this)},i=function(e){var n,r,i,o
return n=e.pos,e.inside?null:e.getStringMatch("<")?(r={type:t.TAG},e.getStringMatch("!")&&(r.doctype=!0),r.name=s(e),r.name?(i=a(e),i&&(r.attrs=i),e.allowWhitespace(),e.getStringMatch("/")&&(r.selfClosing=!0),e.getStringMatch(">")?(o=r.name.toLowerCase(),("script"===o||"style"===o)&&(e.inside=o),r):(e.pos=n,null)):(e.pos=n,null)):null},o=function(e){var n,r,i
if(n=e.pos,i=function(t){throw new Error("Unexpected character "+e.remaining().charAt(0)+" (expected "+t+")")},!e.getStringMatch("<"))return null
if(r={type:t.TAG,closing:!0},e.getStringMatch("/")||i('"/"'),r.name=s(e),r.name||i("tag name"),e.getStringMatch(">")||i('">"'),e.inside){if(r.name.toLowerCase()!==e.inside)return e.pos=n,null
e.inside=null}return r},s=e(/^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/),a=function(t){var e,n,r
if(e=t.pos,t.allowWhitespace(),r=u(t),!r)return t.pos=e,null
for(n=[];null!==r;)n[n.length]=r,t.allowWhitespace(),r=u(t)
return n},u=function(t){var e,n,r
return(n=c(t))?(e={name:n},r=h(t),r&&(e.value=r),e):null},c=e(/^[^\s"'>\/=]+/),h=function(t){var e,n
return e=t.pos,t.allowWhitespace(),t.getStringMatch("=")?(t.allowWhitespace(),n=g(t,"'")||g(t,'"')||f(t),null===n?(t.pos=e,null):n):(t.pos=e,null)},p=e(/^[^\s"'=<>`]+/),l=function(e){var n,r,i
return n=e.pos,(r=p(e))?(-1!==(i=r.indexOf(e.delimiters[0]))&&(r=r.substr(0,i),e.pos=n+r.length),{type:t.TEXT,value:r}):null},f=function(t){var e,n
for(e=[],n=t.getMustache()||l(t);null!==n;)e[e.length]=n,n=t.getMustache()||l(t)
return e.length?e:null},g=function(t,e){var n,r,i
if(n=t.pos,!t.getStringMatch(e))return null
for(r=[],i=t.getMustache()||d(t,e);null!==i;)r[r.length]=i,i=t.getMustache()||d(t,e)
return t.getStringMatch(e)?r:(t.pos=n,null)},d=function(e,r){var i,o,s
if(i=e.pos,s=e.remaining(),o=n(s,[r,e.delimiters[0],e.delimiters[1]]),-1===o)throw new Error("Quoted attribute value must have a closing quote")
return o?(e.pos+=o,{type:t.TEXT,value:s.substr(0,o)}):null},r}(f,Ke,Mn),Fn=function(t,e){return function(){var n,r,i
return r=this.remaining(),i=this.inside?"</"+this.inside:"<",(n=e(r,[i,this.delimiters[0],this.tripleDelimiters[0]]))?(-1===n&&(n=r.length),this.pos+=n,{type:t.TEXT,value:r.substr(0,n)}):null}}(f,Mn),Bn=function(t){return function(e){var n=e.remaining()
return"true"===n.substr(0,4)?(e.pos+=4,{t:t.BOOLEAN_LITERAL,v:"true"}):"false"===n.substr(0,5)?(e.pos+=5,{t:t.BOOLEAN_LITERAL,v:"false"}):null}}(f),Dn=function(t,e){return function(n){var r,i,o
return r=n.pos,n.allowWhitespace(),i=e(n),null===i?(n.pos=r,null):(n.allowWhitespace(),n.getStringMatch(":")?(n.allowWhitespace(),o=n.getExpression(),null===o?(n.pos=r,null):{t:t.KEY_VALUE_PAIR,k:i,v:o}):(n.pos=r,null))}}(f,Ge),Un=function(t){return function e(n){var r,i,o,s
return r=n.pos,o=t(n),null===o?null:(i=[o],n.getStringMatch(",")?(s=e(n),s?i.concat(s):(n.pos=r,null)):i)}}(Dn),qn=function(t,e){return function(n){var r,i
return r=n.pos,n.allowWhitespace(),n.getStringMatch("{")?(i=e(n),n.allowWhitespace(),n.getStringMatch("}")?{t:t.OBJECT_LITERAL,m:i}:(n.pos=r,null)):(n.pos=r,null)}}(f,Un),Wn=function(){return function t(e){var n,r,i,o
if(n=e.pos,e.allowWhitespace(),i=e.getExpression(),null===i)return null
if(r=[i],e.allowWhitespace(),e.getStringMatch(",")){if(o=t(e),null===o)return e.pos=n,null
r=r.concat(o)}return r}}(),Kn=function(t,e){return function(n){var r,i
return r=n.pos,n.allowWhitespace(),n.getStringMatch("[")?(i=e(n),n.getStringMatch("]")?{t:t.ARRAY_LITERAL,m:i}:(n.pos=r,null)):(n.pos=r,null)}}(f,Wn),zn=function(t,e,n,r,i){return function(o){var s=t(o)||e(o)||n(o)||r(o)||i(o)
return s}}(Je,Bn,He,qn,Kn),Vn=function(t,e,n){var r,i,o,s
return r=e(/^\.[a-zA-Z_$0-9]+/),i=function(t){var e=o(t)
return e?"."+e:null},o=e(/^\[(0|[1-9][0-9]*)\]/),s=/^(?:Array|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)$/,function(e){var o,a,u,c,h,f,l
for(o=e.pos,a="";e.getStringMatch("../");)a+="../"
if(a||(c=e.getStringMatch(".")||""),u=n(e)||"",!a&&!c&&s.test(u))return{t:t.GLOBAL,v:u}
if("this"!==u||a||c||(u=".",o+=3),h=(a||c)+u,!h)return null
for(;f=r(e)||i(e);)h+=f
return e.getStringMatch("(")&&(l=h.lastIndexOf("."),-1!==l?(h=h.substr(0,l),e.pos=o+h.length):e.pos-=1),{t:t.REFERENCE,n:h}}}(f,Ke,$e),Hn=function(t){return function(e){var n,r
return n=e.pos,e.getStringMatch("(")?(e.allowWhitespace(),(r=e.getExpression())?(e.allowWhitespace(),e.getStringMatch(")")?{t:t.BRACKETED,x:r}:(e.pos=n,null)):(e.pos=n,null)):null}}(f),Jn=function(t,e,n){return function(r){return t(r)||e(r)||n(r)}}(zn,Vn,Hn),$n=function(t,e){return function(n){var r,i,o
if(r=n.pos,n.allowWhitespace(),n.getStringMatch(".")){if(n.allowWhitespace(),i=e(n))return{t:t.REFINEMENT,n:i}
n.expected("a property name")}return n.getStringMatch("[")?(n.allowWhitespace(),o=n.getExpression(),o||n.expected("an expression"),n.allowWhitespace(),n.getStringMatch("]")||n.expected('"]"'),{t:t.REFINEMENT,x:o}):null}}(f,$e),Gn=function(t,e,n,r){return function(i){var o,s,a,u
if(s=e(i),!s)return null
for(;s;)if(o=i.pos,a=r(i))s={t:t.MEMBER,x:s,r:a}
else{if(!i.getStringMatch("("))break
if(i.allowWhitespace(),u=n(i),i.allowWhitespace(),!i.getStringMatch(")")){i.pos=o
break}s={t:t.INVOCATION,x:s},u&&(s.o=u)}return s}}(f,Jn,Wn,$n),Xn=function(t,e){var n,r
return r=function(e,n){return function(r){var i,o
return r.getStringMatch(e)?(i=r.pos,r.allowWhitespace(),o=r.getExpression(),o||r.expected("an expression"),{s:e,o:o,t:t.PREFIX_OPERATOR}):n(r)}},function(){var t,i,o,s,a
for(s="! ~ + - typeof".split(" "),a=e,t=0,i=s.length;i>t;t+=1)o=r(s[t],a),a=o
n=a}(),n}(f,Gn),Qn=function(t,e){var n,r
return r=function(e,n){return function(r){var i,o,s
return(o=n(r))?(i=r.pos,r.allowWhitespace(),r.getStringMatch(e)?"in"===e&&/[a-zA-Z_$0-9]/.test(r.remaining().charAt(0))?(r.pos=i,o):(r.allowWhitespace(),s=r.getExpression(),s?{t:t.INFIX_OPERATOR,s:e,o:[o,s]}:(r.pos=i,o)):(r.pos=i,o)):null}},function(){var t,i,o,s,a
for(s="* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||".split(" "),a=e,t=0,i=s.length;i>t;t+=1)o=r(s[t],a),a=o
n=a}(),n}(f,Xn),Yn=function(t,e){return function(n){var r,i,o,s
return(i=e(n))?(r=n.pos,n.allowWhitespace(),n.getStringMatch("?")?(n.allowWhitespace(),(o=n.getExpression())?(n.allowWhitespace(),n.getStringMatch(":")?(n.allowWhitespace(),s=n.getExpression(),s?{t:t.CONDITIONAL,o:[i,o,s]}:(n.pos=r,i)):(n.pos=r,i)):(n.pos=r,i)):(n.pos=r,i)):null}}(f,Qn),Zn=function(t){return function(){return t(this)}}(Yn),tr=function(t,e,n,r,i,o,s){var a
return a=function(t,e){var n
for(this.str=t,this.pos=0,this.delimiters=e.delimiters,this.tripleDelimiters=e.tripleDelimiters,this.tokens=[];this.pos<this.str.length;)n=this.getToken(),null===n&&this.remaining()&&this.fail(),this.tokens.push(n)},a.prototype={getToken:function(){var t=this.getMustache()||this.getComment()||this.getTag()||this.getText()
return t},getMustache:t,getComment:e,getTag:n,getText:r,getExpression:i,allowWhitespace:o,getStringMatch:s,remaining:function(){return this.str.substring(this.pos)},fail:function(){var t,e
throw t=this.str.substr(0,this.pos).substr(-20),20===t.length&&(t="..."+t),e=this.remaining().substr(0,20),20===e.length&&(e+="..."),new Error("Could not parse template: "+(t?t+"<- ":"")+"failed at character "+this.pos+" ->"+e)},expected:function(t){var e=this.remaining().substr(0,40)
throw 40===e.length&&(e+="..."),new Error('Tokenizer failed: unexpected string "'+e+'" (expected '+t+")")}},a}(Ln,jn,Pn,Fn,Zn,We,qe),er=function(t,e,n,r,i){var o,s
return i.push(function(){s=i.Ractive}),o=function(i,o){var a,u
return o=o||{},o.stripComments!==!1&&(i=t(i)),a=new r(i,{delimiters:o.delimiters||(s?s.delimiters:["{{","}}"]),tripleDelimiters:o.tripleDelimiters||(s?s.tripleDelimiters:["{{{","}}}"])}),u=a.tokens,e(u),n(u),u}}(On,Tn,An,tr,Ce),nr=function(t){var e,n,r,i,o,s,a,u,c
return e=function(t,e){this.text=e?t.value:t.value.replace(c," ")},e.prototype={type:t.TEXT,toJSON:function(){return this.decoded||(this.decoded=u(this.text))},toString:function(){return this.text}},n={quot:34,amp:38,apos:39,lt:60,gt:62,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,copy:169,ordf:170,laquo:171,not:172,shy:173,reg:174,macr:175,deg:176,plusmn:177,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,sup1:185,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,Agrave:192,Aacute:193,Acirc:194,Atilde:195,Auml:196,Aring:197,AElig:198,Ccedil:199,Egrave:200,Eacute:201,Ecirc:202,Euml:203,Igrave:204,Iacute:205,Icirc:206,Iuml:207,ETH:208,Ntilde:209,Ograve:210,Oacute:211,Ocirc:212,Otilde:213,Ouml:214,times:215,Oslash:216,Ugrave:217,Uacute:218,Ucirc:219,Uuml:220,Yacute:221,THORN:222,szlig:223,agrave:224,aacute:225,acirc:226,atilde:227,auml:228,aring:229,aelig:230,ccedil:231,egrave:232,eacute:233,ecirc:234,euml:235,igrave:236,iacute:237,icirc:238,iuml:239,eth:240,ntilde:241,ograve:242,oacute:243,ocirc:244,otilde:245,ouml:246,divide:247,oslash:248,ugrave:249,uacute:250,ucirc:251,uuml:252,yacute:253,thorn:254,yuml:255,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,"int":8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},r=[8364,129,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,141,381,143,144,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,157,382,376],i=new RegExp("&("+Object.keys(n).join("|")+");?","g"),o=/&#x([0-9]+);?/g,s=/&#([0-9]+);?/g,a=function(t){return t?10===t?32:128>t?t:159>=t?r[t-128]:55296>t?t:57343>=t?65533:65535>=t?t:65533:65533},u=function(t){var e
return e=t.replace(i,function(t,e){return n[e]?String.fromCharCode(n[e]):t}),e=e.replace(o,function(t,e){return String.fromCharCode(a(parseInt(e,16)))}),e=e.replace(s,function(t,e){return String.fromCharCode(a(e))})},c=/\s+/g,e}(f),rr=function(t,e){return function(n){return n.type===t.TEXT?(this.pos+=1,new e(n,this.preserveWhitespace)):null}}(f,nr),ir=function(t){var e
return e=function(t){this.content=t.content},e.prototype={toJSON:function(){return{t:t.COMMENT,f:this.content}},toString:function(){return"<!--"+this.content+"-->"}},e}(f),or=function(t,e){return function(n){return n.type===t.COMMENT?(this.pos+=1,new e(n,this.preserveWhitespace)):null}}(f,ir),sr=function(t,e){var n,r,i
return n=function(t){this.refs=[],r(t,this.refs),this.str=i(t,this.refs)},n.prototype={toJSON:function(){return this.json?this.json:(this.json={r:this.refs,s:this.str},this.json)}},r=function(n,i){var o,s
if(n.t===t.REFERENCE&&-1===i.indexOf(n.n)&&i.unshift(n.n),s=n.o||n.m)if(e(s))r(s,i)
else for(o=s.length;o--;)r(s[o],i)
n.x&&r(n.x,i),n.r&&r(n.r,i),n.v&&r(n.v,i)},i=function(e,n){var r=function(t){return i(t,n)}
switch(e.t){case t.BOOLEAN_LITERAL:case t.GLOBAL:case t.NUMBER_LITERAL:return e.v
case t.STRING_LITERAL:return"'"+e.v.replace(/'/g,"\\'")+"'"
case t.ARRAY_LITERAL:return"["+(e.m?e.m.map(r).join(","):"")+"]"
case t.OBJECT_LITERAL:return"{"+(e.m?e.m.map(r).join(","):"")+"}"
case t.KEY_VALUE_PAIR:return e.k+":"+i(e.v,n)
case t.PREFIX_OPERATOR:return("typeof"===e.s?"typeof ":e.s)+i(e.o,n)
case t.INFIX_OPERATOR:return i(e.o[0],n)+("in"===e.s.substr(0,2)?" "+e.s+" ":e.s)+i(e.o[1],n)
case t.INVOCATION:return i(e.x,n)+"("+(e.o?e.o.map(r).join(","):"")+")"
case t.BRACKETED:return"("+i(e.x,n)+")"
case t.MEMBER:return i(e.x,n)+i(e.r,n)
case t.REFINEMENT:return e.n?"."+e.n:"["+i(e.x,n)+"]"
case t.CONDITIONAL:return i(e.o[0],n)+"?"+i(e.o[1],n)+":"+i(e.o[2],n)
case t.REFERENCE:return"${"+n.indexOf(e.n)+"}"
default:throw new Error("Could not stringify expression token. This error is unexpected")}},n}(f,x),ar=function(t,e){var n=function(n,r){this.type=n.type===t.TRIPLE?t.TRIPLE:n.mustacheType,n.ref&&(this.ref=n.ref),n.expression&&(this.expr=new e(n.expression)),r.pos+=1}
return n.prototype={toJSON:function(){var t
return this.json?this.json:(t={t:this.type},this.ref&&(t.r=this.ref),this.expr&&(t.x=this.expr.toJSON()),this.json=t,t)},toString:function(){return!1}},n}(f,sr),ur=function(){return function(t){var e,n,r,i=""
if(!t)return""
for(n=0,r=t.length;r>n;n+=1){if(e=t[n].toString(),e===!1)return!1
i+=e}return i}}(),cr=function(t){return function(e,n){var r,i
return n||(r=t(e),r===!1)?i=e.map(function(t){return t.toJSON(n)}):r}}(ur),hr=function(t,e,n){var r=function(e,r){var i
for(this.ref=e.ref,this.indexRef=e.indexRef,this.inverted=e.mustacheType===t.INVERTED,e.expression&&(this.expr=new n(e.expression)),r.pos+=1,this.items=[],i=r.next();i;){if(i.mustacheType===t.CLOSING){if(i.ref.trim()===this.ref||this.expr){r.pos+=1
break}throw new Error("Could not parse template: Illegal closing section")}this.items[this.items.length]=r.getStub(),i=r.next()}}
return r.prototype={toJSON:function(n){var r
return this.json?this.json:(r={t:t.SECTION},this.ref&&(r.r=this.ref),this.indexRef&&(r.i=this.indexRef),this.inverted&&(r.n=!0),this.expr&&(r.x=this.expr.toJSON()),this.items.length&&(r.f=e(this.items,n)),this.json=r,r)},toString:function(){return!1}},r}(f,cr,sr),fr=function(t,e,n){return function(r){return r.type===t.MUSTACHE||r.type===t.TRIPLE?r.mustacheType===t.SECTION||r.mustacheType===t.INVERTED?new n(r,this):new e(r,this):void 0}}(f,ar,hr),lr=function(){return{li:["li"],dt:["dt","dd"],dd:["dt","dd"],p:"address article aside blockquote dir div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr menu nav ol p pre section table ul".split(" "),rt:["rt","rp"],rp:["rp","rt"],optgroup:["optgroup"],option:["option","optgroup"],thead:["tbody","tfoot"],tbody:["tbody","tfoot"],tr:["tr"],td:["td","th"],th:["td","th"]}}(),pr=function(t){function e(n){var r,i
if("object"!=typeof n)return n
if(t(n))return n.map(e)
r={}
for(i in n)n.hasOwnProperty(i)&&(r[i]=e(n[i]))
return r}return function(t){var n,r,i,o,s,a
for(i={},n=[],r=[],s=t.length,o=0;s>o;o+=1)if(a=t[o],"intro"===a.name){if(i.intro)throw new Error("An element can only have one intro transition")
i.intro=a}else if("outro"===a.name){if(i.outro)throw new Error("An element can only have one outro transition")
i.outro=a}else if("intro-outro"===a.name){if(i.intro||i.outro)throw new Error("An element can only have one intro and one outro transition")
i.intro=a,i.outro=e(a)}else"proxy-"===a.name.substr(0,6)?(a.name=a.name.substring(6),r[r.length]=a):"on-"===a.name.substr(0,3)?(a.name=a.name.substring(3),r[r.length]=a):"decorator"===a.name?i.decorator=a:n[n.length]=a
return i.attrs=n,i.proxies=r,i}}(l),dr=function(t,e){return function(n){var r,i,o,s,a,u,c,h
for(a=function(){throw new Error("Illegal directive")},n.name&&n.value||a(),r={directiveType:n.name},i=n.value,u=[],c=[];i.length;)if(o=i.shift(),o.type===t.TEXT){if(s=o.value.indexOf(":"),-1!==s){s&&(u[u.length]={type:t.TEXT,value:o.value.substr(0,s)}),o.value.length>s+1&&(c[0]={type:t.TEXT,value:o.value.substring(s+1)})
break}u[u.length]=o}else u[u.length]=o
return c=c.concat(i),r.name=1===u.length&&u[0].type===t.TEXT?u[0].value:u,c.length&&(1===c.length&&c[0].type===t.TEXT?(h=e("["+c[0].value+"]"),r.args=h?h.value:c[0].value):r.dynamicArgs=c),r}}(f,Xe),gr=function(t,e){var n
return n=function(t,e){var n
for(this.tokens=t||[],this.pos=0,this.options=e,this.result=[];n=this.getStub();)this.result.push(n)},n.prototype={getStub:function(){var t=this.next()
return t?this.getText(t)||this.getMustache(t):null},getText:t,getMustache:e,next:function(){return this.tokens[this.pos]}},n}(rr,fr),vr=function(t,e,n){var r
return r=function(e){var n=new t(e)
this.stubs=n.result},r.prototype={toJSON:function(t){var e
return this["json_"+t]?this["json_"+t]:e=this["json_"+t]=n(this.stubs,t)},toString:function(){return void 0!==this.str?this.str:(this.str=e(this.stubs),this.str)}},r}(gr,ur,cr),mr=function(t){return function(e){var n,r
if("string"==typeof e.name){if(!e.args&&!e.dynamicArgs)return e.name
r=e.name}else r=new t(e.name).toJSON()
return n={n:r},e.args?(n.a=e.args,n):(e.dynamicArgs&&(n.d=new t(e.dynamicArgs).toJSON()),n)}}(vr),yr=function(t,e,n){return function(r){var i,o,s,a,u,c,h
if(this["json_"+r])return this["json_"+r]
if(i=this.component?{t:t.COMPONENT,e:this.component}:{t:t.ELEMENT,e:this.tag},this.doctype&&(i.y=1),this.attributes&&this.attributes.length)for(i.a={},c=this.attributes.length,u=0;c>u;u+=1){if(h=this.attributes[u],o=h.name,i.a[o])throw new Error("You cannot have multiple attributes with the same name")
s=null===h.value?null:h.value.toJSON(r),i.a[o]=s}if(this.items&&this.items.length&&(i.f=e(this.items,r)),this.proxies&&this.proxies.length)for(i.v={},c=this.proxies.length,u=0;c>u;u+=1)a=this.proxies[u],i.v[a.directiveType]=n(a)
return this.intro&&(i.t1=n(this.intro)),this.outro&&(i.t2=n(this.outro)),this.decorator&&(i.o=n(this.decorator)),this["json_"+r]=i,i}}(f,cr,mr),br=function(t,e){var n
return n="a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr".split(" "),function(){var r,i,o,s,a,u,c,h
if(void 0!==this.str)return this.str
if(this.component)return this.str=!1
if(-1===n.indexOf(this.tag.toLowerCase()))return this.str=!1
if(this.proxies||this.intro||this.outro||this.decorator)return this.str=!1
if(c=t(this.items),c===!1)return this.str=!1
if(h=-1!==e.indexOf(this.tag.toLowerCase()),r="<"+this.tag,this.attributes)for(i=0,o=this.attributes.length;o>i;i+=1){if(a=this.attributes[i].name,-1!==a.indexOf(":"))return this.str=!1
if("id"===a||"intro"===a||"outro"===a)return this.str=!1
if(s=" "+a,null!==this.attributes[i].value){if(u=this.attributes[i].value.toString(),u===!1)return this.str=!1
""!==u&&(s+="=",s+=/[\s"'=<>`]/.test(u)?'"'+u.replace(/"/g,"&quot;")+'"':u)}r+=s}return this.selfClosing&&!h?(r+="/>",this.str=r):(r+=">",h?this.str=r:(r+=c,r+="</"+this.tag+">",this.str=r))}}(ur,mn),wr=function(t,e,n,r,i,o,s,a,u,c,h){var f,l,p,d,g,v=/^\s+/,m=/\s+$/
return f=function(r,i,u){var c,f,l,p,d,y,b
if(i.pos+=1,y=function(t){return{name:t.name,value:t.value?new h(t.value):null}},this.tag=r.name,b=r.name.toLowerCase(),"rv-"===b.substr(0,3)&&(n('The "rv-" prefix for components has been deprecated. Support will be removed in a future version'),this.tag=this.tag.substring(3)),u=u||"pre"===b,r.attrs&&(l=s(r.attrs),f=l.attrs,p=l.proxies,i.options.sanitize&&i.options.sanitize.eventAttributes&&(f=f.filter(g)),f.length&&(this.attributes=f.map(y)),p.length&&(this.proxies=p.map(a)),l.intro&&(this.intro=a(l.intro)),l.outro&&(this.outro=a(l.outro)),l.decorator&&(this.decorator=a(l.decorator))),r.doctype&&(this.doctype=!0),r.selfClosing&&(this.selfClosing=!0),-1!==e.indexOf(b)&&(this.isVoid=!0),!this.selfClosing&&!this.isVoid){for(this.siblings=o[b],this.items=[],c=i.next();c&&c.mustacheType!==t.CLOSING;){if(c.type===t.TAG){if(c.closing){c.name.toLowerCase()===b&&(i.pos+=1)
break}if(this.siblings&&-1!==this.siblings.indexOf(c.name.toLowerCase()))break}this.items[this.items.length]=i.getStub(),c=i.next()}u||(d=this.items[0],d&&d.type===t.TEXT&&(d.text=d.text.replace(v,""),d.text||this.items.shift()),d=this.items[this.items.length-1],d&&d.type===t.TEXT&&(d.text=d.text.replace(m,""),d.text||this.items.pop()))}},f.prototype={toJSON:u,toString:c},l="a abbr acronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 h6 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol p param pre q s samp script select small span strike strong style sub sup textarea title tt u ul var article aside audio bdi canvas command data datagrid datalist details embed eventsource figcaption figure footer header hgroup keygen mark meter nav output progress ruby rp rt section source summary time track video wbr".split(" "),p="li dd rt rp optgroup option tbody tfoot tr td th".split(" "),d=/^on[a-zA-Z]/,g=function(t){var e=!d.test(t.name)
return e},f}(f,mn,M,fn,ur,lr,pr,dr,yr,br,vr),Er=function(t,e){return function(t){return this.options.sanitize&&this.options.sanitize.elements&&-1!==this.options.sanitize.elements.indexOf(t.name.toLowerCase())?null:new e(t,this)}}(f,wr),_r=function(t,e,n,r,i){var o
return o=function(t,e){var n,r
for(this.tokens=t||[],this.pos=0,this.options=e,this.preserveWhitespace=e.preserveWhitespace,r=[];n=this.getStub();)r.push(n)
this.result=i(r)},o.prototype={getStub:function(){var t=this.next()
return t?this.getText(t)||this.getComment(t)||this.getMustache(t)||this.getElement(t):null},getText:t,getComment:e,getMustache:n,getElement:r,next:function(){return this.tokens[this.pos]}},o}(rr,or,fr,Er,cr),xr=function(t,e,n){var r,i,o,s,a
return i=/^\s*$/,o=/<!--\s*\{\{\s*>\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/,s=/<!--\s*\{\{\s*\/\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}\}\s*-->/,r=function(r,s){var u,c,h
return s=s||{},o.test(r)?a(r,s):(s.sanitize===!0&&(s.sanitize={elements:"applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title".split(" "),eventAttributes:!0}),u=t(r,s),s.preserveWhitespace||(h=u[0],h&&h.type===e.TEXT&&i.test(h.value)&&u.shift(),h=u[u.length-1],h&&h.type===e.TEXT&&i.test(h.value)&&u.pop()),c=new n(u,s).result,"string"==typeof c?[c]:c)},a=function(t,e){var n,i,a,u,c,h
for(a={},n="",i=t;c=o.exec(i);){if(u=c[1],n+=i.substr(0,c.index),i=i.substring(c.index+c[0].length),h=s.exec(i),!h||h[1]!==u)throw new Error("Inline partials must have a closing delimiter, and cannot be nested")
a[u]=r(i.substr(0,h.index),e),i=i.substring(h.index+h[0].length)}return{main:r(n,e),partials:a}},r}(er,f,_r),kr=function(t,e,n,r,i,o){var s,a,u,c
return s=function(r,s){var h,f,l
if(f=u(r,s))return f
if(e&&(h=document.getElementById(s),h&&"SCRIPT"===h.tagName)){if(!o)throw new Error(t.missingParser)
a(o(h.innerHTML),s,i)}if(f=i[s],!f){if(l='Could not find descriptor for partial "'+s+'"',r.debug)throw new Error(l)
return n(l),[]}return c(f)},u=function(e,n){var r
if(e.partials[n]){if("string"==typeof e.partials[n]){if(!o)throw new Error(t.missingParser)
r=o(e.partials[n],e.parseOptions),a(r,n,e.partials)}return c(e.partials[n])}},a=function(t,e,n){var i
if(r(t)){n[e]=t.main
for(i in t.partials)t.partials.hasOwnProperty(i)&&(n[i]=t.partials[i])}else n[e]=t},c=function(t){return 1===t.length&&"string"==typeof t[0]?t[0]:t},s}(Sn,s,M,x,Nn,xr),Sr=function(t,e,n){var r,i
return n.push(function(){i=n.DomFragment}),r=function(n,r){var o,s=this.parentFragment=n.parentFragment
if(this.type=t.PARTIAL,this.name=n.descriptor.r,this.index=n.index,!n.descriptor.r)throw new Error("Partials must have a static reference (no expressions). This may change in a future version of Ractive.")
o=e(s.root,n.descriptor.r),this.fragment=new i({descriptor:o,root:s.root,pNode:s.pNode,contextStack:s.contextStack,owner:this}),r&&r.appendChild(this.fragment.docFrag)},r.prototype={firstNode:function(){return this.fragment.firstNode()},findNextNode:function(){return this.parentFragment.findNextNode(this)},detach:function(){return this.fragment.detach()},teardown:function(t){this.fragment.teardown(t)},toString:function(){return this.fragment.toString()},find:function(t){return this.fragment.find(t)},findAll:function(t,e){return this.fragment.findAll(t,e)},findComponent:function(t){return this.fragment.findComponent(t)},findAllComponents:function(t,e){return this.fragment.findAllComponents(t,e)}},r}(f,kr,Ce),Nr=function(t){var e=function(e,n,r){this.parentFragment=e.parentFragment,this.component=e,this.key=n,this.fragment=new t({descriptor:r,root:e.root,owner:this,contextStack:e.parentFragment.contextStack}),this.selfUpdating=this.fragment.isSimple(),this.value=this.fragment.getValue()}
return e.prototype={bubble:function(){this.selfUpdating?this.update():!this.deferred&&this.ready&&(this.root._deferred.attrs.push(this),this.deferred=!0)},update:function(){var t=this.fragment.getValue()
this.component.instance.set(this.key,t),this.value=t},teardown:function(){this.fragment.teardown()}},e}(en),Or=function(t,e,n,r){function i(i,o,s,a){var u,c,h,f,l
return h=i.root,f=i.parentFragment,"string"==typeof s?(c=e(s),c?c.value:s):null===s?!0:1===s.length&&s[0].t===t.INTERPOLATOR&&s[0].r?f.indexRefs&&void 0!==f.indexRefs[s[0].r]?f.indexRefs[s[0].r]:(l=n(h,s[0].r,f.contextStack)||s[0].r,a.push({childKeypath:o,parentKeypath:l}),h.get(l)):(u=new r(i,o,s),i.complexParameters.push(u),u.value)}return function(t,e,n){var r,o,s
r={},t.complexParameters=[]
for(o in e)e.hasOwnProperty(o)&&(s=i(t,o,e[o],n),void 0!==s&&(r[o]=s))
return r}}(f,Xe,S,Nr),Tr=function(){return function(t,e,n,r,i){var o,s,a,u
return s=t.parentFragment,u=t.root,a={content:i||[]},o=new e({el:s.pNode.cloneNode(!1),data:n,partials:a,_parent:u,adaptors:u.adaptors}),o.component=t,t.instance=o,o.insert(r),o.fragment.pNode=s.pNode,o}}(),Ar=function(){function t(t,n,r){var i,o,s,a,u,c,h
i=t.root,o=t.instance,u=t.observers,c=i.observe(n,function(t){s||i._wrapped[n]||(a=!0,o.set(r,t),a=!1)},e),u.push(c),o.twoway&&(c=o.observe(r,function(t){a||(s=!0,i.set(n,t),s=!1)},e),u.push(c),h=o.get(r),void 0!==h&&i.set(n,h))}var e={init:!1,debug:!0}
return function(e,n){var r,i
for(e.observers=[],i=n.length;i--;)r=n[i],t(e,r.parentKeypath,r.childKeypath)}}(),Rr=function(t){function e(e,r,i,o){if("string"!=typeof o){if(r.debug)throw new Error(n)
return void t(n)}e.on(i,function(){var t=Array.prototype.slice.call(arguments)
t.unshift(o),r.fire.apply(r,t)})}var n="Components currently only support simple events - you cannot include arguments. Sorry!"
return function(t,n){var r
for(r in n)n.hasOwnProperty(r)&&e(t.instance,t.root,r,n[r])}}(M),Cr=function(){return function(t){var e,n
for(e=t.root;e;)(n=e._liveComponentQueries[t.name])&&n.push(t.instance),e=e._parent}}(),Ir=function(t,e,n,r,i,o,s){return function(a,u,c){var h,f,l,p,d
if(h=a.parentFragment=u.parentFragment,f=h.root,a.root=f,a.type=t.COMPONENT,a.name=u.descriptor.e,a.index=u.index,a.observers=[],l=f.components[u.descriptor.e],!l)throw new Error('Component "'+u.descriptor.e+'" not found')
d=[],p=n(a,u.descriptor.a,d),r(a,l,p,c,u.descriptor.f),i(a,d),o(a,u.descriptor.v),(u.descriptor.t1||u.descriptor.t2||u.descriptor.o)&&e('The "intro", "outro" and "decorator" directives have no effect on components'),s(a)}}(f,M,Or,Tr,Ar,Rr,Cr),Lr=function(t){var e=function(e,n){t(this,e,n)}
return e.prototype={firstNode:function(){return this.instance.fragment.firstNode()},findNextNode:function(){return this.parentFragment.findNextNode(this)},detach:function(){return this.instance.fragment.detach()},teardown:function(){for(var t;this.complexParameters.length;)this.complexParameters.pop().teardown()
for(;this.observers.length;)this.observers.pop().cancel();(t=this.root._liveComponentQueries[this.name])&&t._remove(this),this.instance.teardown()},toString:function(){return this.instance.fragment.toString()},find:function(t){return this.instance.fragment.find(t)},findAll:function(t,e){return this.instance.fragment.findAll(t,e)},findComponent:function(t){return t&&t!==this.name?null:this.instance},findAllComponents:function(t,e){e._test(this,!0),this.instance.fragment&&this.instance.fragment.findAllComponents(t,e)}},e}(Ir),jr=function(t){var e=function(e,n){this.type=t.COMMENT,this.descriptor=e.descriptor,n&&(this.node=document.createComment(e.descriptor.f),n.appendChild(this.node))}
return e.prototype={detach:function(){return this.node.parentNode.removeChild(this.node),this.node},teardown:function(t){t&&this.detach()},firstNode:function(){return this.node},toString:function(){return"<!--"+this.descriptor.f+"-->"}},e}(f),Mr=function(t,e,n,r,i,o,s,a,u,c,h,f,l){var p=function(t){t.pNode&&(this.docFrag=document.createDocumentFragment()),"string"==typeof t.descriptor?(this.html=t.descriptor,this.docFrag&&(this.nodes=r(this.html,t.pNode.tagName,this.docFrag))):n(this,t)}
return p.prototype={detach:function(){var t,e
if(this.nodes)for(e=this.nodes.length;e--;)this.docFrag.appendChild(this.nodes[e])
else if(this.items)for(t=this.items.length,e=0;t>e;e+=1)this.docFrag.appendChild(this.items[e].detach())
return this.docFrag},createItem:function(e){if("string"==typeof e.descriptor)return new i(e,this.docFrag)
switch(e.descriptor.t){case t.INTERPOLATOR:return new o(e,this.docFrag)
case t.SECTION:return new s(e,this.docFrag)
case t.TRIPLE:return new a(e,this.docFrag)
case t.ELEMENT:return this.root.components[e.descriptor.e]?new h(e,this.docFrag):new u(e,this.docFrag)
case t.PARTIAL:return new c(e,this.docFrag)
case t.COMMENT:return new f(e,this.docFrag)
default:throw new Error("Something very strange happened. Please file an issue at https://github.com/RactiveJS/Ractive/issues. Thanks!")}},teardown:function(t){var e
if(this.nodes&&t)for(;e=this.nodes.pop();)e.parentNode.removeChild(e)
else if(this.items)for(;this.items.length;)this.items.pop().teardown(t)
this.nodes=this.items=this.docFrag=null},firstNode:function(){return this.items&&this.items[0]?this.items[0].firstNode():this.nodes?this.nodes[0]||null:null},findNextNode:function(t){var e=t.index
return this.items[e+1]?this.items[e+1].firstNode():this.owner===this.root?this.owner.component?this.owner.component.findNextNode():null:this.owner.findNextNode(this)},toString:function(){var t,e,n,r
if(this.html)return this.html
if(t="",!this.items)return t
for(n=this.items.length,e=0;n>e;e+=1)r=this.items[e],t+=r.toString()
return t},find:function(t){var n,r,i,o,s
if(this.nodes){for(r=this.nodes.length,n=0;r>n;n+=1)if(o=this.nodes[n],1===o.nodeType){if(e(o,t))return o
if(s=o.querySelector(t))return s}return null}if(this.items){for(r=this.items.length,n=0;r>n;n+=1)if(i=this.items[n],i.find&&(s=i.find(t)))return s
return null}},findAll:function(t,n){var r,i,o,s,a,u,c
if(this.nodes){for(i=this.nodes.length,r=0;i>r;r+=1)if(s=this.nodes[r],1===s.nodeType&&(e(s,t)&&n.push(s),a=s.querySelectorAll(t)))for(u=a.length,c=0;u>c;c+=1)n.push(a[c])}else if(this.items)for(i=this.items.length,r=0;i>r;r+=1)o=this.items[r],o.findAll&&o.findAll(t,n)
return n},findComponent:function(t){var e,n,r,i
if(this.items){for(e=this.items.length,n=0;e>n;n+=1)if(r=this.items[n],r.findComponent&&(i=r.findComponent(t)))return i
return null}},findAllComponents:function(t,e){var n,r,i
if(this.items)for(r=this.items.length,n=0;r>n;n+=1)i=this.items[n],i.findAllComponents&&i.findAllComponents(t,e)
return e}},l.DomFragment=p,p}(f,Y,fe,le,pe,Ne,Ie,Le,kn,Sr,Lr,jr,Ce),Pr=function(t,e,n,r,i){return function(t,o){var s
if(!this._initing)throw new Error("You cannot call ractive.render() directly!")
this._transitionManager=s=e(this,o),this.fragment=new i({descriptor:this.template,root:this,owner:this,pNode:t}),n(this),t&&t.appendChild(this.fragment.docFrag),r(this),this._transitionManager=null,s.ready(),this.rendered=!0}}(he,m,g,v,Mr),Fr=function(t){return function(){return t("renderHTML() has been deprecated and will be removed in a future version. Please use toHTML() instead"),this.toHTML()}}(M),Br=function(){return function(){return this.fragment.toString()}}(),Dr=function(t,e){return function(n){var r,i,o
for(this.fire("teardown"),o=this._transitionManager,this._transitionManager=i=t(this,n),this.fragment.teardown(!0);this._animations[0];)this._animations[0].stop()
for(r in this._cache)e(this,r)
this._transitionManager=o,i.ready()}}(m,p),Ur=function(t){return function(e,n,r){var i
if("string"==typeof n&&t(r)){if(i=e.get(n),void 0===i&&(i=0),t(i))e.set(n,i+r)
else if(e.debug)throw new Error("Cannot add to a non-numeric value")}else if(e.debug)throw new Error("Bad arguments")}}(P),qr=function(t){return function(e,n){t(this,e,void 0===n?1:n)}}(Ur),Wr=function(t){return function(e,n){t(this,e,void 0===n?-1:-n)}}(Ur),Kr=function(){return function(t){var e
if("string"==typeof t)e=this.get(t),this.set(t,!e)
else if(this.debug)throw new Error("Bad arguments")}}(),zr=function(){return function(t,e){var n,r,i,o,s
return n={},i=0,r=function(t,r){var o,a,u
a=i,u=e.length
do{if(o=e.indexOf(t,a),-1===o)return s=!0,-1
a=o+1}while(n[o]&&u>a)
return o===i&&(i+=1),o!==r&&(s=!0),n[o]=!0,o},o=t.map(r),o.unchanged=!s,o}}(),Vr=function(t){return function(e,n,r,i){var o,s
for(o=n.length;o--;)s=n[o],s.type===t.REFERENCE?s.update():s.keypath===e&&s.type===t.SECTION&&!s.inverted&&s.docFrag?r[r.length]=s:i[i.length]=s}}(f),Hr=function(t,e,n,r,i,o,s,a,u,c){function h(t){return JSON.stringify(t)}function f(t){return l[t]||(l[t]=function(e){return e[t]}),l[t]}var l={}
return function(l,p,d){var g,v,m,y,b,w,E,_,x,k,S,N,O,T,A
if(g=this.get(l),!e(g)||!e(p))return this.set(l,p,d&&d.complete)
if(b=g.length===p.length,d&&d.compare){if(d.compare===!0)y=h
else if("string"==typeof d.compare)y=f(d.compare)
else{if("function"!=typeof d.compare)throw new Error("The `compare` option must be a function, or a string representing an identifying field (or `true` to use JSON.stringify)")
y=d.compare}try{v=g.map(y),m=p.map(y)}catch(R){if(this.debug)throw R
t("Merge operation: comparison failed. Falling back to identity checking"),v=g,m=p}}else v=g,m=p
if(E=u(v,m),n(this,l),a(this,l,p),!E.unchanged||!b){for(O=this._transitionManager,this._transitionManager=N=o(this,d&&d.complete),_=[],x=[],w=0;w<this._deps.length;w+=1)if(k=this._deps[w],k&&(S=k[l])){for(c(l,S,_,x),r(this);_.length;)_.pop().merge(E)
for(;x.length;)x.pop().update()}for(i(this),T=[],A=l.split(".");A.length;)A.pop(),T[T.length]=A.join(".")
s.multiple(this,T,!0),v.length!==m.length&&s(this,l+".length",!0),this._transitionManager=O,N.ready()}}}(M,l,p,g,O,m,y,T,zr,Vr),Jr=function(){return function(){return this.fragment.detach()}}(),$r=function(t){return function(e,n){if(e=t(e),n=t(n)||null,!e)throw new Error("You must specify a valid target to insert into")
e.insertBefore(this.detach(),n),this.fragment.pNode=e}}(he),Gr=function(t,e,n,r,i,o,s,a,u,c,h,f,l,p,d,g,v,m,y,b,w,E,_){return{get:t,set:e,update:n,updateModel:r,animate:i,on:o,off:s,observe:a,fire:u,find:c,findAll:h,findComponent:f,findAllComponents:l,renderHTML:d,toHTML:g,render:p,teardown:v,add:m,subtract:y,toggle:b,merge:w,detach:E,insert:_}}(_,A,R,I,U,q,W,G,X,Q,ae,ue,ce,Pr,Fr,Br,Dr,qr,Wr,Kr,Hr,Jr,$r),Xr=function(){return["partials","transitions","events","components","decorators","data"]}(),Qr=function(){return["el","template","complete","modifyArrays","magic","twoway","lazy","append","preserveWhitespace","sanitize","stripComments","noIntro","transitionsEnabled","adaptors"]}(),Yr=function(t,e,n){return function(r,i){t.forEach(function(t){i[t]&&(r[t]=n(i[t]))}),e.forEach(function(t){r[t]=i[t]})}}(Xr,Qr,r),Zr=function(){return function(t,e){return/_super/.test(t)?function(){var n,r=this._super
return this._super=e,n=t.apply(this,arguments),this._super=r,n}:t}}(),ti=function(){return function(t,e){var n
for(n in e)e.hasOwnProperty(n)&&(t[n]=e[n])
return t}}(),ei=function(t,e,n,r){var i,o
return i=t.concat(e),o={},i.forEach(function(t){o[t]=!0}),function(i,s){var a,u
t.forEach(function(t){var e=s[t]
e&&(i[t]?r(i[t],e):i[t]=e)}),e.forEach(function(t){var e=s[t]
void 0!==e&&(i[t]="function"==typeof e&&"function"==typeof i[t]?n(e,i[t]):s[t])})
for(a in s)s.hasOwnProperty(a)&&!o[a]&&(u=s[a],i.prototype[a]="function"==typeof u&&"function"==typeof i.prototype[a]?n(u,i.prototype[a]):u)}}(Xr,Qr,Zr,ti),ni=function(t,e){return function(n,r){t(n.template)&&(n.partials||(n.partials={}),e(n.partials,n.template.partials),r.partials&&e(n.partials,r.partials),n.template=n.template.main)}}(x,ti),ri=function(t,e,n){return function(r){var i
if("string"==typeof r.template){if(!n)throw new Error(t.missingParser)
if("#"===r.template.charAt(0)&&e){if(i=document.getElementById(r.template.substring(1)),!i||"SCRIPT"!==i.tagName)throw new Error("Could not find template element ("+r.template+")")
r.template=n(i.innerHTML,r)}else r.template=n(r.template,r)}}}(Sn,s,xr),ii=function(t,e){return function(n){var r
if(n.partials)for(r in n.partials)if(n.partials.hasOwnProperty(r)&&"string"==typeof n.partials[r]){if(!e)throw new Error(t.missingParser)
n.partials[r]=e(n.partials[r],n)}}}(Sn,xr),oi=function(){return function(t){var e,n={}
for(e in t)t.hasOwnProperty(e)&&(n[e]=t[e])
return n}}(),si=function(){return function(t){for(var e,n,r=Array.prototype.slice.call(arguments,1);n=r.shift();)for(e in n)n.hasOwnProperty(e)&&(t[e]=n[e])
return t}}(),ai=function(t,e,n,r,i,o,s,a,u,c,h){var f,l,p,d
return f=function(){return{}},l=function(){return[]},p=r(null),s(p,{preserveWhitespace:{enumerable:!0,value:!1},append:{enumerable:!0,value:!1},twoway:{enumerable:!0,value:!0},modifyArrays:{enumerable:!0,value:!0},data:{enumerable:!0,value:f},lazy:{enumerable:!0,value:!1},debug:{enumerable:!0,value:!1},transitions:{enumerable:!0,value:f},decorators:{enumerable:!0,value:f},events:{enumerable:!0,value:f},noIntro:{enumerable:!0,value:!1},transitionsEnabled:{enumerable:!0,value:!0},magic:{enumerable:!0,value:!1},adaptors:{enumerable:!0,value:l}}),d=["components","decorators","events","partials","transitions","data"],function(f,l){var g,v,m,y
for(g in p)void 0===l[g]&&(l[g]="function"==typeof p[g]?p[g]():p[g])
if(s(f,{_initing:{value:!0,writable:!0},_guid:{value:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e,n
return e=16*Math.random()|0,n="x"==t?e:3&e|8,n.toString(16)})},_subs:{value:r(null),configurable:!0},_cache:{value:{}},_cacheMap:{value:r(null)},_deps:{value:[]},_depsMap:{value:r(null)},_patternObservers:{value:[]},_pendingResolution:{value:[]},_deferred:{value:{}},_evaluators:{value:r(null)},_twowayBindings:{value:{}},_transitionManager:{value:null,writable:!0},_animations:{value:[]},nodes:{value:{}},_wrapped:{value:r(null)},_liveQueries:{value:[]},_liveComponentQueries:{value:[]}}),s(f._deferred,{attrs:{value:[]},evals:{value:[]},selectValues:{value:[]},checkboxes:{value:[]},radios:{value:[]},observers:{value:[]},transitions:{value:[]},liveQueries:{value:[]},decorators:{value:[]},focusable:{value:null,writable:!0}}),f.adaptors=l.adaptors,f.modifyArrays=l.modifyArrays,f.magic=l.magic,f.twoway=l.twoway,f.lazy=l.lazy,f.debug=l.debug,f.magic&&!c)throw new Error("Getters and setters (magic mode) are not supported in this browser")
if(l._parent&&o(f,"_parent",{value:l._parent}),l.el&&(f.el=a(l.el),!f.el&&f.debug))throw new Error("Could not find container element")
if(l.eventDefinitions&&(n("ractive.eventDefinitions has been deprecated in favour of ractive.events. Support will be removed in future versions"),l.events=l.eventDefinitions),d.forEach(function(t){f.constructor[t]?f[t]=i(r(f.constructor[t]||{}),l[t]):l[t]&&(f[t]=l[t])}),v=l.template,"string"==typeof v){if(!h)throw new Error(e.missingParser)
if("#"===v.charAt(0)&&t){if(m=document.getElementById(v.substring(1)),!m)throw new Error("Could not find template element ("+v+")")
y=h(m.innerHTML,l)}else y=h(v,l)}else y=v
u(y)&&(i(f.partials,y.partials),y=y.main),y&&1===y.length&&"string"==typeof y[0]&&(y=y[0]),f.template=y,i(f.partials,l.partials),f.parseOptions={preserveWhitespace:l.preserveWhitespace,sanitize:l.sanitize,stripComments:l.stripComments},f.transitionsEnabled=l.noIntro?!1:l.transitionsEnabled,t&&!f.el&&(f.el=document.createDocumentFragment()),f.el&&!l.append&&(f.el.innerHTML=""),f.render(f.el,l.complete),f.transitionsEnabled=l.transitionsEnabled,f._initing=!1}}(s,Sn,M,r,si,a,u,he,x,w,xr),ui=function(t,e,n,r,i){return function(t,n,o){e.forEach(function(t){var e=o[t],i=n[t]
"function"==typeof e&&"function"==typeof i?o[t]=r(e,i):void 0===e&&void 0!==i&&(o[t]=i)}),t.beforeInit&&t.beforeInit(o),i(t,o),t.init&&t.init(o)}}(ln,Qr,oi,Zr,ai),ci=function(t,e,n,r,i,o,s,a){var u
return a.push(function(){u=a.Ractive}),function(a){var u,c=this
return u=function(t){s(this,u,t||{})},u.prototype=t(c.prototype),u.prototype.constructor=u,e(u,c),n(u,a),i(u),r(u,a),o(u),u.extend=c.extend,u}}(r,Yr,ei,ni,ri,ii,ui,Ce),hi=function(t,e,n,r,i,o,s,a,u,c,h){var f=function(t){c(this,t)}
return n(f,{prototype:{value:r},partials:{value:i},adaptors:{value:o},easing:{value:s},transitions:{value:{}},events:{value:{}},components:{value:{}},decorators:{value:{}},svg:{value:t},VERSION:{value:"0.3.9"}}),f.eventDefinitions=f.events,f.prototype.constructor=f,f.delimiters=["{{","}}"],f.tripleDelimiters=["{{{","}}}"],f.extend=a,f.parse=u,h.Ractive=f,f}(n,r,u,Gr,Nn,h,D,ci,xr,ai,Ce),fi=function(t,e){for("undefined"!=typeof window&&window.Node&&!window.Node.prototype.contains&&window.HTMLElement&&window.HTMLElement.prototype.contains&&(window.Node.prototype.contains=window.HTMLElement.prototype.contains);e.length;)e.pop()()
return t}(hi,Ce)
"undefined"!=typeof e&&e.exports?e.exports=fi:"function"==typeof define&&define.amd?define(function(){return fi}):t.Ractive=fi}("undefined"!=typeof window?window:this)},{}],100:[function(){},{}],101:[function(t,e,n){function r(t,e,n){if(!(this instanceof r))return new r(t,e,n)
var i=typeof t
if("base64"===e&&"string"===i)for(t=T(t);t.length%4!==0;)t+="="
var o
if("number"===i)o=R(t)
else if("string"===i)o=r.byteLength(t,e)
else{if("object"!==i)throw new Error("First argument needs to be a number, array or string.")
o=R(t.length)}var s
r._useTypedArrays?s=r._augment(new Uint8Array(o)):(s=this,s.length=o,s._isBuffer=!0)
var a
if(r._useTypedArrays&&"number"==typeof t.byteLength)s._set(t)
else if(I(t))for(a=0;o>a;a++)s[a]=r.isBuffer(t)?t.readUInt8(a):t[a]
else if("string"===i)s.write(t,0,e)
else if("number"===i&&!r._useTypedArrays&&!n)for(a=0;o>a;a++)s[a]=0
return s}function i(t,e,n,r){n=Number(n)||0
var i=t.length-n
r?(r=Number(r),r>i&&(r=i)):r=i
var o=e.length
K(o%2===0,"Invalid hex string"),r>o/2&&(r=o/2)
for(var s=0;r>s;s++){var a=parseInt(e.substr(2*s,2),16)
K(!isNaN(a),"Invalid hex string"),t[n+s]=a}return s}function o(t,e,n,r){var i=B(j(e),t,n,r)
return i}function s(t,e,n,r){var i=B(M(e),t,n,r)
return i}function a(t,e,n,r){return s(t,e,n,r)}function u(t,e,n,r){var i=B(F(e),t,n,r)
return i}function c(t,e,n,r){var i=B(P(e),t,n,r)
return i}function h(t,e,n){return z.fromByteArray(0===e&&n===t.length?t:t.slice(e,n))}function f(t,e,n){var r="",i=""
n=Math.min(t.length,n)
for(var o=e;n>o;o++)t[o]<=127?(r+=D(i)+String.fromCharCode(t[o]),i=""):i+="%"+t[o].toString(16)
return r+D(i)}function l(t,e,n){var r=""
n=Math.min(t.length,n)
for(var i=e;n>i;i++)r+=String.fromCharCode(t[i])
return r}function p(t,e,n){return l(t,e,n)}function d(t,e,n){var r=t.length;(!e||0>e)&&(e=0),(!n||0>n||n>r)&&(n=r)
for(var i="",o=e;n>o;o++)i+=L(t[o])
return i}function g(t,e,n){for(var r=t.slice(e,n),i="",o=0;o<r.length;o+=2)i+=String.fromCharCode(r[o]+256*r[o+1])
return i}function v(t,e,n,r){r||(K("boolean"==typeof n,"missing or invalid endian"),K(void 0!==e&&null!==e,"missing offset"),K(e+1<t.length,"Trying to read beyond buffer length"))
var i=t.length
if(!(e>=i)){var o
return n?(o=t[e],i>e+1&&(o|=t[e+1]<<8)):(o=t[e]<<8,i>e+1&&(o|=t[e+1])),o}}function m(t,e,n,r){r||(K("boolean"==typeof n,"missing or invalid endian"),K(void 0!==e&&null!==e,"missing offset"),K(e+3<t.length,"Trying to read beyond buffer length"))
var i=t.length
if(!(e>=i)){var o
return n?(i>e+2&&(o=t[e+2]<<16),i>e+1&&(o|=t[e+1]<<8),o|=t[e],i>e+3&&(o+=t[e+3]<<24>>>0)):(i>e+1&&(o=t[e+1]<<16),i>e+2&&(o|=t[e+2]<<8),i>e+3&&(o|=t[e+3]),o+=t[e]<<24>>>0),o}}function y(t,e,n,r){r||(K("boolean"==typeof n,"missing or invalid endian"),K(void 0!==e&&null!==e,"missing offset"),K(e+1<t.length,"Trying to read beyond buffer length"))
var i=t.length
if(!(e>=i)){var o=v(t,e,n,!0),s=32768&o
return s?-1*(65535-o+1):o}}function b(t,e,n,r){r||(K("boolean"==typeof n,"missing or invalid endian"),K(void 0!==e&&null!==e,"missing offset"),K(e+3<t.length,"Trying to read beyond buffer length"))
var i=t.length
if(!(e>=i)){var o=m(t,e,n,!0),s=2147483648&o
return s?-1*(4294967295-o+1):o}}function w(t,e,n,r){return r||(K("boolean"==typeof n,"missing or invalid endian"),K(e+3<t.length,"Trying to read beyond buffer length")),V.read(t,e,n,23,4)}function E(t,e,n,r){return r||(K("boolean"==typeof n,"missing or invalid endian"),K(e+7<t.length,"Trying to read beyond buffer length")),V.read(t,e,n,52,8)}function _(t,e,n,r,i){i||(K(void 0!==e&&null!==e,"missing value"),K("boolean"==typeof r,"missing or invalid endian"),K(void 0!==n&&null!==n,"missing offset"),K(n+1<t.length,"trying to write beyond buffer length"),U(e,65535))
var o=t.length
if(!(n>=o)){for(var s=0,a=Math.min(o-n,2);a>s;s++)t[n+s]=(e&255<<8*(r?s:1-s))>>>8*(r?s:1-s)
return n+2}}function x(t,e,n,r,i){i||(K(void 0!==e&&null!==e,"missing value"),K("boolean"==typeof r,"missing or invalid endian"),K(void 0!==n&&null!==n,"missing offset"),K(n+3<t.length,"trying to write beyond buffer length"),U(e,4294967295))
var o=t.length
if(!(n>=o)){for(var s=0,a=Math.min(o-n,4);a>s;s++)t[n+s]=e>>>8*(r?s:3-s)&255
return n+4}}function k(t,e,n,r,i){i||(K(void 0!==e&&null!==e,"missing value"),K("boolean"==typeof r,"missing or invalid endian"),K(void 0!==n&&null!==n,"missing offset"),K(n+1<t.length,"Trying to write beyond buffer length"),q(e,32767,-32768))
var o=t.length
if(!(n>=o))return e>=0?_(t,e,n,r,i):_(t,65535+e+1,n,r,i),n+2}function S(t,e,n,r,i){i||(K(void 0!==e&&null!==e,"missing value"),K("boolean"==typeof r,"missing or invalid endian"),K(void 0!==n&&null!==n,"missing offset"),K(n+3<t.length,"Trying to write beyond buffer length"),q(e,2147483647,-2147483648))
var o=t.length
if(!(n>=o))return e>=0?x(t,e,n,r,i):x(t,4294967295+e+1,n,r,i),n+4}function N(t,e,n,r,i){i||(K(void 0!==e&&null!==e,"missing value"),K("boolean"==typeof r,"missing or invalid endian"),K(void 0!==n&&null!==n,"missing offset"),K(n+3<t.length,"Trying to write beyond buffer length"),W(e,3.4028234663852886e38,-3.4028234663852886e38))
var o=t.length
if(!(n>=o))return V.write(t,e,n,r,23,4),n+4}function O(t,e,n,r,i){i||(K(void 0!==e&&null!==e,"missing value"),K("boolean"==typeof r,"missing or invalid endian"),K(void 0!==n&&null!==n,"missing offset"),K(n+7<t.length,"Trying to write beyond buffer length"),W(e,1.7976931348623157e308,-1.7976931348623157e308))
var o=t.length
if(!(n>=o))return V.write(t,e,n,r,52,8),n+8}function T(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function A(t,e,n){return"number"!=typeof t?n:(t=~~t,t>=e?e:t>=0?t:(t+=e,t>=0?t:0))}function R(t){return t=~~Math.ceil(+t),0>t?0:t}function C(t){return(Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)})(t)}function I(t){return C(t)||r.isBuffer(t)||t&&"object"==typeof t&&"number"==typeof t.length}function L(t){return 16>t?"0"+t.toString(16):t.toString(16)}function j(t){for(var e=[],n=0;n<t.length;n++){var r=t.charCodeAt(n)
if(127>=r)e.push(r)
else{var i=n
r>=55296&&57343>=r&&n++
for(var o=encodeURIComponent(t.slice(i,n+1)).substr(1).split("%"),s=0;s<o.length;s++)e.push(parseInt(o[s],16))}}return e}function M(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n))
return e}function P(t){for(var e,n,r,i=[],o=0;o<t.length;o++)e=t.charCodeAt(o),n=e>>8,r=e%256,i.push(r),i.push(n)
return i}function F(t){return z.toByteArray(t)}function B(t,e,n,r){for(var i=0;r>i&&!(i+n>=e.length||i>=t.length);i++)e[i+n]=t[i]
return i}function D(t){try{return decodeURIComponent(t)}catch(e){return String.fromCharCode(65533)}}function U(t,e){K("number"==typeof t,"cannot write a non-number as a number"),K(t>=0,"specified a negative value for writing an unsigned value"),K(e>=t,"value is larger than maximum value for type"),K(Math.floor(t)===t,"value has a fractional component")}function q(t,e,n){K("number"==typeof t,"cannot write a non-number as a number"),K(e>=t,"value larger than maximum allowed value"),K(t>=n,"value smaller than minimum allowed value"),K(Math.floor(t)===t,"value has a fractional component")}function W(t,e,n){K("number"==typeof t,"cannot write a non-number as a number"),K(e>=t,"value larger than maximum allowed value"),K(t>=n,"value smaller than minimum allowed value")}function K(t,e){if(!t)throw new Error(e||"Failed assertion")}var z=t("base64-js"),V=t("ieee754")
n.Buffer=r,n.SlowBuffer=r,n.INSPECT_MAX_BYTES=50,r.poolSize=8192,r._useTypedArrays=function(){try{var t=new ArrayBuffer(0),e=new Uint8Array(t)
return e.foo=function(){return 42},42===e.foo()&&"function"==typeof e.subarray}catch(n){return!1}}(),r.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0
default:return!1}},r.isBuffer=function(t){return!(null===t||void 0===t||!t._isBuffer)},r.byteLength=function(t,e){var n
switch(t=t.toString(),e||"utf8"){case"hex":n=t.length/2
break
case"utf8":case"utf-8":n=j(t).length
break
case"ascii":case"binary":case"raw":n=t.length
break
case"base64":n=F(t).length
break
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*t.length
break
default:throw new Error("Unknown encoding")}return n},r.concat=function(t,e){if(K(C(t),"Usage: Buffer.concat(list[, length])"),0===t.length)return new r(0)
if(1===t.length)return t[0]
var n
if(void 0===e)for(e=0,n=0;n<t.length;n++)e+=t[n].length
var i=new r(e),o=0
for(n=0;n<t.length;n++){var s=t[n]
s.copy(i,o),o+=s.length}return i},r.compare=function(t,e){K(r.isBuffer(t)&&r.isBuffer(e),"Arguments must be Buffers")
for(var n=t.length,i=e.length,o=0,s=Math.min(n,i);s>o&&t[o]===e[o];o++);return o!==s&&(n=t[o],i=e[o]),i>n?-1:n>i?1:0},r.prototype.write=function(t,e,n,r){if(isFinite(e))isFinite(n)||(r=n,n=void 0)
else{var h=r
r=e,e=n,n=h}e=Number(e)||0
var f=this.length-e
n?(n=Number(n),n>f&&(n=f)):n=f,r=String(r||"utf8").toLowerCase()
var l
switch(r){case"hex":l=i(this,t,e,n)
break
case"utf8":case"utf-8":l=o(this,t,e,n)
break
case"ascii":l=s(this,t,e,n)
break
case"binary":l=a(this,t,e,n)
break
case"base64":l=u(this,t,e,n)
break
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":l=c(this,t,e,n)
break
default:throw new Error("Unknown encoding")}return l},r.prototype.toString=function(t,e,n){var r=this
if(t=String(t||"utf8").toLowerCase(),e=Number(e)||0,n=void 0===n?r.length:Number(n),n===e)return""
var i
switch(t){case"hex":i=d(r,e,n)
break
case"utf8":case"utf-8":i=f(r,e,n)
break
case"ascii":i=l(r,e,n)
break
case"binary":i=p(r,e,n)
break
case"base64":i=h(r,e,n)
break
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":i=g(r,e,n)
break
default:throw new Error("Unknown encoding")}return i},r.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},r.prototype.equals=function(t){return K(r.isBuffer(t),"Argument must be a Buffer"),0===r.compare(this,t)},r.prototype.compare=function(t){return K(r.isBuffer(t),"Argument must be a Buffer"),r.compare(this,t)},r.prototype.copy=function(t,e,n,i){var o=this
if(n||(n=0),i||0===i||(i=this.length),e||(e=0),i!==n&&0!==t.length&&0!==o.length){K(i>=n,"sourceEnd < sourceStart"),K(e>=0&&e<t.length,"targetStart out of bounds"),K(n>=0&&n<o.length,"sourceStart out of bounds"),K(i>=0&&i<=o.length,"sourceEnd out of bounds"),i>this.length&&(i=this.length),t.length-e<i-n&&(i=t.length-e+n)
var s=i-n
if(100>s||!r._useTypedArrays)for(var a=0;s>a;a++)t[a+e]=this[a+n]
else t._set(this.subarray(n,n+s),e)}},r.prototype.slice=function(t,e){var n=this.length
if(t=A(t,n,0),e=A(e,n,n),r._useTypedArrays)return r._augment(this.subarray(t,e))
for(var i=e-t,o=new r(i,void 0,!0),s=0;i>s;s++)o[s]=this[s+t]
return o},r.prototype.get=function(t){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(t)},r.prototype.set=function(t,e){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(t,e)},r.prototype.readUInt8=function(t,e){return e||(K(void 0!==t&&null!==t,"missing offset"),K(t<this.length,"Trying to read beyond buffer length")),t>=this.length?void 0:this[t]},r.prototype.readUInt16LE=function(t,e){return v(this,t,!0,e)},r.prototype.readUInt16BE=function(t,e){return v(this,t,!1,e)},r.prototype.readUInt32LE=function(t,e){return m(this,t,!0,e)},r.prototype.readUInt32BE=function(t,e){return m(this,t,!1,e)},r.prototype.readInt8=function(t,e){if(e||(K(void 0!==t&&null!==t,"missing offset"),K(t<this.length,"Trying to read beyond buffer length")),!(t>=this.length)){var n=128&this[t]
return n?-1*(255-this[t]+1):this[t]}},r.prototype.readInt16LE=function(t,e){return y(this,t,!0,e)},r.prototype.readInt16BE=function(t,e){return y(this,t,!1,e)},r.prototype.readInt32LE=function(t,e){return b(this,t,!0,e)},r.prototype.readInt32BE=function(t,e){return b(this,t,!1,e)},r.prototype.readFloatLE=function(t,e){return w(this,t,!0,e)},r.prototype.readFloatBE=function(t,e){return w(this,t,!1,e)},r.prototype.readDoubleLE=function(t,e){return E(this,t,!0,e)},r.prototype.readDoubleBE=function(t,e){return E(this,t,!1,e)},r.prototype.writeUInt8=function(t,e,n){return n||(K(void 0!==t&&null!==t,"missing value"),K(void 0!==e&&null!==e,"missing offset"),K(e<this.length,"trying to write beyond buffer length"),U(t,255)),e>=this.length?void 0:(this[e]=t,e+1)},r.prototype.writeUInt16LE=function(t,e,n){return _(this,t,e,!0,n)},r.prototype.writeUInt16BE=function(t,e,n){return _(this,t,e,!1,n)},r.prototype.writeUInt32LE=function(t,e,n){return x(this,t,e,!0,n)},r.prototype.writeUInt32BE=function(t,e,n){return x(this,t,e,!1,n)},r.prototype.writeInt8=function(t,e,n){return n||(K(void 0!==t&&null!==t,"missing value"),K(void 0!==e&&null!==e,"missing offset"),K(e<this.length,"Trying to write beyond buffer length"),q(t,127,-128)),e>=this.length?void 0:(t>=0?this.writeUInt8(t,e,n):this.writeUInt8(255+t+1,e,n),e+1)},r.prototype.writeInt16LE=function(t,e,n){return k(this,t,e,!0,n)},r.prototype.writeInt16BE=function(t,e,n){return k(this,t,e,!1,n)},r.prototype.writeInt32LE=function(t,e,n){return S(this,t,e,!0,n)},r.prototype.writeInt32BE=function(t,e,n){return S(this,t,e,!1,n)},r.prototype.writeFloatLE=function(t,e,n){return N(this,t,e,!0,n)},r.prototype.writeFloatBE=function(t,e,n){return N(this,t,e,!1,n)},r.prototype.writeDoubleLE=function(t,e,n){return O(this,t,e,!0,n)},r.prototype.writeDoubleBE=function(t,e,n){return O(this,t,e,!1,n)},r.prototype.fill=function(t,e,n){if(t||(t=0),e||(e=0),n||(n=this.length),K(n>=e,"end < start"),n!==e&&0!==this.length){K(e>=0&&e<this.length,"start out of bounds"),K(n>=0&&n<=this.length,"end out of bounds")
var r
if("number"==typeof t)for(r=e;n>r;r++)this[r]=t
else{var i=j(t.toString()),o=i.length
for(r=e;n>r;r++)this[r]=i[r%o]}return this}},r.prototype.inspect=function(){for(var t=[],e=this.length,r=0;e>r;r++)if(t[r]=L(this[r]),r===n.INSPECT_MAX_BYTES){t[r+1]="..."
break}return"<Buffer "+t.join(" ")+">"},r.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(r._useTypedArrays)return new r(this).buffer
for(var t=new Uint8Array(this.length),e=0,n=t.length;n>e;e+=1)t[e]=this[e]
return t.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")}
var H=r.prototype
r._augment=function(t){return t._isBuffer=!0,t._get=t.get,t._set=t.set,t.get=H.get,t.set=H.set,t.write=H.write,t.toString=H.toString,t.toLocaleString=H.toString,t.toJSON=H.toJSON,t.equals=H.equals,t.compare=H.compare,t.copy=H.copy,t.slice=H.slice,t.readUInt8=H.readUInt8,t.readUInt16LE=H.readUInt16LE,t.readUInt16BE=H.readUInt16BE,t.readUInt32LE=H.readUInt32LE,t.readUInt32BE=H.readUInt32BE,t.readInt8=H.readInt8,t.readInt16LE=H.readInt16LE,t.readInt16BE=H.readInt16BE,t.readInt32LE=H.readInt32LE,t.readInt32BE=H.readInt32BE,t.readFloatLE=H.readFloatLE,t.readFloatBE=H.readFloatBE,t.readDoubleLE=H.readDoubleLE,t.readDoubleBE=H.readDoubleBE,t.writeUInt8=H.writeUInt8,t.writeUInt16LE=H.writeUInt16LE,t.writeUInt16BE=H.writeUInt16BE,t.writeUInt32LE=H.writeUInt32LE,t.writeUInt32BE=H.writeUInt32BE,t.writeInt8=H.writeInt8,t.writeInt16LE=H.writeInt16LE,t.writeInt16BE=H.writeInt16BE,t.writeInt32LE=H.writeInt32LE,t.writeInt32BE=H.writeInt32BE,t.writeFloatLE=H.writeFloatLE,t.writeFloatBE=H.writeFloatBE,t.writeDoubleLE=H.writeDoubleLE,t.writeDoubleBE=H.writeDoubleBE,t.fill=H.fill,t.inspect=H.inspect,t.toArrayBuffer=H.toArrayBuffer,t}},{"base64-js":102,ieee754:103}],102:[function(t,e){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
!function(){"use strict"
function t(t){var e=t.charCodeAt(0)
return e===s?62:e===a?63:u>e?-1:u+10>e?e-u+26+26:h+26>e?e-h:c+26>e?e-c+26:void 0}function r(e){function n(t){c[f++]=t}var r,i,s,a,u,c
if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4")
var h=e.length
u="="===e.charAt(h-2)?2:"="===e.charAt(h-1)?1:0,c=new o(3*e.length/4-u),s=u>0?e.length-4:e.length
var f=0
for(r=0,i=0;s>r;r+=4,i+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a)
return 2===u?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===u&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),c}function i(t){function e(t){return n.charAt(t)}function r(t){return e(t>>18&63)+e(t>>12&63)+e(t>>6&63)+e(63&t)}var i,o,s,a=t.length%3,u=""
for(i=0,s=t.length-a;s>i;i+=3)o=(t[i]<<16)+(t[i+1]<<8)+t[i+2],u+=r(o)
switch(a){case 1:o=t[t.length-1],u+=e(o>>2),u+=e(o<<4&63),u+="=="
break
case 2:o=(t[t.length-2]<<8)+t[t.length-1],u+=e(o>>10),u+=e(o>>4&63),u+=e(o<<2&63),u+="="}return u}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,s=("0".charCodeAt(0),"+".charCodeAt(0)),a="/".charCodeAt(0),u="0".charCodeAt(0),c="a".charCodeAt(0),h="A".charCodeAt(0)
e.exports.toByteArray=r,e.exports.fromByteArray=i}()},{}],103:[function(t,e,n){n.read=function(t,e,n,r,i){var o,s,a=8*i-r-1,u=(1<<a)-1,c=u>>1,h=-7,f=n?i-1:0,l=n?-1:1,p=t[e+f]
for(f+=l,o=p&(1<<-h)-1,p>>=-h,h+=a;h>0;o=256*o+t[e+f],f+=l,h-=8);for(s=o&(1<<-h)-1,o>>=-h,h+=r;h>0;s=256*s+t[e+f],f+=l,h-=8);if(0===o)o=1-c
else{if(o===u)return s?0/0:1/0*(p?-1:1)
s+=Math.pow(2,r),o-=c}return(p?-1:1)*s*Math.pow(2,o-r)},n.write=function(t,e,n,r,i,o){var s,a,u,c=8*o-i-1,h=(1<<c)-1,f=h>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=r?0:o-1,d=r?1:-1,g=0>e||0===e&&0>1/e?1:0
for(e=Math.abs(e),isNaN(e)||1/0===e?(a=isNaN(e)?1:0,s=h):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),e+=s+f>=1?l/u:l*Math.pow(2,1-f),e*u>=2&&(s++,u/=2),s+f>=h?(a=0,s=h):s+f>=1?(a=(e*u-1)*Math.pow(2,i),s+=f):(a=e*Math.pow(2,f-1)*Math.pow(2,i),s=0));i>=8;t[n+p]=255&a,p+=d,a/=256,i-=8);for(s=s<<i|a,c+=i;c>0;t[n+p]=255&s,p+=d,s/=256,c-=8);t[n+p-d]|=128*g}},{}],104:[function(t,e){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(t){return"function"==typeof t}function i(t){return"number"==typeof t}function o(t){return"object"==typeof t&&null!==t}function s(t){return void 0===t}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(t){if(!i(t)||0>t||isNaN(t))throw TypeError("n must be a positive number")
return this._maxListeners=t,this},n.prototype.emit=function(t){var e,n,i,a,u,c
if(this._events||(this._events={}),"error"===t&&(!this._events.error||o(this._events.error)&&!this._events.error.length))throw e=arguments[1],e instanceof Error?e:TypeError('Uncaught, unspecified "error" event.')
if(n=this._events[t],s(n))return!1
if(r(n))switch(arguments.length){case 1:n.call(this)
break
case 2:n.call(this,arguments[1])
break
case 3:n.call(this,arguments[1],arguments[2])
break
default:for(i=arguments.length,a=new Array(i-1),u=1;i>u;u++)a[u-1]=arguments[u]
n.apply(this,a)}else if(o(n)){for(i=arguments.length,a=new Array(i-1),u=1;i>u;u++)a[u-1]=arguments[u]
for(c=n.slice(),i=c.length,u=0;i>u;u++)c[u].apply(this,a)}return!0},n.prototype.addListener=function(t,e){var i
if(!r(e))throw TypeError("listener must be a function")
if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,r(e.listener)?e.listener:e),this._events[t]?o(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,o(this._events[t])&&!this._events[t].warned){var i
i=s(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,i&&i>0&&this._events[t].length>i&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace())}return this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(t,e){function n(){this.removeListener(t,n),i||(i=!0,e.apply(this,arguments))}if(!r(e))throw TypeError("listener must be a function")
var i=!1
return n.listener=e,this.on(t,n),this},n.prototype.removeListener=function(t,e){var n,i,s,a
if(!r(e))throw TypeError("listener must be a function")
if(!this._events||!this._events[t])return this
if(n=this._events[t],s=n.length,i=-1,n===e||r(n.listener)&&n.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e)
else if(o(n)){for(a=s;a-->0;)if(n[a]===e||n[a].listener&&n[a].listener===e){i=a
break}if(0>i)return this
1===n.length?(n.length=0,delete this._events[t]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},n.prototype.removeAllListeners=function(t){var e,n
if(!this._events)return this
if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this
if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e)
return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[t],r(n))this.removeListener(t,n)
else for(;n.length;)this.removeListener(t,n[n.length-1])
return delete this._events[t],this},n.prototype.listeners=function(t){var e
return e=this._events&&this._events[t]?r(this._events[t])?[this._events[t]]:this._events[t].slice():[]},n.listenerCount=function(t,e){var n
return n=t._events&&t._events[e]?r(t._events[e])?1:t._events[e].length:0}},{}],105:[function(t,e){var n=e.exports,r=(t("events").EventEmitter,t("./lib/request")),i=t("url")
n.request=function(t,e){"string"==typeof t&&(t=i.parse(t)),t||(t={}),t.host||t.port||(t.port=parseInt(window.location.port,10)),!t.host&&t.hostname&&(t.host=t.hostname),t.scheme||(t.scheme=window.location.protocol.split(":")[0]),t.host||(t.host=window.location.hostname||window.location.host),/:/.test(t.host)&&(t.port||(t.port=t.host.split(":")[1]),t.host=t.host.split(":")[0]),t.port||(t.port="https"==t.scheme?443:80)
var n=new r(new o,t)
return e&&n.on("response",e),n},n.get=function(t,e){t.method="GET"
var r=n.request(t,e)
return r.end(),r},n.Agent=function(){},n.Agent.defaultMaxSockets=4
var o=function(){if("undefined"==typeof window)throw new Error("no window object present")
if(window.XMLHttpRequest)return window.XMLHttpRequest
if(window.ActiveXObject){for(var t=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Microsoft.XMLHTTP"],e=0;e<t.length;e++)try{var n=new window.ActiveXObject(t[e])
return function(){if(n){var r=n
return n=null,r}return new window.ActiveXObject(t[e])}}catch(r){}throw new Error("ajax not supported in this browser")}throw new Error("ajax not supported in this browser")}()
n.STATUS_CODES={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",300:"Multiple Choices",301:"Moved Permanently",302:"Moved Temporarily",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Time-out",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Request Entity Too Large",414:"Request-URI Too Large",415:"Unsupported Media Type",416:"Requested Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Unordered Collection",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Time-out",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"}},{"./lib/request":106,events:104,url:129}],106:[function(t,e){var n=t("stream"),r=t("./response"),i=t("Base64"),o=t("inherits"),s=e.exports=function(t,e){var n=this
n.writable=!0,n.xhr=t,n.body=[],n.uri=(e.scheme||"http")+"://"+e.host+(e.port?":"+e.port:"")+(e.path||"/"),"undefined"==typeof e.withCredentials&&(e.withCredentials=!0)
try{t.withCredentials=e.withCredentials}catch(o){}if(t.open(e.method||"GET",n.uri,!0),n._headers={},e.headers)for(var s=a(e.headers),u=0;u<s.length;u++){var c=s[u]
if(n.isSafeRequestHeader(c)){var h=e.headers[c]
n.setHeader(c,h)}}e.auth&&this.setHeader("Authorization","Basic "+i.btoa(e.auth))
var f=new r
f.on("close",function(){n.emit("close")}),f.on("ready",function(){n.emit("response",f)}),t.onreadystatechange=function(){t.__aborted||f.handle(t)}}
o(s,n),s.prototype.setHeader=function(t,e){this._headers[t.toLowerCase()]=e},s.prototype.getHeader=function(t){return this._headers[t.toLowerCase()]},s.prototype.removeHeader=function(t){delete this._headers[t.toLowerCase()]},s.prototype.write=function(t){this.body.push(t)},s.prototype.destroy=function(){this.xhr.__aborted=!0,this.xhr.abort(),this.emit("close")},s.prototype.end=function(t){void 0!==t&&this.body.push(t)
for(var e=a(this._headers),n=0;n<e.length;n++){var r=e[n],i=this._headers[r]
if(u(i))for(var o=0;o<i.length;o++)this.xhr.setRequestHeader(r,i[o])
else this.xhr.setRequestHeader(r,i)}if(0===this.body.length)this.xhr.send("")
else if("string"==typeof this.body[0])this.xhr.send(this.body.join(""))
else if(u(this.body[0])){for(var s=[],n=0;n<this.body.length;n++)s.push.apply(s,this.body[n])
this.xhr.send(s)}else if(/Array/.test(Object.prototype.toString.call(this.body[0]))){for(var c=0,n=0;n<this.body.length;n++)c+=this.body[n].length
for(var s=new this.body[0].constructor(c),h=0,n=0;n<this.body.length;n++)for(var f=this.body[n],o=0;o<f.length;o++)s[h++]=f[o]
this.xhr.send(s)}else{for(var s="",n=0;n<this.body.length;n++)s+=this.body[n].toString()
this.xhr.send(s)}},s.unsafeHeaders=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","content-transfer-encoding","date","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"],s.prototype.isSafeRequestHeader=function(t){return t?-1===c(s.unsafeHeaders,t.toLowerCase()):!1}
var a=Object.keys||function(t){var e=[]
for(var n in t)e.push(n)
return e},u=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},c=function(t,e){if(t.indexOf)return t.indexOf(e)
for(var n=0;n<t.length;n++)if(t[n]===e)return n
return-1}},{"./response":107,Base64:108,inherits:109,stream:128}],107:[function(t,e){function n(t){for(var e=t.getAllResponseHeaders().split(/\r?\n/),n={},r=0;r<e.length;r++){var i=e[r]
if(""!==i){var o=i.match(/^([^:]+):\s*(.*)/)
if(o){var s=o[1].toLowerCase(),u=o[2]
void 0!==n[s]?a(n[s])?n[s].push(u):n[s]=[n[s],u]:n[s]=u}else n[i]=!0}}return n}var r=t("stream"),i=t("util"),o=e.exports=function(){this.offset=0,this.readable=!0}
i.inherits(o,r)
var s={streaming:!0,status2:!0}
o.prototype.getResponse=function(t){var e=String(t.responseType).toLowerCase()
return"blob"===e?t.responseBlob||t.response:"arraybuffer"===e?t.response:t.responseText},o.prototype.getHeader=function(t){return this.headers[t.toLowerCase()]},o.prototype.handle=function(t){if(2===t.readyState&&s.status2){try{this.statusCode=t.status,this.headers=n(t)}catch(e){s.status2=!1}s.status2&&this.emit("ready")}else if(s.streaming&&3===t.readyState){try{this.statusCode||(this.statusCode=t.status,this.headers=n(t),this.emit("ready"))}catch(e){}try{this._emitData(t)}catch(e){s.streaming=!1}}else 4===t.readyState&&(this.statusCode||(this.statusCode=t.status,this.emit("ready")),this._emitData(t),t.error?this.emit("error",this.getResponse(t)):this.emit("end"),this.emit("close"))},o.prototype._emitData=function(t){var e=this.getResponse(t)
return e.toString().match(/ArrayBuffer/)?(this.emit("data",new Uint8Array(e,this.offset)),void(this.offset=e.byteLength)):void(e.length>this.offset&&(this.emit("data",e.slice(this.offset)),this.offset=e.length))}
var a=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},{stream:128,util:131}],108:[function(t,e,n){!function(){function t(t){this.message=t}var e="undefined"!=typeof n?n:this,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
t.prototype=new Error,t.prototype.name="InvalidCharacterError",e.btoa||(e.btoa=function(e){for(var n,i,o=0,s=r,a="";e.charAt(0|o)||(s="=",o%1);a+=s.charAt(63&n>>8-o%1*8)){if(i=e.charCodeAt(o+=.75),i>255)throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.")
n=n<<8|i}return a}),e.atob||(e.atob=function(e){if(e=e.replace(/=+$/,""),e.length%4==1)throw new t("'atob' failed: The string to be decoded is not correctly encoded.")
for(var n,i,o=0,s=0,a="";i=e.charAt(s++);~i&&(n=o%4?64*n+i:i,o++%4)?a+=String.fromCharCode(255&n>>(-2*o&6)):0)i=r.indexOf(i)
return a})}()},{}],109:[function(t,e){e.exports=t(32)},{}],110:[function(t,e){function n(){}var r=e.exports={}
r.nextTick=function(){var t="undefined"!=typeof window&&window.setImmediate,e="undefined"!=typeof window&&window.postMessage&&window.addEventListener
if(t)return function(t){return window.setImmediate(t)}
if(e){var n=[]
return window.addEventListener("message",function(t){var e=t.source
if((e===window||null===e)&&"process-tick"===t.data&&(t.stopPropagation(),n.length>0)){var r=n.shift()
r()}},!0),function(t){n.push(t),window.postMessage("process-tick","*")}}return function(t){setTimeout(t,0)}}(),r.title="browser",r.browser=!0,r.env={},r.argv=[],r.on=n,r.addListener=n,r.once=n,r.off=n,r.removeListener=n,r.removeAllListeners=n,r.emit=n,r.binding=function(){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(){throw new Error("process.chdir is not supported")}},{}],111:[function(t,e,n){(function(t){!function(r){function i(t){throw RangeError(L[t])}function o(t,e){for(var n=t.length;n--;)t[n]=e(t[n])
return t}function s(t,e){return o(t.split(I),e).join(".")}function a(t){for(var e,n,r=[],i=0,o=t.length;o>i;)e=t.charCodeAt(i++),e>=55296&&56319>=e&&o>i?(n=t.charCodeAt(i++),56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),i--)):r.push(e)
return r}function u(t){return o(t,function(t){var e=""
return t>65535&&(t-=65536,e+=P(t>>>10&1023|55296),t=56320|1023&t),e+=P(t)}).join("")}function c(t){return 10>t-48?t-22:26>t-65?t-65:26>t-97?t-97:_}function h(t,e){return t+22+75*(26>t)-((0!=e)<<5)}function f(t,e,n){var r=0
for(t=n?M(t/N):t>>1,t+=M(t/e);t>j*k>>1;r+=_)t=M(t/j)
return M(r+(j+1)*t/(t+S))}function l(t){var e,n,r,o,s,a,h,l,p,d,g=[],v=t.length,m=0,y=T,b=O
for(n=t.lastIndexOf(A),0>n&&(n=0),r=0;n>r;++r)t.charCodeAt(r)>=128&&i("not-basic"),g.push(t.charCodeAt(r))
for(o=n>0?n+1:0;v>o;){for(s=m,a=1,h=_;o>=v&&i("invalid-input"),l=c(t.charCodeAt(o++)),(l>=_||l>M((E-m)/a))&&i("overflow"),m+=l*a,p=b>=h?x:h>=b+k?k:h-b,!(p>l);h+=_)d=_-p,a>M(E/d)&&i("overflow"),a*=d
e=g.length+1,b=f(m-s,e,0==s),M(m/e)>E-y&&i("overflow"),y+=M(m/e),m%=e,g.splice(m++,0,y)}return u(g)}function p(t){var e,n,r,o,s,u,c,l,p,d,g,v,m,y,b,w=[]
for(t=a(t),v=t.length,e=T,n=0,s=O,u=0;v>u;++u)g=t[u],128>g&&w.push(P(g))
for(r=o=w.length,o&&w.push(A);v>r;){for(c=E,u=0;v>u;++u)g=t[u],g>=e&&c>g&&(c=g)
for(m=r+1,c-e>M((E-n)/m)&&i("overflow"),n+=(c-e)*m,e=c,u=0;v>u;++u)if(g=t[u],e>g&&++n>E&&i("overflow"),g==e){for(l=n,p=_;d=s>=p?x:p>=s+k?k:p-s,!(d>l);p+=_)b=l-d,y=_-d,w.push(P(h(d+b%y,0))),l=M(b/y)
w.push(P(h(l,0))),s=f(n,m,r==o),n=0,++r}++n,++e}return w.join("")}function d(t){return s(t,function(t){return R.test(t)?l(t.slice(4).toLowerCase()):t})}function g(t){return s(t,function(t){return C.test(t)?"xn--"+p(t):t})}var v="object"==typeof n&&n,m="object"==typeof e&&e&&e.exports==v&&e,y="object"==typeof t&&t;(y.global===y||y.window===y)&&(r=y)
var b,w,E=2147483647,_=36,x=1,k=26,S=38,N=700,O=72,T=128,A="-",R=/^xn--/,C=/[^ -~]/,I=/\x2E|\u3002|\uFF0E|\uFF61/g,L={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},j=_-x,M=Math.floor,P=String.fromCharCode
if(b={version:"1.2.4",ucs2:{decode:a,encode:u},decode:l,encode:p,toASCII:g,toUnicode:d},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return b})
else if(v&&!v.nodeType)if(m)m.exports=b
else for(w in b)b.hasOwnProperty(w)&&(v[w]=b[w])
else r.punycode=b}(this)}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],112:[function(t,e){"use strict"
function n(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.exports=function(t,e,i,o){e=e||"&",i=i||"="
var s={}
if("string"!=typeof t||0===t.length)return s
var a=/\+/g
t=t.split(e)
var u=1e3
o&&"number"==typeof o.maxKeys&&(u=o.maxKeys)
var c=t.length
u>0&&c>u&&(c=u)
for(var h=0;c>h;++h){var f,l,p,d,g=t[h].replace(a,"%20"),v=g.indexOf(i)
v>=0?(f=g.substr(0,v),l=g.substr(v+1)):(f=g,l=""),p=decodeURIComponent(f),d=decodeURIComponent(l),n(s,p)?r(s[p])?s[p].push(d):s[p]=[s[p],d]:s[p]=d}return s}
var r=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},{}],113:[function(t,e){"use strict"
function n(t,e){if(t.map)return t.map(e)
for(var n=[],r=0;r<t.length;r++)n.push(e(t[r],r))
return n}var r=function(t){switch(typeof t){case"string":return t
case"boolean":return t?"true":"false"
case"number":return isFinite(t)?t:""
default:return""}}
e.exports=function(t,e,s,a){return e=e||"&",s=s||"=",null===t&&(t=void 0),"object"==typeof t?n(o(t),function(o){var a=encodeURIComponent(r(o))+s
return i(t[o])?n(t[o],function(t){return a+encodeURIComponent(r(t))}).join(e):a+encodeURIComponent(r(t[o]))}).join(e):a?encodeURIComponent(r(a))+s+encodeURIComponent(r(t)):""}
var i=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},o=Object.keys||function(t){var e=[]
for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n)
return e}},{}],114:[function(t,e,n){"use strict"
n.decode=n.parse=t("./decode"),n.encode=n.stringify=t("./encode")},{"./decode":112,"./encode":113}],115:[function(t,e){e.exports=t("./lib/_stream_duplex.js")},{"./lib/_stream_duplex.js":116}],116:[function(t,e){e.exports=t(26)},{"+0JsKK":110,"./_stream_readable":118,"./_stream_writable":120,"core-util-is":121,inherits:109}],117:[function(t,e){e.exports=t(27)},{"./_stream_transform":119,"core-util-is":121,inherits:109}],118:[function(t,e){e.exports=t(28)},{"+0JsKK":110,buffer:101,"core-util-is":121,events:104,inherits:109,isarray:122,stream:128,"string_decoder/":123}],119:[function(t,e){e.exports=t(29)},{"./_stream_duplex":116,"core-util-is":121,inherits:109}],120:[function(t,e){e.exports=t(30)},{"+0JsKK":110,"./_stream_duplex":116,buffer:101,"core-util-is":121,inherits:109,stream:128}],121:[function(t,e){e.exports=t(31)},{buffer:101}],122:[function(t,e){e.exports=t(33)},{}],123:[function(t,e){e.exports=t(34)},{buffer:101}],124:[function(t,e){e.exports=t("./lib/_stream_passthrough.js")},{"./lib/_stream_passthrough.js":117}],125:[function(t,e){e.exports=t(35)},{"./lib/_stream_duplex.js":116,"./lib/_stream_passthrough.js":117,"./lib/_stream_readable.js":118,"./lib/_stream_transform.js":119,"./lib/_stream_writable.js":120}],126:[function(t,e){e.exports=t("./lib/_stream_transform.js")},{"./lib/_stream_transform.js":119}],127:[function(t,e){e.exports=t("./lib/_stream_writable.js")},{"./lib/_stream_writable.js":120}],128:[function(t,e){function n(){r.call(this)}e.exports=n
var r=t("events").EventEmitter,i=t("inherits")
i(n,r),n.Readable=t("readable-stream/readable.js"),n.Writable=t("readable-stream/writable.js"),n.Duplex=t("readable-stream/duplex.js"),n.Transform=t("readable-stream/transform.js"),n.PassThrough=t("readable-stream/passthrough.js"),n.Stream=n,n.prototype.pipe=function(t,e){function n(e){t.writable&&!1===t.write(e)&&c.pause&&c.pause()}function i(){c.readable&&c.resume&&c.resume()}function o(){h||(h=!0,t.end())}function s(){h||(h=!0,"function"==typeof t.destroy&&t.destroy())}function a(t){if(u(),0===r.listenerCount(this,"error"))throw t}function u(){c.removeListener("data",n),t.removeListener("drain",i),c.removeListener("end",o),c.removeListener("close",s),c.removeListener("error",a),t.removeListener("error",a),c.removeListener("end",u),c.removeListener("close",u),t.removeListener("close",u)}var c=this
c.on("data",n),t.on("drain",i),t._isStdio||e&&e.end===!1||(c.on("end",o),c.on("close",s))
var h=!1
return c.on("error",a),t.on("error",a),c.on("end",u),c.on("close",u),t.on("close",u),t.emit("pipe",c),t}},{events:104,inherits:109,"readable-stream/duplex.js":115,"readable-stream/passthrough.js":124,"readable-stream/readable.js":125,"readable-stream/transform.js":126,"readable-stream/writable.js":127}],129:[function(t,e,n){function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function i(t,e,n){if(t&&c(t)&&t instanceof r)return t
var i=new r
return i.parse(t,e,n),i}function o(t){return u(t)&&(t=i(t)),t instanceof r?t.format():r.prototype.format.call(t)}function s(t,e){return i(t,!1,!0).resolve(e)}function a(t,e){return t?i(t,!1,!0).resolveObject(e):e}function u(t){return"string"==typeof t}function c(t){return"object"==typeof t&&null!==t}function h(t){return null===t}function f(t){return null==t}var l=t("punycode")
n.parse=i,n.resolve=s,n.resolveObject=a,n.format=o,n.Url=r
var p=/^([a-z0-9.+-]+:)/i,d=/:[0-9]*$/,g=["<",">",'"',"`"," ","\r","\n","	"],v=["{","}","|","\\","^","`"].concat(g),m=["'"].concat(v),y=["%","/","?",";","#"].concat(m),b=["/","?","#"],w=255,E=/^[a-z0-9A-Z_-]{0,63}$/,_=/^([a-z0-9A-Z_-]{0,63})(.*)$/,x={javascript:!0,"javascript:":!0},k={javascript:!0,"javascript:":!0},S={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},N=t("querystring")
r.prototype.parse=function(t,e,n){if(!u(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t)
var r=t
r=r.trim()
var i=p.exec(r)
if(i){i=i[0]
var o=i.toLowerCase()
this.protocol=o,r=r.substr(i.length)}if(n||i||r.match(/^\/\/[^@\/]+@[^@\/]+/)){var s="//"===r.substr(0,2)
!s||i&&k[i]||(r=r.substr(2),this.slashes=!0)}if(!k[i]&&(s||i&&!S[i])){for(var a=-1,c=0;c<b.length;c++){var h=r.indexOf(b[c]);-1!==h&&(-1===a||a>h)&&(a=h)}var f,d
d=-1===a?r.lastIndexOf("@"):r.lastIndexOf("@",a),-1!==d&&(f=r.slice(0,d),r=r.slice(d+1),this.auth=decodeURIComponent(f)),a=-1
for(var c=0;c<y.length;c++){var h=r.indexOf(y[c]);-1!==h&&(-1===a||a>h)&&(a=h)}-1===a&&(a=r.length),this.host=r.slice(0,a),r=r.slice(a),this.parseHost(),this.hostname=this.hostname||""
var g="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1]
if(!g)for(var v=this.hostname.split(/\./),c=0,O=v.length;O>c;c++){var T=v[c]
if(T&&!T.match(E)){for(var A="",R=0,C=T.length;C>R;R++)A+=T.charCodeAt(R)>127?"x":T[R]
if(!A.match(E)){var I=v.slice(0,c),L=v.slice(c+1),j=T.match(_)
j&&(I.push(j[1]),L.unshift(j[2])),L.length&&(r="/"+L.join(".")+r),this.hostname=I.join(".")
break}}}if(this.hostname=this.hostname.length>w?"":this.hostname.toLowerCase(),!g){for(var M=this.hostname.split("."),P=[],c=0;c<M.length;++c){var F=M[c]
P.push(F.match(/[^A-Za-z0-9_-]/)?"xn--"+l.encode(F):F)}this.hostname=P.join(".")}var B=this.port?":"+this.port:"",D=this.hostname||""
this.host=D+B,this.href+=this.host,g&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==r[0]&&(r="/"+r))}if(!x[o])for(var c=0,O=m.length;O>c;c++){var U=m[c],q=encodeURIComponent(U)
q===U&&(q=escape(U)),r=r.split(U).join(q)}var W=r.indexOf("#");-1!==W&&(this.hash=r.substr(W),r=r.slice(0,W))
var K=r.indexOf("?")
if(-1!==K?(this.search=r.substr(K),this.query=r.substr(K+1),e&&(this.query=N.parse(this.query)),r=r.slice(0,K)):e&&(this.search="",this.query={}),r&&(this.pathname=r),S[o]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var B=this.pathname||"",F=this.search||""
this.path=B+F}return this.href=this.format(),this},r.prototype.format=function(){var t=this.auth||""
t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@")
var e=this.protocol||"",n=this.pathname||"",r=this.hash||"",i=!1,o=""
this.host?i=t+this.host:this.hostname&&(i=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(i+=":"+this.port)),this.query&&c(this.query)&&Object.keys(this.query).length&&(o=N.stringify(this.query))
var s=this.search||o&&"?"+o||""
return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||S[e])&&i!==!1?(i="//"+(i||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):i||(i=""),r&&"#"!==r.charAt(0)&&(r="#"+r),s&&"?"!==s.charAt(0)&&(s="?"+s),n=n.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),s=s.replace("#","%23"),e+i+n+s+r},r.prototype.resolve=function(t){return this.resolveObject(i(t,!1,!0)).format()},r.prototype.resolveObject=function(t){if(u(t)){var e=new r
e.parse(t,!1,!0),t=e}var n=new r
if(Object.keys(this).forEach(function(t){n[t]=this[t]},this),n.hash=t.hash,""===t.href)return n.href=n.format(),n
if(t.slashes&&!t.protocol)return Object.keys(t).forEach(function(e){"protocol"!==e&&(n[e]=t[e])}),S[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n
if(t.protocol&&t.protocol!==n.protocol){if(!S[t.protocol])return Object.keys(t).forEach(function(e){n[e]=t[e]}),n.href=n.format(),n
if(n.protocol=t.protocol,t.host||k[t.protocol])n.pathname=t.pathname
else{for(var i=(t.pathname||"").split("/");i.length&&!(t.host=i.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==i[0]&&i.unshift(""),i.length<2&&i.unshift(""),n.pathname=i.join("/")}if(n.search=t.search,n.query=t.query,n.host=t.host||"",n.auth=t.auth,n.hostname=t.hostname||t.host,n.port=t.port,n.pathname||n.search){var o=n.pathname||"",s=n.search||""
n.path=o+s}return n.slashes=n.slashes||t.slashes,n.href=n.format(),n}var a=n.pathname&&"/"===n.pathname.charAt(0),c=t.host||t.pathname&&"/"===t.pathname.charAt(0),l=c||a||n.host&&t.pathname,p=l,d=n.pathname&&n.pathname.split("/")||[],i=t.pathname&&t.pathname.split("/")||[],g=n.protocol&&!S[n.protocol]
if(g&&(n.hostname="",n.port=null,n.host&&(""===d[0]?d[0]=n.host:d.unshift(n.host)),n.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===i[0]?i[0]=t.host:i.unshift(t.host)),t.host=null),l=l&&(""===i[0]||""===d[0])),c)n.host=t.host||""===t.host?t.host:n.host,n.hostname=t.hostname||""===t.hostname?t.hostname:n.hostname,n.search=t.search,n.query=t.query,d=i
else if(i.length)d||(d=[]),d.pop(),d=d.concat(i),n.search=t.search,n.query=t.query
else if(!f(t.search)){if(g){n.hostname=n.host=d.shift()
var v=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1
v&&(n.auth=v.shift(),n.host=n.hostname=v.shift())}return n.search=t.search,n.query=t.query,h(n.pathname)&&h(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!d.length)return n.pathname=null,n.path=n.search?"/"+n.search:null,n.href=n.format(),n
for(var m=d.slice(-1)[0],y=(n.host||t.host)&&("."===m||".."===m)||""===m,b=0,w=d.length;w>=0;w--)m=d[w],"."==m?d.splice(w,1):".."===m?(d.splice(w,1),b++):b&&(d.splice(w,1),b--)
if(!l&&!p)for(;b--;b)d.unshift("..")
!l||""===d[0]||d[0]&&"/"===d[0].charAt(0)||d.unshift(""),y&&"/"!==d.join("/").substr(-1)&&d.push("")
var E=""===d[0]||d[0]&&"/"===d[0].charAt(0)
if(g){n.hostname=n.host=E?"":d.length?d.shift():""
var v=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1
v&&(n.auth=v.shift(),n.host=n.hostname=v.shift())}return l=l||n.host&&d.length,l&&!E&&d.unshift(""),d.length?n.pathname=d.join("/"):(n.pathname=null,n.path=null),h(n.pathname)&&h(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=t.auth||n.auth,n.slashes=n.slashes||t.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){var t=this.host,e=d.exec(t)
e&&(e=e[0],":"!==e&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},{punycode:111,querystring:114}],130:[function(t,e){e.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},{}],131:[function(t,e,n){(function(e,r){function i(t,e){var r={seen:[],stylize:s}
return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),g(e)?r.showHidden=e:e&&n._extend(r,e),E(r.showHidden)&&(r.showHidden=!1),E(r.depth)&&(r.depth=2),E(r.colors)&&(r.colors=!1),E(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=o),u(r,t,r.depth)}function o(t,e){var n=i.styles[e]
return n?"["+i.colors[n][0]+"m"+t+"["+i.colors[n][1]+"m":t}function s(t){return t}function a(t){var e={}
return t.forEach(function(t){e[t]=!0}),e}function u(t,e,r){if(t.customInspect&&e&&N(e.inspect)&&e.inspect!==n.inspect&&(!e.constructor||e.constructor.prototype!==e)){var i=e.inspect(r,t)
return b(i)||(i=u(t,i,r)),i}var o=c(t,e)
if(o)return o
var s=Object.keys(e),g=a(s)
if(t.showHidden&&(s=Object.getOwnPropertyNames(e)),S(e)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return h(e)
if(0===s.length){if(N(e)){var v=e.name?": "+e.name:""
return t.stylize("[Function"+v+"]","special")}if(_(e))return t.stylize(RegExp.prototype.toString.call(e),"regexp")
if(k(e))return t.stylize(Date.prototype.toString.call(e),"date")
if(S(e))return h(e)}var m="",y=!1,w=["{","}"]
if(d(e)&&(y=!0,w=["[","]"]),N(e)){var E=e.name?": "+e.name:""
m=" [Function"+E+"]"}if(_(e)&&(m=" "+RegExp.prototype.toString.call(e)),k(e)&&(m=" "+Date.prototype.toUTCString.call(e)),S(e)&&(m=" "+h(e)),0===s.length&&(!y||0==e.length))return w[0]+m+w[1]
if(0>r)return _(e)?t.stylize(RegExp.prototype.toString.call(e),"regexp"):t.stylize("[Object]","special")
t.seen.push(e)
var x
return x=y?f(t,e,r,g,s):s.map(function(n){return l(t,e,r,g,n,y)}),t.seen.pop(),p(x,m,w)}function c(t,e){if(E(e))return t.stylize("undefined","undefined")
if(b(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'"
return t.stylize(n,"string")}return y(e)?t.stylize(""+e,"number"):g(e)?t.stylize(""+e,"boolean"):v(e)?t.stylize("null","null"):void 0}function h(t){return"["+Error.prototype.toString.call(t)+"]"}function f(t,e,n,r,i){for(var o=[],s=0,a=e.length;a>s;++s)o.push(C(e,String(s))?l(t,e,n,r,String(s),!0):"")
return i.forEach(function(i){i.match(/^\d+$/)||o.push(l(t,e,n,r,i,!0))}),o}function l(t,e,n,r,i,o){var s,a,c
if(c=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]},c.get?a=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(a=t.stylize("[Setter]","special")),C(r,i)||(s="["+i+"]"),a||(t.seen.indexOf(c.value)<0?(a=v(n)?u(t,c.value,null):u(t,c.value,n-1),a.indexOf("\n")>-1&&(a=o?a.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+a.split("\n").map(function(t){return"   "+t}).join("\n"))):a=t.stylize("[Circular]","special")),E(s)){if(o&&i.match(/^\d+$/))return a
s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=t.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=t.stylize(s,"string"))}return s+": "+a}function p(t,e,n){var r=0,i=t.reduce(function(t,e){return r++,e.indexOf("\n")>=0&&r++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0)
return i>60?n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1]:n[0]+e+" "+t.join(", ")+" "+n[1]}function d(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function v(t){return null===t}function m(t){return null==t}function y(t){return"number"==typeof t}function b(t){return"string"==typeof t}function w(t){return"symbol"==typeof t}function E(t){return void 0===t}function _(t){return x(t)&&"[object RegExp]"===T(t)}function x(t){return"object"==typeof t&&null!==t}function k(t){return x(t)&&"[object Date]"===T(t)}function S(t){return x(t)&&("[object Error]"===T(t)||t instanceof Error)}function N(t){return"function"==typeof t}function O(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||"undefined"==typeof t}function T(t){return Object.prototype.toString.call(t)}function A(t){return 10>t?"0"+t.toString(10):t.toString(10)}function R(){var t=new Date,e=[A(t.getHours()),A(t.getMinutes()),A(t.getSeconds())].join(":")
return[t.getDate(),M[t.getMonth()],e].join(" ")}function C(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var I=/%[sdj%]/g
n.format=function(t){if(!b(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(i(arguments[n]))
return e.join(" ")}for(var n=1,r=arguments,o=r.length,s=String(t).replace(I,function(t){if("%%"===t)return"%"
if(n>=o)return t
switch(t){case"%s":return String(r[n++])
case"%d":return Number(r[n++])
case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return t}}),a=r[n];o>n;a=r[++n])s+=v(a)||!x(a)?" "+a:" "+i(a)
return s},n.deprecate=function(t,i){function o(){if(!s){if(e.throwDeprecation)throw new Error(i)
e.traceDeprecation?console.trace(i):console.error(i),s=!0}return t.apply(this,arguments)}if(E(r.process))return function(){return n.deprecate(t,i).apply(this,arguments)}
if(e.noDeprecation===!0)return t
var s=!1
return o}
var L,j={}
n.debuglog=function(t){if(E(L)&&(L=e.env.NODE_DEBUG||""),t=t.toUpperCase(),!j[t])if(new RegExp("\\b"+t+"\\b","i").test(L)){var r=e.pid
j[t]=function(){var e=n.format.apply(n,arguments)
console.error("%s %d: %s",t,r,e)}}else j[t]=function(){}
return j[t]},n.inspect=i,i.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},i.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},n.isArray=d,n.isBoolean=g,n.isNull=v,n.isNullOrUndefined=m,n.isNumber=y,n.isString=b,n.isSymbol=w,n.isUndefined=E,n.isRegExp=_,n.isObject=x,n.isDate=k,n.isError=S,n.isFunction=N,n.isPrimitive=O,n.isBuffer=t("./support/isBuffer")
var M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
n.log=function(){console.log("%s - %s",R(),n.format.apply(n,arguments))},n.inherits=t("inherits"),n._extend=function(t,e){if(!e||!x(e))return t
for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]]
return t}}).call(this,t("+0JsKK"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"+0JsKK":110,"./support/isBuffer":130,inherits:109}]},{},[2])

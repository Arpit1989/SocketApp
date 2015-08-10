if("undefined"!=typeof responsiveVoice){console.log("ResponsiveVoice already loaded"),console.log(responsiveVoice)}else{var ResponsiveVoice=function(){var b=this;b.version="1.3.4";console.log("ResponsiveVoice r"+b.version);b.responsivevoices=[{name:"UK English Female",voiceIDs:[3,5,1,6,7,8]},{name:"UK English Male",voiceIDs:[0,4,2,6,7,8]},{name:"US English Female",voiceIDs:[39,40,41,42,43,44]},{name:"Spanish Female",voiceIDs:[19,16,17,18,20,15]},{name:"French Female",voiceIDs:[21,22,23,26]},{name:"Deutsch Female",voiceIDs:[27,28,29,30,31,32]},{name:"Italian Female",voiceIDs:[33,34,35,36,37,38]},{name:"Greek Female",voiceIDs:[62,63,64]},{name:"Hungarian Female",voiceIDs:[9,10,11]},{name:"Russian Female",voiceIDs:[47,48,49]},{name:"Dutch Female",voiceIDs:[45]},{name:"Swedish Female",voiceIDs:[65]},{name:"Japanese Female",voiceIDs:[50,51,52,53]},{name:"Korean Female",voiceIDs:[54,55,56,57]},{name:"Chinese Female",voiceIDs:[58,59,60,61]},{name:"Hindi Female",voiceIDs:[66,67]},{name:"Serbian Male",voiceIDs:[12]},{name:"Croatian Male",voiceIDs:[13]},{name:"Bosnian Male",voiceIDs:[14]},{name:"Romanian Male",voiceIDs:[46]},{name:"Catalan Male",voiceIDs:[68]},{name:"Fallback UK Female",voiceIDs:[8]}];b.voicecollection=[{name:"Google UK English Male"},{name:"Agnes"},{name:"Daniel Compact"},{name:"Google UK English Female"},{name:"en-GB",rate:0.25,pitch:1},{name:"en-AU",rate:0.25,pitch:1},{name:"ingl\u00e9s Reino Unido"},{name:"English United Kingdom"},{name:"Fallback en-GB Female",lang:"en-GB",fallbackvoice:!0},{name:"Eszter Compact"},{name:"hu-HU",rate:0.4},{name:"Fallback Hungarian",lang:"hu",fallbackvoice:!0},{name:"Fallback Serbian",lang:"sr",fallbackvoice:!0},{name:"Fallback Croatian",lang:"hr",fallbackvoice:!0},{name:"Fallback Bosnian",lang:"bs",fallbackvoice:!0},{name:"Fallback Spanish",lang:"es",fallbackvoice:!0},{name:"Spanish Spain"},{name:"espa\u00f1ol Espa\u00f1a"},{name:"Diego Compact",rate:0.3},{name:"Google Espa\u00f1ol"},{name:"es-ES",rate:0.2},{name:"Google Fran\u00e7ais"},{name:"French France"},{name:"franc\u00e9s Francia"},{name:"Virginie Compact",rate:0.5},{name:"fr-FR",rate:0.25},{name:"Fallback French",lang:"fr",fallbackvoice:!0},{name:"Google Deutsch"},{name:"German Germany"},{name:"alem\u00e1n Alemania"},{name:"Yannick Compact",rate:0.5},{name:"de-DE",rate:0.25},{name:"Fallback Deutsch",lang:"de",fallbackvoice:!0},{name:"Google Italiano"},{name:"Italian Italy"},{name:"italiano Italia"},{name:"Paolo Compact",rate:0.5},{name:"it-IT",rate:0.25},{name:"Fallback Italian",lang:"it",fallbackvoice:!0},{name:"Google US English",timerSpeed:1},{name:"English United States"},{name:"ingl\u00e9s Estados Unidos"},{name:"Vicki"},{name:"en-US",rate:0.2,pitch:1,timerSpeed:1.3},{name:"Fallback English",lang:"en-US",fallbackvoice:!0,timerSpeed:0},{name:"Fallback Dutch",lang:"nl",fallbackvoice:!0,timerSpeed:0},{name:"Fallback Romanian",lang:"ro",fallbackvoice:!0},{name:"Milena Compact"},{name:"ru-RU",rate:0.25},{name:"Fallback Russian",lang:"ru",fallbackvoice:!0},{name:"Google \u65e5\u672c\u4eba",timerSpeed:1},{name:"Kyoko Compact"},{name:"ja-JP",rate:0.25},{name:"Fallback Japanese",lang:"ja",fallbackvoice:!0},{name:"Google \ud55c\uad6d\uc758",timerSpeed:1},{name:"Narae Compact"},{name:"ko-KR",rate:0.25},{name:"Fallback Korean",lang:"ko",fallbackvoice:!0},{name:"Google \u4e2d\u56fd\u7684",timerSpeed:1},{name:"Ting-Ting Compact"},{name:"zh-CN",rate:0.25},{name:"Fallback Chinese",lang:"zh-CN",fallbackvoice:!0},{name:"Alexandros Compact"},{name:"el-GR",rate:0.25},{name:"Fallback Greek",lang:"el",fallbackvoice:!0},{name:"Fallback Swedish",lang:"sv",fallbackvoice:!0},{name:"hi-IN",rate:0.25},{name:"Fallback Hindi",lang:"hi",fallbackvoice:!0},{name:"Fallback Catalan",lang:"ca",fallbackvoice:!0}];b.iOS=/(iPad|iPhone|iPod)/g.test(navigator.userAgent);b.is_chrome=-1<navigator.userAgent.indexOf("Chrome");b.is_safari=-1<navigator.userAgent.indexOf("Safari");b.is_chrome&&b.is_safari&&(b.is_safari=!1);b.iOS_initialized=!1;b.cache_ios_voices=[{name:"he-IL",voiceURI:"he-IL",lang:"he-IL"},{name:"th-TH",voiceURI:"th-TH",lang:"th-TH"},{name:"pt-BR",voiceURI:"pt-BR",lang:"pt-BR"},{name:"sk-SK",voiceURI:"sk-SK",lang:"sk-SK"},{name:"fr-CA",voiceURI:"fr-CA",lang:"fr-CA"},{name:"ro-RO",voiceURI:"ro-RO",lang:"ro-RO"},{name:"no-NO",voiceURI:"no-NO",lang:"no-NO"},{name:"fi-FI",voiceURI:"fi-FI",lang:"fi-FI"},{name:"pl-PL",voiceURI:"pl-PL",lang:"pl-PL"},{name:"de-DE",voiceURI:"de-DE",lang:"de-DE"},{name:"nl-NL",voiceURI:"nl-NL",lang:"nl-NL"},{name:"id-ID",voiceURI:"id-ID",lang:"id-ID"},{name:"tr-TR",voiceURI:"tr-TR",lang:"tr-TR"},{name:"it-IT",voiceURI:"it-IT",lang:"it-IT"},{name:"pt-PT",voiceURI:"pt-PT",lang:"pt-PT"},{name:"fr-FR",voiceURI:"fr-FR",lang:"fr-FR"},{name:"ru-RU",voiceURI:"ru-RU",lang:"ru-RU"},{name:"es-MX",voiceURI:"es-MX",lang:"es-MX"},{name:"zh-HK",voiceURI:"zh-HK",lang:"zh-HK"},{name:"sv-SE",voiceURI:"sv-SE",lang:"sv-SE"},{name:"hu-HU",voiceURI:"hu-HU",lang:"hu-HU"},{name:"zh-TW",voiceURI:"zh-TW",lang:"zh-TW"},{name:"es-ES",voiceURI:"es-ES",lang:"es-ES"},{name:"zh-CN",voiceURI:"zh-CN",lang:"zh-CN"},{name:"nl-BE",voiceURI:"nl-BE",lang:"nl-BE"},{name:"en-GB",voiceURI:"en-GB",lang:"en-GB"},{name:"ar-SA",voiceURI:"ar-SA",lang:"ar-SA"},{name:"ko-KR",voiceURI:"ko-KR",lang:"ko-KR"},{name:"cs-CZ",voiceURI:"cs-CZ",lang:"cs-CZ"},{name:"en-ZA",voiceURI:"en-ZA",lang:"en-ZA"},{name:"en-AU",voiceURI:"en-AU",lang:"en-AU"},{name:"da-DK",voiceURI:"da-DK",lang:"da-DK"},{name:"en-US",voiceURI:"en-US",lang:"en-US"},{name:"en-IE",voiceURI:"en-IE",lang:"en-IE"},{name:"hi-IN",voiceURI:"hi-IN",lang:"hi-IN"},{name:"el-GR",voiceURI:"el-GR",lang:"el-GR"},{name:"ja-JP",voiceURI:"ja-JP",lang:"ja-JP"}];b.systemvoices;b.CHARACTER_LIMIT=100;b.VOICESUPPORT_ATTEMPTLIMIT=5;b.voicesupport_attempts=0;b.fallbackMode=!1;b.WORDS_PER_MINUTE=140;b.fallback_parts=null;b.fallback_part_index=0;b.fallback_audio=null;b.fallback_playbackrate=1.25;b.msgparameters=null;b.timeoutId=null;b.OnLoad_callbacks=[];"undefined"!=typeof speechSynthesis&&(speechSynthesis.onvoiceschanged=function(){b.systemvoices=window.speechSynthesis.getVoices();null!=b.OnVoiceReady&&b.OnVoiceReady.call()});b.default_rv=b.responsivevoices[0];b.OnVoiceReady=null;b.init=function(){"undefined"===typeof speechSynthesis?(console.log("RV: Voice synthesis not supported"),b.enableFallbackMode()):setTimeout(function(){var a=setInterval(function(){var d=window.speechSynthesis.getVoices();0!=d.length||null!=b.systemvoices&&0!=b.systemvoices.length?(console.log("RV: Voice support ready"),b.systemVoicesReady(d),clearInterval(a)):(console.log("Voice support NOT ready"),b.voicesupport_attempts++,b.voicesupport_attempts>b.VOICESUPPORT_ATTEMPTLIMIT&&(clearInterval(a),null!=window.speechSynthesis?b.iOS?(console.log("RV: Voice support ready (cached)"),b.systemVoicesReady(b.cache_ios_voices)):(console.log("RV: speechSynthesis present but no system voices found"),b.enableFallbackMode()):b.enableFallbackMode()))},100)},100);b.Dispatch("OnLoad")};b.systemVoicesReady=function(a){b.systemvoices=a;b.mapRVs();null!=b.OnVoiceReady&&b.OnVoiceReady.call()};b.enableFallbackMode=function(){b.fallbackMode=!0;console.log("RV: Enabling fallback mode");b.mapRVs();null!=b.OnVoiceReady&&b.OnVoiceReady.call()};b.getVoices=function(){for(var a=[],d=0;d<b.responsivevoices.length;d++){a.push({name:b.responsivevoices[d].name})}return a};b.speak=function(a,n,l){b.msgparameters=l||{};b.msgtext=a;b.msgvoicename=n;var k=[];if(a.length>b.CHARACTER_LIMIT){for(var m=a;m.length>b.CHARACTER_LIMIT;){a=m.search(/[:!?.;]+/);var j="";if(-1==a||a>=b.CHARACTER_LIMIT){a=m.search(/[,]+/)}if(-1==a||a>=b.CHARACTER_LIMIT){var i=m.split(" ");for(a=0;a<i.length&&!(j.length+i[a].length+1>b.CHARACTER_LIMIT);a++){j+=(0!=a?" ":"")+i[a]}}else{j=m.substr(0,a+1)}m=m.substr(j.length,m.length-j.length);k.push(j)}0<m.length&&k.push(m)}else{k.push(a)}a=null==n?b.default_rv:b.getResponsiveVoice(n);m={};if(null!=a.mappedProfile){m=a.mappedProfile}else{if(m.systemvoice=b.getMatchedVoice(a),m.collectionvoice={},null==m.systemvoice){console.log("RV: ERROR: No voice found for: "+n);return}}1==m.collectionvoice.fallbackvoice?(b.fallbackMode=!0,b.fallback_parts=[]):b.fallbackMode=!1;b.msgprofile=m;for(a=0;a<k.length;a++){b.fallbackMode?(n="http://responsivevoice.org/responsivevoice/getvoice.php?t="+k[a]+"&tl="+m.collectionvoice.lang||m.systemvoice.lang||"en-US",j=document.createElement("AUDIO"),j.src=n,j.playbackRate=b.fallback_playbackrate,j.preload="auto",j.volume=m.collectionvoice.volume||m.systemvoice.volume||1,b.fallback_parts.push(j)):(n=new SpeechSynthesisUtterance,n.voice=m.systemvoice,n.voiceURI=m.systemvoice.voiceURI,n.volume=m.collectionvoice.volume||m.systemvoice.volume||1,n.rate=m.collectionvoice.rate||m.systemvoice.rate||1,n.pitch=m.collectionvoice.pitch||m.systemvoice.pitch||1,n.text=k[a],n.lang=m.collectionvoice.lang||m.systemvoice.lang,n.rvIndex=a,n.rvTotal=k.length,0==a&&(n.onstart=b.speech_onstart),b.msgparameters.onendcalled=!1,null!=l?(a<k.length-1&&1<k.length?(n.onend=l.onchunkend,n.addEventListener("end",l.onchuckend)):(n.onend=b.speech_onend,n.addEventListener("end",b.speech_onend)),n.onerror=l.onerror||function(c){console.log("RV: Unknow Error");console.log(c)},n.onpause=l.onpause,n.onresume=l.onresume,n.onmark=l.onmark,n.onboundary=l.onboundary):(n.onend=b.speech_onend,n.onerror=function(c){console.log("RV: Unknow Error");console.log(c)}),speechSynthesis.speak(n))}b.fallbackMode&&(b.fallback_part_index=0,b.fallback_startPart())};b.startTimeout=function(a,f){var d=b.msgprofile.collectionvoice.timerSpeed;null==b.msgprofile.collectionvoice.timerSpeed&&(d=1);0>=d||(b.timeoutId=setTimeout(f,60/b.WORDS_PER_MINUTE*d*1000*a.split(/\s+/).length))};b.checkAndCancelTimeout=function(){null!=b.timeoutId&&(clearTimeout(b.timeoutId),b.timeoutId=null)};b.speech_timedout=function(){b.cancel();b.cancelled=!1;b.speech_onend()};b.speech_onend=function(){b.checkAndCancelTimeout();!0===b.cancelled?b.cancelled=!1:null!=b.msgparameters&&null!=b.msgparameters.onend&&1!=b.msgparameters.onendcalled&&(b.msgparameters.onendcalled=!0,b.msgparameters.onend())};b.speech_onstart=function(){(b.iOS||b.is_safari)&&b.startTimeout(b.msgtext,b.speech_timedout);b.msgparameters.onendcalled=!1;if(null!=b.msgparameters&&null!=b.msgparameters.onstart){b.msgparameters.onstart()}};b.fallback_startPart=function(){0==b.fallback_part_index&&b.speech_onstart();b.fallback_audio=b.fallback_parts[b.fallback_part_index];if(null==b.fallback_audio){console.log("RV: Fallback Audio is not available")}else{var a=b.fallback_audio;setTimeout(function(){a.playbackRate=b.fallback_playbackrate},50);a.onloadedmetadata=function(){a.play();a.playbackRate=b.fallback_playbackrate};b.fallback_audio.play();b.fallback_audio.addEventListener("ended",b.fallback_finishPart)}};b.fallback_finishPart=function(a){b.checkAndCancelTimeout();b.fallback_part_index<b.fallback_parts.length-1?(b.fallback_part_index++,b.fallback_startPart()):b.speech_onend()};b.cancel=function(){b.checkAndCancelTimeout();b.fallbackMode?null!=b.fallback_audio&&b.fallback_audio.pause():(b.cancelled=!0,speechSynthesis.cancel())};b.voiceSupport=function(){return"speechSynthesis" in window};b.OnFinishedPlaying=function(a){if(null!=b.msgparameters&&null!=b.msgparameters.onend){b.msgparameters.onend()}};b.setDefaultVoice=function(a){a=b.getResponsiveVoice(a);null!=a&&(b.default_rv=a)};b.mapRVs=function(){for(var a=0;a<b.responsivevoices.length;a++){for(var j=b.responsivevoices[a],h=0;h<j.voiceIDs.length;h++){var g=b.voicecollection[j.voiceIDs[h]];if(1!=g.fallbackvoice){var i=b.getSystemVoice(g.name);if(null!=i){j.mappedProfile={systemvoice:i,collectionvoice:g};break}}else{j.mappedProfile={systemvoice:{},collectionvoice:g};break}}}};b.getMatchedVoice=function(a){for(var f=0;f<a.voiceIDs.length;f++){var d=b.getSystemVoice(b.voicecollection[a.voiceIDs[f]].name);if(null!=d){return d}}return null};b.getSystemVoice=function(a){if("undefined"===typeof b.systemvoices||null===b.systemvoices){return null}for(var d=0;d<b.systemvoices.length;d++){if(b.systemvoices[d].name==a){return b.systemvoices[d]}}return null};b.getResponsiveVoice=function(a){for(var d=0;d<b.responsivevoices.length;d++){if(b.responsivevoices[d].name==a){return b.responsivevoices[d]}}return null};b.Dispatch=function(a){if(b.hasOwnProperty(a+"_callbacks")&&0<b[a+"_callbacks"].length){a=b[a+"_callbacks"];for(var d=0;d<a.length;d++){a[d]()}}};b.AddEventListener=function(a,d){b.hasOwnProperty(a+"_callbacks")?b[a+"_callbacks"].push(d):console.log("RV: Event listener not found: "+a)};b.clickEvent=function(){b.iOS&&!b.iOS_initialized&&(b.speak(" "),b.iOS_initialized=!0)};b.isPlaying=function(){return b.fallbackMode?null!=b.fallback_audio&&!b.fallback_audio.ended&&!b.fallback_audio.paused:speechSynthesis.speaking};"undefined"===typeof $?document.addEventListener("DOMContentLoaded",function(){b.init()}):$(document).ready(function(){b.init()})},responsiveVoice=new ResponsiveVoice};
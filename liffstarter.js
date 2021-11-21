window.onload = function(e) {
  liff.init(function() {
    getP();
  });
};

function getP() {
  var tipe = getParameterByName('type')
  if (!tipe) {
    document.getElementById('profilex').addEventListener('click', function() {
      liff.sendMessages([{
        type: 'template',
        altText: 'HELLTERHEAD Corp.',
        template: {
          type: 'buttons',
          thumbnailImageUrl: 'https://github.com/Mobanzu/Mobanzu.github.io/blob/main/assets/M_hlth_profile.png',
          imageAspectRatio: 'square',
          imageSize: 'cover',
          title: 'HELLTERHEAD Corp.',
          text: 'LINE Future 伝令',
          actions: [
            {
              type: 'uri',
              label: 'Official',
              uri: 'https://lin.ee/aCi5eZC'
            }
          ]
        }
      }]).then(function() {
        liff.closeWindow();
      });        
    });
    document.getElementById('textx').addEventListener('click', function() {
      liff.sendMessages([{
        type: 'text',
        text: 'This is a small web application that demonstrates the basic functionality of the LINE Front-end Framework (LIFF).',
        sentBy: {
          label: 'HELLTERHEAD Corp.',
          iconUrl: 'https://github.com/Mobanzu/Mobanzu.github.io/blob/main/assets/hlth_logo.gif',
          linkUrl: 'https://line.me/ti/p/~mo-banzu'
        }
      }]).then(function() {
        liff.closeWindow();
      });
    });
    document.getElementById('imagex').addEventListener('click', function() {
      liff.sendMessages([{
        type: 'image',
        originalContentUrl: 'https://github.com/Mobanzu/Mobanzu.github.io/blob/main/assets/M_hlth_profile.png',
        previewImageUrl: 'https://github.com/Mobanzu/Mobanzu.github.io/blob/main/assets/M_hlth_profile.png',
        sentBy: {
          label: 'HELLTERHEAD Corp.',
          iconUrl: 'https://github.com/Mobanzu/Mobanzu.github.io/blob/main/assets/hlth_logo.gif',
          linkUrl: 'https://line.me/ti/p/~mo-banzu'
        }
      }]).then(function() {
        liff.closeWindow();
      });
    });
    document.getElementById('videox').addEventListener('click', function() {
      liff.sendMessages([{
        type: 'video',
        originalContentUrl: 'https://drive.google.com/file/d/1t9XhjBNI4YGiqd49VRJ6qybXRwkhdBge/view?usp=drivesdk',
        previewImageUrl: 'https://drive.google.com/file/d/1y2kBUprlOAmXLvrfniLJUCDH19iKNIUR/view?usp=drivesdk'
      }]).then(function() {
        liff.closeWindow();
      });
    });
    document.getElementById('audiox').addEventListener('click', function() {
      liff.sendMessages([{
        type: 'audio',
        originalContentUrl: 'https://drive.google.com/file/d/1_ZDu-7a9HVZVqYhwdOW8bLwI4QFfiy5i/view?usp=drivesdk',
        duration: 60000
      }]).then(function(){
        liff.closeWindow();
      });
    });
    document.getElementById('stickerx').addEventListener('click', function() {
      liff.sendMessages([{
        type: 'template',
        altText: 'Sticker',
        template: {
          type: 'image_carousel',
          columns: [{
            imageUrl: 'https://stickershop.line-scdn.net/stickershop/v1/sticker/8117761/IOS/sticker_animation@2x.png',
            action: {
              type: 'uri',
              uri: 'line://shop/sticker/detail/5331'
            }
          }]
        }
      }]).then(function() {
        liff.closeWindow();
      });
    });
  } else {
    makeProfile();
    makeText();
    makeImage();
    makeVideo();
    makeAudio();
    makeSticker();
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]'+name+'(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getProfile() {
  liff.getProfile().then(function(profile) {
    document.getElementById('userid').textContent = profile.displayName;
    document.getElementById('main').src = profile.pictureUrl;        
    document.getElementById('close').addEventListener('click', function() {
      liff.closeWindow();
    });
  });
}

function makeProfile() {
  var tipe = getParameterByName('type');
  liff.getProfile().then(function(prof) {
    var pict = prof.pictureUrl;
    if (pict == null) {
      var pict = 'https://github.com/Mobanzu/Mobanzu.github.io/blob/main/assets/hlth_img_not_found.jpg';
    }
    var stat = prof.statusMessage;
    if (stat == null) {
      var stat = ' ';
    }
    if (stat.length > 60) {
      var stat = 'Status Message is to long! Max 60 words';
    }
    if (tipe === 'profile') {
      liff.sendMessages([{
        type: 'template',
        altText: 'Profile '+prof.displayName,
        template: {
          type: 'buttons',
          thumbnailImageUrl: pict,
          imageAspectRatio: 'square',
          imageSize: 'cover',
          title: prof.displayName,
          text: stat,
          actions: [
            {
              type: 'uri',
              label: 'Profile',
              uri: 'line://nv/profilePopup/mid='+prof.mid
            }
          ]
        }
      }]).then(function() {
        liff.closeWindow();
      });
    }
  });
}

function makeText() {
  var tipe = getParameterByName('type');
  if (tipe === 'text') {
    liff.sendMessages([{
      type: 'text',
      text: getParameterByName('text')
    }]).then(function() {
      liff.closeWindow();
    });
  }
}

function makeImage() {
  var tipe = getParameterByName('type');
  if (tipe === 'image') {
    liff.sendMessages([{
      type: 'image',
      originalContentUrl: getParameterByName('img'),
      previewImageUrl: getParameterByName('img')
    }]).then(function() {
      liff.closeWindow();
    });
  }
}

function makeVideo() {
  var tipe = getParameterByName('type');
  if (tipe === 'video') {
    liff.sendMessages([{
      type: 'video',
      originalContentUrl: getParameterByName('ocu'),
      previewImageUrl: getParameterByName('piu')
    }]).then(function() {
      liff.closeWindow();
    });
  }
}

function makeAudio() {
  var tipe = getParameterByName('type');
  if (tipe === 'audio') {
    liff.sendMessages([{
      type: 'audio',
      originalContentUrl: getParameterByName('link'),
      duration: 60000
    }]).then(function() {
      liff.closeWindow();
    });
  }
}

function makeSticker() {
  var tipe = getParameterByName('type');
  if (tipe === 'sticker') {
    var stk = getParameterByName('stk');
    var sid = getParameterByName('sid');
    var pkg = getParameterByName('pkg');
    var ep = '';
    if (stk === 'anim') {
      ep = '/IOS/sticker_animation@2x.png';
    } else {
      ep = '/IOS/sticker@2x.png';
    }
    liff.sendMessages([{
      type: 'template',
      altText: 'Sticker',
      template: {
        type: 'image_carousel',
        columns: [{
          imageUrl: 'https://stickershop.line-scdn.net/stickershop/v1/sticker/'+sid+ep,
          action: {
            type: 'uri',
            uri: 'line://shop/sticker/detail/'+pkg
          }
        }]
      }
    }]).then(function() {
      liff.closeWindow();
    });
  }
}

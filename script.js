/********* TEXT TYPING ***********/
$(function() {
  $('.type-text').each(function() {
    var items = $(this).attr('title') + ';' + $(this).text();
    $(this).empty().attr('title', '').teletype({
      text: $.map(items.split(';'), $.trim),
      typeDelay: 10,
      backDelay: 20,
      cursor: '▋',
      delay: 3000,
      preserve: false,
      prefix: '[teletype ~]# ',
      loop: 0
    });
  });
});

/*
 * Teletype jQuery Plugin
 * @version 0.1
 *
 * @author Steve Whiteley
 * @see http://teletype.rocks
 * @see https://github.com/stvwhtly/jquery-teletype-plugin
 *
 * Copyright (c) 2014 Steve Whiteley
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function($) {
  $.fn.teletype = function(options) {
    var settings = $.extend({}, $.fn.teletype.defaults, options);
    var self = $(this),
      output = null,
      current = {
        string: '',
        index: 0,
        position: 0,
        loop: 0
      };
    var next = function() {
      current.index++;
      if (current.index >= settings.text.length) {
        current.index = 0;
        current.loop++;
        if (settings.loop != false && (settings.loop == current.loop)) {
          return false;
        }
      }
      current.position = 0;
      current.string = settings.text[current.index];
      return true;
    };
    var type = function() {
      if (settings.prefix && current.position == 0) {
        if (current.loop == 0 && current.index == 0) {
          $('<span />').addClass('teletype-prefix').html(settings.prefix).prependTo(self);
        }
      }
      var letters = current.string.split(''),
        letter = letters[current.position];
      if (letter == '^' || letter == '~') {
        var end = current.string.substr(current.position + 1).indexOf(' ');
        var value = current.string.substr(current.position + 1, end);
        if ($.isNumeric(value)) {
          current.string = current.string.replace(letter + value + ' ', '');
          if (letter == '^') {
            window.setTimeout(function() {
              window.setTimeout(type, delay(settings.typeDelay));
            }, value);
          } else {
            var index = current.position - value;
            current.string = current.string.substr(0, index - 1) + current.string.substr(current.position - 1);
            window.setTimeout(function() {
              backspace(Math.max(index, 0));
            }, delay(settings.backDelay));
          }
          return;
        }
      } else if (letter == '\\') {
        var nextChar = current.string.substr(current.position + 1, 1);
        if (nextChar == 'n') {
          current.position++;
          letter = '<br />';
        }
      }
      output.html(output.html() + letter);
      current.position++;
      if (current.position < current.string.length) {
        window.setTimeout(type, delay(settings.typeDelay));
      } else if (settings.preserve == false) {
        window.setTimeout(function() {
          window.setTimeout(backspace, delay(settings.backDelay));
        }, settings.delay);
      } else {
        output.html(output.html() + '<br />' + '<span class="teletype-prefix">' + settings.prefix + '</span>');
        if (next()) {
          window.setTimeout(function() {
            window.setTimeout(type, delay(settings.typeDelay));
          }, settings.delay);
        }
      }
    };
    var backspace = function(stop) {
      if (!stop) {
        stop = 0;
      }
      if (current.position > stop) {
        output.html(output.html().slice(0, -1));
        window.setTimeout(function() {
          backspace(stop);
        }, delay(settings.backDelay));
        current.position--;
      } else {
        if (stop == 0) {
          if (next() == false) {
            return;
          }
        }
        window.setTimeout(type, delay(settings.typeDelay));
      }
    };
    var delay = function(speed) {
      return Math.floor(Math.random() * 200) + speed;
    };
    return this.each(function() {
      current.string = settings.text[current.index];
      self.addClass('teletype').empty();
      output = $('<span />').addClass('teletype-text').appendTo(self);

      if (settings.cursor) {
        var cursor = $('<span />')
          .text(settings.cursor)
          .addClass('teletype-cursor')
          .appendTo(self);
      }
      type();
    });
  };
  $.fn.teletype.defaults = {
    text: ['one', 'two', 'three'],
    typeDelay: 100,
    backDelay: 50,
    blinkSpeed: 1000,
    delay: 2000,
    cursor: '|',
    preserve: false,
    prefix: '',
    loop: 0
  };
}(jQuery));

// alternatively, we can use querySelector to select an id with the name of page1-btn
// let pageOneBtn = document.querySelector('#page1-btn');
let pageOneBtn = document.getElementById('page1-btn');
let pageTwoBtn = document.querySelector("#page2-btn");
let pageThreeBtn = document.getElementById("page3-btn");
let pageFourBtn = document.getElementById("page4-btn");

let pageOne = document.querySelector("#page-1");
let pageTwo = document.querySelector('#page-2');
let pageThree = document.querySelector("#page-3");
let pageFour = document.querySelector("#page-4");

// axios.get('data.txt').then(function(response){
//     pageOne.innerHTML = response.data;
// })

// loadData();

// async function loadData() {
//   let response = await axios.get('data.txt');
//   pageOne.innerHTML = response.data;
// }

// when we click page one button
// this example uses using await/async instead of promises 
pageOneBtn.addEventListener('click', function(){
  console.log("page one btn");
  pageTwo.classList.remove('shown');
  pageTwo.classList.add('hidden')

  pageThree.classList.remove('shown');
  pageThree.classList.add('hidden');

  pageFour.classList.remove('shown');
  pageFour.classList.add('hidden');

  // axios.get('data.txt').then(function(response){
  //   pageOne.innerHTML = response.data;
  // })
  // let response = await axios.get('data.txt');
  // pageOne.innerHTML = response.data;
  
  // show page one
  pageOne.classList.add('shown');
})



pageTwoBtn.addEventListener('click', async function(){
  // purge every existing element in pageTwo 
  pageTwo.innerHTML = "";

  pageOne.classList.remove('shown');
  pageOne.classList.add('hidden');

  pageThree.classList.remove('shown');
  pageThree.classList.add('hidden')

  pageFour.classList.remove('shown');
  pageFour.classList.add('hidden')

  // show page pageTwo
  pageTwo.classList.add('shown');

  // axios.get('aboutme.txt').then(function(response){
  //   pageTwo.innerHTML = response.data;
  // })
  let response = await axios.get('aboutme.txt');
  pageTwo.innerHTML = response.data;

})


pageThreeBtn.addEventListener('click', async function(){

  pageThree.innerHTML = "";

  pageOne.classList.remove('shown');
  pageOne.classList.add('hidden');

  pageTwo.classList.remove('shown');
  pageTwo.classList.add('hidden')

  pageFour.classList.remove('shown');
  pageFour.classList.add('hidden')

  // show page pageThree
  pageThree.classList.add('shown');

  let response = await axios.get('project.txt');
  pageThree.innerHTML = response.data;

})



pageFourBtn.addEventListener('click', async function(){

pageFour.innerHTML = "";

pageOne.classList.remove('shown');
pageOne.classList.add('hidden');

pageTwo.classList.remove('shown');
pageTwo.classList.add('hidden')

pageThree.classList.remove('shown');
pageThree.classList.add('hidden')

  // show page pageFour
  pageFour.classList.add('shown');

  let response = await axios.get('contactme.txt');
  pageFour.innerHTML = response.data;

})
/* ********************************************************************
 **********************************************************************
 * HTML Virtual Keyboard Interface script - v1.4a
 *   Copyright (c) 2007 - GreyWyvern
 *
 *  - Licenced for free distribution under the BSDL
 *          http://www.opensource.org/licenses/bsd-license.php
 *
 * Add a script-driven keyboard interface to your text fields, password
 * fields and textareas.
 *
 * See http://www.greywyvern.com/code/js/keyboard.html for examples and
 * usage instructions.
 *
 * Version 1.4a - October 15, 2007
 *   - Keyboard is fully removed from document when hidden
 *
 * Version 1.4 - August 1, 2007
 *   - Simplified layout syntax a bit
 *   - Added version number to lower right of interface
 *   - Various other small bug fixes
 *
 * Version 1.3 - July 30, 2007
 *   - Interaction styling changes (Alt, AltGr, Shift)
 *   - Justified keys - last key expands to fit width
 *   - If no dead keys in layout, dead key checkbox is hidden
 *   - Option to disable dead keys per keyboard
 *   - Added the Number Pad layout
 *   - Pulled all variations of script up to same version number
 *
 * Version 1.2 - July 24, 2007
 *   - Added support for dead keys
 *
 * Keyboard Credits
 *   - Lithuanian and Russian keyboard layouts added by Ramunas
 *   - German keyboard layout added by QuHno
 *   - French keyboard layout added by Hidden Evil
 *   - Polish Programmers layout assisted by moose
 *   - Turkish keyboard layouts added by offcu
 *   - Dutch and US Int'l keyboard layouts assisted by jerone
 *   - Portuguese keyboard layout added by clisboa
 *
 */

function buildKeyboardInputs() {
  var self = this;

  this.VKI_version = "";
  this.VKI_target = this.VKI_visible = "";
  this.VKI_shift = this.VKI_capslock = this.VKI_alternate = this.VKI_dead = false;
  this.VKI_deadkeysOn = false;
  this.VKI_kt = "Hebrew";  // Default keyboard layout
  this.VKI_range = false;
  this.VKI_keyCenter = 3;


  /* ***** Create keyboards **************************************** */
  this.VKI_layout = new Object();
  this.VKI_layoutDDK = new Object();

  // - Lay out each keyboard in rows of sub-arrays.  Each sub-array
  //   represents one key.
  // 
  // - Each sub-array consists of four slots described as follows:
  //     example: ["a", "A", "\u00e1", "\u00c1"]
  //
  //          a) Normal character
  //          A) Character + Shift or Caps
  //     \u00e1) Character + Alt or AltGr
  //     \u00c1) Character + Shift or Caps + Alt or AltGr
  //
  //   You may include sub-arrays which are fewer than four slots.  In
  //   these cases, the missing slots will be blanked when the
  //   corresponding modifier key (Shift or AltGr) is pressed.
  //
  // - If the second slot of a sub-array matches one of the following
  //   strings:
  //       "Tab", "Caps", "Shift", "Enter", "Bksp", "Alt" OR "AltGr"
  //   then the function of the key will be the following,
  //   respectively:
  //     - Insert a tab
  //     - Toggle Caps Lock (technically a Shift Lock)
  //     - Next entered character will be the shifted character
  //     - Insert a newline (textarea), or close the keyboard
  //     - Delete the previous character
  //     - Next entered character will be the alternate character
  //
  //   The first slot of this sub-array will be the text to display on
  //   the corresponding key.  This allows for easy localisation of key
  //   names.
  //
  // - Layout dead keys (diacritic + letter) should be added as arrays
  //   of two item arrays with hash keys equal to the diacritic.  See
  //   the "this.VKI_deadkey" object below the layout definitions. In
  //   each two item child array, the second item is what the diacritic
  //   would change the first item to.
  //
  // - To disable dead keys for a layout, simply assign true to the
  //   this.VKI_layoutDDK (DDK = disable dead keys) object of the same
  //   name as the layout.  See the Numpad layout below for an example.
  //
  // - Note that any characters beyond the normal ASCII set should be
  //   entered in escaped Unicode format.  (eg \u00a3 = Pound symbol)
  //   You can find Unicode values for characters here:
  //     http://unicode.org/charts/
  //
  // - To remove a keyboard, just delete it, or comment it out of the
  //   source code

  this.VKI_layout.Hebrew = [ // Hebrew Standard Keyboard
    [["~", "`"], ["1", "!"], ["2", "@"], ["3", "#"], ["4" , "$"], ["5" , "%"], ["6", "^"], ["7", "?"], ["8", "*"], ["9", ")"], ["0", "("], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["/", "Q"], ["'", "W"], ["\u05e7", "E",], ["\u05e8", "R"], ["\u05d0", "T"], ["\u05d8", "Y"], ["\u05d5", "U"], ["\u05df", "I"], ["\u05dd", "O"], ["\u05e4", "P"], ["]", "}"], ["[", "{"]],
    [["\u05e9", "A"], ["\u05d3", "S"], ["\u05d2", "D"], ["\u05db", "F"], ["\u05e2", "G"], ["\u05d9", "H"], ["\u05d7", "J"], ["\u05dc", "K"], ["\u05da", "L"], ["\u05e3", ":"], ["," , '"'], ["Enter", "Enter"]],
    [["Shift", "Shift"], ["\u05d6", "Z"], ["\u05e1", "X"], ["\u05d1", "C"], ["\u05d4", "V"], ["\u05e0", "B"], ["\u05de", "N"], ["\u05e6", "M"], ["\u05ea", ">"], ["\u05e5", "<"], [".", "?"], ["Shift", "Shift"]],
    [[" ", " "]]
  ];





  /* ***** Define Dead Keys **************************************** */
  this.VKI_deadkey = new Object();

  // - Lay out each dead key set in one row of sub-arrays.  The rows
  //   below are wrapped so uppercase letters are below their lowercase
  //   equivalents.
  //
  // - The first letter in each sub-array is the letter pressed after
  //   the diacritic.  The second letter is the letter this key-combo
  //   will generate.
  //
  // - Note that if you have created a new keyboard layout and want it
  //   included in the distributed script, PLEASE TELL ME if you have
  //   added additional dead keys to the ones below.

  this.VKI_deadkey['"'] = this.VKI_deadkey['\u00a8'] = [ // Umlaut / Diaeresis / Greek Dialytika
    ["a", "\u00e4"], ["e", "\u00eb"], ["i", "\u00ef"], ["o", "\u00f6"], ["u", "\u00fc"], ["y", "\u00ff"], ["\u03b9", "\u03ca"], ["\u03c5", "\u03cb"],
    ["A", "\u00c4"], ["E", "\u00cb"], ["I", "\u00cf"], ["O", "\u00d6"], ["U", "\u00dc"], ["Y", "\u0178"], ["\u0399", "\u03aa"], ["\u03a5", "\u03ab"]
  ];
  this.VKI_deadkey['~'] = [ // Tilde
    ["a", "\u00e3"], ["o", "\u00f5"], ["n", "\u00f1"],
    ["A", "\u00c3"], ["O", "\u00d5"], ["N", "\u00d1"]
  ];
  this.VKI_deadkey['^'] = [ // Circumflex
    ["a", "\u00e2"], ["e", "\u00ea"], ["i", "\u00ee"], ["o", "\u00f4"], ["u", "\u00fb"], ["w", "\u0175"], ["y", "\u0177"],
    ["A", "\u00c2"], ["E", "\u00ca"], ["I", "\u00ce"], ["O", "\u00d4"], ["U", "\u00db"], ["W", "\u0174"], ["Y", "\u0176"]
  ];
  this.VKI_deadkey['`'] = [ // Grave
    ["a", "\u00e0"], ["e", "\u00e8"], ["i", "\u00ec"], ["o", "\u00f2"], ["u", "\u00f9"],
    ["A", "\u00c0"], ["E", "\u00c8"], ["I", "\u00cc"], ["O", "\u00d2"], ["U", "\u00d9"]
  ];
  this.VKI_deadkey["'"] = this.VKI_deadkey['\u00b4'] = this.VKI_deadkey['\u0384'] = [ // Acute / Greek Tonos
    ["a", "\u00e1"], ["e", "\u00e9"], ["i", "\u00ed"], ["o", "\u00f3"], ["u", "\u00fa"], ["\u03b1", "\u03ac"], ["\u03b5", "\u03ad"], ["\u03b7", "\u03ae"], ["\u03b9", "\u03af"], ["\u03bf", "\u03cc"], ["\u03c5", "\u03cd"], ["\u03c9", "\u03ce"],
    ["A", "\u00c1"], ["E", "\u00c9"], ["I", "\u00cd"], ["O", "\u00d3"], ["U", "\u00da"], ["\u0391", "\u0386"], ["\u0395", "\u0388"], ["\u0397", "\u0389"], ["\u0399", "\u038a"], ["\u039f", "\u038c"], ["\u03a5", "\u038e"], ["\u03a9", "\u038f"]
  ];
  this.VKI_deadkey["\u0385"] = [ // Greek Dialytika + Tonos
    ["\u03b9", "\u0390"], ["\u03c5", "\u03b0"]
  ];
  this.VKI_deadkey['\u00b0'] = this.VKI_deadkey['\u00ba'] = [ // Ring
    ["a", "\u00e5"],
    ["A", "\u00c5"]
  ];

 

  /* ***** Find tagged input & textarea elements ******************* */
  var inputElems = [
    document.getElementsByTagName('input'),
    document.getElementsByTagName('textarea'),
  ]
  for (var y = 0, inputCount = 0; y < inputElems.length; y++) {
    if (inputElems[y]) {
      for (var x = 0; x < inputElems[y].length; x++) {
        if ((inputElems[y][x].nodeName == "TEXTAREA" || inputElems[y][x].type == "text" || inputElems[y][x].type == "password") && inputElems[y][x].className.indexOf("keyboardInput") > -1) {
          var keyid = "";
          if (!inputElems[y][x].id) {
            do { keyid = 'keyboardInputInitiator' + inputCount++; } while (document.getElementById(keyid));
          } else keyid = inputElems[y][x].id;

          var keybut = document.createElement('img');
              keybut.src = "/wp-content/themes/jupiter-child/images/keyboard.png";
              keybut.src = "/wp-content/themes/jupiter-child/images/keyboard-2.png";
              keybut.alt = "Keyboard interface";
              keybut.className = "keyboardInputInitiator";
              keybut.title = "Open Hebrew Keyboard";
              /*keybut.onclick = (function(a) { return function() { self.VKI_show(a); }; })(keyid);*/
          var span = document.createElement('span');
              span.textContent = 'Hebrew Keyboard';
              span.className = 'keyboardInputInitiator';
          var spanContainer = document.createElement('span');
              spanContainer.className = 'keyboardInputInitiator-container';
              spanContainer.onclick = (function(a) { return function() { self.VKI_show(a); }; })(keyid);
              spanContainer.insertBefore(keybut, null);
              spanContainer.insertBefore(span, null);

          inputElems[y][x].id = keyid;
          inputElems[y][x].parentNode.insertBefore(spanContainer, inputElems[y][x].nextSibling);
          /*inputElems[y][x].parentNode.insertBefore(span, inputElems[y][x].nextSibling);
          inputElems[y][x].parentNode.insertBefore(keybut, inputElems[y][x].nextSibling);*/
          inputElems[y][x].onclick = inputElems[y][x].onkeyup = inputElems[y][x].onselect = function() {
            if (self.VKI_target.createTextRange) self.VKI_range = document.selection.createRange();
          }
        }
      }
    }
  }


  /* ***** Build the keyboard interface **************************** */
  this.VKI_keyboard = document.createElement('table');
  this.VKI_keyboard.id = "keyboardInputMaster";
  this.VKI_keyboard.cellSpacing = this.VKI_keyboard.cellPadding = this.VKI_keyboard.border = "0";

  var layouts = 0;
  for (ktype in this.VKI_layout) if (typeof this.VKI_layout[ktype] == "object") layouts++;

  var thead = document.createElement('thead');
    var tr = document.createElement('tr');
      var th = document.createElement('th');
        if (layouts > 1) {
          var kblist = document.createElement('select');
            for (ktype in this.VKI_layout) {
              if (typeof this.VKI_layout[ktype] == "object") {
                var opt = document.createElement('option');
                    opt.value = ktype;
                    opt.appendChild(document.createTextNode(ktype));
                  kblist.appendChild(opt);
              }
            }
              kblist.value = this.VKI_kt;
              kblist.onchange = function() {
                self.VKI_kt = this.value;
                self.VKI_buildKeys();
                self.VKI_position();
              }
          th.appendChild(kblist);
        }

          var label = document.createElement('label');
            var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.checked = this.VKI_deadkeysOn;
                checkbox.title = "Toggle dead key input";
                checkbox.onclick = function() {
                  self.VKI_deadkeysOn = this.checked;
                  this.nextSibling.nodeValue = " Dead keys: " + ((this.checked) ? "On" : "Off");
                  self.VKI_modify("");
                  return true;
                }
              label.appendChild(checkbox);
              label.appendChild(document.createTextNode(" Dead keys: " + ((checkbox.checked) ? "On" : "Off")))
          th.appendChild(label);
        tr.appendChild(th);

      var td = document.createElement('td');
        var clearer = document.createElement('span');
            clearer.id = "keyboardInputClear";
            clearer.appendChild(document.createTextNode("Clear All Text"));
            clearer.title = "Clear this input";
            clearer.onmousedown = function() { this.className = "pressed"; }
            clearer.onmouseup = function() { this.className = ""; }
            clearer.onclick = function() {
              self.VKI_target.value = "";
              self.VKI_target.focus();
              return false;
            }
          td.appendChild(clearer);

        var closer = document.createElement('span');
            closer.id = "keyboardInputClose";
            closer.appendChild(document.createTextNode('Close'));
            closer.title = "Close this window";
            closer.onmousedown = function() { this.className = "pressed"; }
            closer.onmouseup = function() { this.className = ""; }
            closer.onclick = function(e) { self.VKI_close(); }
          td.appendChild(closer);

        tr.appendChild(td);
      thead.appendChild(tr);
  this.VKI_keyboard.appendChild(thead);

  var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
      var td = document.createElement('td');
          td.colSpan = "2";
        var div = document.createElement('div');
            div.id = "keyboardInputLayout";
          td.appendChild(div);
        var div = document.createElement('div');
          var ver = document.createElement('var');
              ver.appendChild(document.createTextNode("" + this.VKI_version));
            div.appendChild(ver);
          td.appendChild(div);
        tr.appendChild(td);
      tbody.appendChild(tr);
  this.VKI_keyboard.appendChild(tbody);      



  /* ***** Functions ************************************************ */
  /* ******************************************************************
   * Build or rebuild the keyboard keys
   *
   */
  this.VKI_buildKeys = function() {
    this.VKI_shift = this.VKI_capslock = this.VKI_alternate = this.VKI_dead = false;
    this.VKI_deadkeysOn = (this.VKI_layoutDDK[this.VKI_kt]) ? false : this.VKI_keyboard.getElementsByTagName('label')[0].getElementsByTagName('input')[0].checked;

    var container = this.VKI_keyboard.tBodies[0].getElementsByTagName('div')[0];
    while (container.firstChild) container.removeChild(container.firstChild);

    for (var x = 0, hasDeadKey = false; x < this.VKI_layout[this.VKI_kt].length; x++) {
      var table = document.createElement('table');
          table.cellSpacing = table.cellPadding = table.border = "0";
      if (this.VKI_layout[this.VKI_kt][x].length <= this.VKI_keyCenter) table.className = "keyboardInputCenter";
        var tbody = document.createElement('tbody');
          var tr = document.createElement('tr');
          for (var y = 0; y < this.VKI_layout[this.VKI_kt][x].length; y++) {
            if (!this.VKI_layoutDDK[this.VKI_kt] && !hasDeadKey)
              for (var z = 0; z < this.VKI_layout[this.VKI_kt][x][y].length; z++)
                if (this.VKI_deadkey[this.VKI_layout[this.VKI_kt][x][y][z]]) hasDeadKey = false;

            var td = document.createElement('td');
                td.appendChild(document.createTextNode(this.VKI_layout[this.VKI_kt][x][y][0]));

              var alive = false;
              if (this.VKI_deadkeysOn) for (key in this.VKI_deadkey) if (key === this.VKI_layout[this.VKI_kt][x][y][0]) alive = true;
                td.className = (alive) ? "alive" : "";
              if (this.VKI_layout[this.VKI_kt][x].length > this.VKI_keyCenter && y == this.VKI_layout[this.VKI_kt][x].length - 1)
                td.className += " last";

              if (this.VKI_layout[this.VKI_kt][x][y][0] == " ")
                td.style.paddingLeft = td.style.paddingRight = "50px";
                td.onmouseover = function(e) { if (this.className != "dead" && this.firstChild.nodeValue != "\xa0") this.className += " hover"; }
                td.onmouseout = function(e) { if (this.className != "dead") this.className = this.className.replace(/ ?(hover|pressed)/g, ""); }
                td.onmousedown = function(e) { if (this.className != "dead" && this.firstChild.nodeValue != "\xa0") this.className += " pressed"; }
                td.onmouseup = function(e) { if (this.className != "dead") this.className = this.className.replace(/ ?pressed/g, ""); }
                td.ondblclick = function() { return false; }

              switch (this.VKI_layout[this.VKI_kt][x][y][1]) {
                case "Caps":
                case "Shift":
                case "Alt":
                case "AltGr":
                  td.onclick = (function(type) { return function() { self.VKI_modify(type); return false; }})(this.VKI_layout[this.VKI_kt][x][y][1]);
                  break;
                case "Tab":
                  td.onclick = function() { self.VKI_insert("\t"); return false; }
                  break;
                case "Bksp":
                  td.onclick = function() {
                    self.VKI_target.focus();
                    if (self.VKI_target.setSelectionRange) {
                      var srt = self.VKI_target.selectionStart;
                      var len = self.VKI_target.selectionEnd;
                      if (srt < len) srt++;
                      self.VKI_target.value = self.VKI_target.value.substr(0, srt - 1) + self.VKI_target.value.substr(len);
                      self.VKI_target.setSelectionRange(srt - 1, srt - 1);
                    } else if (self.VKI_target.createTextRange) {
                      try { self.VKI_range.select(); } catch(e) {}
                      self.VKI_range = document.selection.createRange();
                      if (!self.VKI_range.text.length) self.VKI_range.moveStart('character', -1);
                      self.VKI_range.text = "";
                    } else self.VKI_target.value = self.VKI_target.value.substr(0, self.VKI_target.value.length - 1);
                    if (self.VKI_shift) self.VKI_modify("Shift");
                    if (self.VKI_alternate) self.VKI_modify("AltGr");
                    return true;
                  }
                  break;
                case "Enter":
                  td.onclick = function() {
                    if (self.VKI_target.nodeName == "TEXTAREA") { self.VKI_insert("\n"); } else self.VKI_close();
                    return true;
                  }
                  break;
                default:
                  td.onclick = function() {
                    if (self.VKI_deadkeysOn && self.VKI_dead) {
                      if (self.VKI_dead != this.firstChild.nodeValue) {
                        for (key in self.VKI_deadkey) {
                          if (key == self.VKI_dead) {
                            if (this.firstChild.nodeValue != " ") {
                              for (var z = 0, rezzed = false; z < self.VKI_deadkey[key].length; z++) {
                                if (self.VKI_deadkey[key][z][0] == this.firstChild.nodeValue) {
                                  self.VKI_insert(self.VKI_deadkey[key][z][1]);
                                  rezzed = true;
                                  break;
                                }
                              }
                            } else {
                              self.VKI_insert(self.VKI_dead);
                              rezzed = true;
                            }
                            break;
                          }
                        }
                      } else rezzed = true;
                    }
                    self.VKI_dead = false;

                    if (!rezzed && this.firstChild.nodeValue != "\xa0") {
                      if (self.VKI_deadkeysOn) {
                        for (key in self.VKI_deadkey) {
                          if (key == this.firstChild.nodeValue) {
                            self.VKI_dead = key;
                            this.className = "dead";
                            if (self.VKI_shift) self.VKI_modify("Shift");
                            if (self.VKI_alternate) self.VKI_modify("AltGr");
                            break;
                          }
                        }
                        if (!self.VKI_dead) self.VKI_insert(this.firstChild.nodeValue);
                      } else self.VKI_insert(this.firstChild.nodeValue);
                    }

                    self.VKI_modify("");
                    return false;
                  }

                  for (var z = this.VKI_layout[this.VKI_kt][x][y].length; z < 4; z++)
                    this.VKI_layout[this.VKI_kt][x][y][z] = "\xa0";
              }
              tr.appendChild(td);
            tbody.appendChild(tr);
          table.appendChild(tbody);
      }
      container.appendChild(table);
    }
    this.VKI_keyboard.getElementsByTagName('label')[0].style.display = (hasDeadKey) ? "inline" : "none";
  }

  this.VKI_buildKeys();
  if (window.sidebar || window.opera) {
    this.VKI_keyboard.onmousedown = function() { return false; }
    this.VKI_keyboard.onclick = function() { return true; }
  } else this.VKI_keyboard.onselectstart = function() { return false; }


  /* ******************************************************************
   * Controls modifier keys
   *
   */
  this.VKI_modify = function(type) {
    switch (type) {
      case "Alt":
      case "AltGr": this.VKI_alternate = !this.VKI_alternate; break;
      case "Caps": this.VKI_capslock = !this.VKI_capslock; break;
      case "Shift": this.VKI_shift = !this.VKI_shift; break;
    }
    var vchar = 0;
    if (!this.VKI_shift != !this.VKI_capslock) vchar += 1;

    var tables = this.VKI_keyboard.getElementsByTagName('table');
    for (var x = 0; x < tables.length; x++) {
      var tds = tables[x].getElementsByTagName('td');
      for (var y = 0; y < tds.length; y++) {
        var dead = alive = target = false;

        switch (this.VKI_layout[this.VKI_kt][x][y][1]) {
          case "Alt":
          case "AltGr":
            if (this.VKI_alternate) dead = true;
            break;
          case "Shift":
            if (this.VKI_shift) dead = true;
            break;
          case "Caps":
            if (this.VKI_capslock) dead = true;
            break;
          case "Tab": case "Enter": case "Bksp": break;
          default:
            if (type) tds[y].firstChild.nodeValue = this.VKI_layout[this.VKI_kt][x][y][vchar + ((this.VKI_alternate && this.VKI_layout[this.VKI_kt][x][y].length == 4) ? 2 : 0)];
            if (this.VKI_deadkeysOn) {
              var char = tds[y].firstChild.nodeValue;
              if (this.VKI_dead) {
                if (char == this.VKI_dead) dead = true;
                for (var z = 0; z < this.VKI_deadkey[this.VKI_dead].length; z++)
                  if (char == this.VKI_deadkey[this.VKI_dead][z][0]) { target = true; break; }
              }
              for (key in this.VKI_deadkey) if (key === char) { alive = true; break; }
            }
        }

        tds[y].className = (dead) ? "dead" : ((target) ? "target" : ((alive) ? "alive" : ""));
        if (y == tds.length - 1 && tds.length > this.VKI_keyCenter) tds[y].className += " last";
      }
    }
    this.VKI_target.focus();
  }


  /* ******************************************************************
   * Insert text at the cursor
   *
   */
  this.VKI_insert = function(text) {
    this.VKI_target.focus();
    if (this.VKI_target.setSelectionRange) {
      var srt = this.VKI_target.selectionStart;
      var len = this.VKI_target.selectionEnd;
      this.VKI_target.value = this.VKI_target.value.substr(0, srt) + text + this.VKI_target.value.substr(len);
      if (text == "\n" && window.opera) srt++;
      this.VKI_target.setSelectionRange(srt + text.length, srt + text.length);
    } else if (this.VKI_target.createTextRange) {
      try { this.VKI_range.select(); } catch(e) {}
      this.VKI_range = document.selection.createRange();
      this.VKI_range.text = text;
      this.VKI_range.collapse(true);
      this.VKI_range.select();
    } else this.VKI_target.value += text;
    if (this.VKI_shift) this.VKI_modify("Shift");
    if (this.VKI_alternate) this.VKI_modify("AltGr");
    this.VKI_target.focus();
  }


  /* ******************************************************************
   * Show the keyboard interface
   *
   */
  this.VKI_show = function(id) {
    if (this.VKI_target = document.getElementById(id)) {
      if (this.VKI_visible != id) {
        this.VKI_range = "";
        try { this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard); } catch (e) {}

        var elem = this.VKI_target;
        this.VKI_target.keyboardPosition = "absolute";
        do {
          if (VKI_getStyle(elem, "position") == "fixed") {
            this.VKI_target.keyboardPosition = "fixed";
            break;
          }
        } while (elem = elem.offsetParent);

        this.VKI_keyboard.style.top = this.VKI_keyboard.style.right = this.VKI_keyboard.style.bottom = this.VKI_keyboard.style.left = "auto";
        this.VKI_keyboard.style.position = this.VKI_target.keyboardPosition;
        document.body.appendChild(this.VKI_keyboard);

        this.VKI_visible = this.VKI_target.id;
        this.VKI_position();
        this.VKI_target.focus();
      } else this.VKI_close();
    }
  }


  /* ******************************************************************
   * Position the keyboard
   *
   */
  this.VKI_position = function() {
    if (self.VKI_visible != "") {
      var inputElemPos = VKI_findPos(self.VKI_target);
      self.VKI_keyboard.style.top = inputElemPos[1] - ((self.VKI_target.keyboardPosition == "fixed") ? document.body.scrollTop : 0) + self.VKI_target.offsetHeight + 3 + "px";
      self.VKI_keyboard.style.left = Math.min(VKI_innerDimensions()[0] - self.VKI_keyboard.offsetWidth - 15, inputElemPos[0]) + "px";
    }
  }


  if (window.addEventListener) {
    window.addEventListener('resize', this.VKI_position, false); 
  } else if (window.attachEvent)
    window.attachEvent('onresize', this.VKI_position);


  /* ******************************************************************
   * Close the keyboard interface
   *
   */
  this.VKI_close = function() {
    try { this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard); } catch (e) {}
    this.VKI_visible = "";
    this.VKI_target.focus();
    this.VKI_target = "";
  }
}


/* ***** Attach this script to the onload event ******************** */
if (window.addEventListener) {
  window.addEventListener('load', buildKeyboardInputs, false); 
} else if (window.attachEvent)
  window.attachEvent('onload', buildKeyboardInputs);


/* ********************************************************************
 * Handy element positioning function
 *
 */
function VKI_findPos(obj) {
  var curleft = curtop = 0;
  do {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
  } while (obj = obj.offsetParent);    
  return [curleft, curtop];
}


/* ********************************************************************
 * Return the dimensions of the viewport, also from Quirksmode.org
 *
 */
function VKI_innerDimensions() {
  if (self.innerHeight) {
    return [self.innerWidth, self.innerHeight];
  } else if (document.documentElement && document.documentElement.clientHeight) {
    return [document.documentElement.clientWidth, document.documentElement.clientHeight];
  } else if (document.body)
    return [document.body.clientWidth, document.body.clientHeight];
  return [0, 0];
}


/* ********************************************************************
 * Return an element's set style
 *
 */
function VKI_getStyle(obj, styleProp) {
  if (obj.currentStyle) {
    var y = obj.currentStyle[styleProp];
  } else if (window.getComputedStyle)
    var y = window.getComputedStyle(obj, null)[styleProp];
  return y;
}
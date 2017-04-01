import React, {Component} from 'react';
import './Style/asciiFaces.scss'
export default class AsciiFaces extends Component {
  constructor() {
    super()
    this.state = {
      left: 0,
      size: 1
    }
    this.asciiFace = this.asciiFace.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.parseAsciiText = this.parseAsciiText.bind(this)
    this.wrapChars = this.wrapChars.bind(this)
    this.fadeAscii = this.fadeAscii.bind(this)
    this.asciiText = this.asciiText.bind(this)
    this.randomSpot = this.randomSpot.bind(this)
  }

  setDimensions

  updateDimensions() {
    document.querySelector('code').style.fontSize = Math.min(window.innerWidth * 0.01, 11)
    document.querySelector('code').style.lineHeight = Math.min(Math.max((window.innerWidth * 0.005), 3.5), 5.6)+'px'
    document.querySelector('code').style.left = (window.innerWidth - document.querySelector('code').offsetWidth) / 2
    document.querySelector('code').style.top = (window.innerHeight - document.querySelector('code').offsetHeight) / 2
  }
  componentWillMount() {
    window.addEventListener("resize", this.updateDimensions)

  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions)
  }
  componentDidMount() {
    this.updateDimensions()
    this.parseAsciiText()
  }

  parseAsciiText() {
    let preparedAscii = this.insertLetters(this.asciiText())
    document.querySelector('code').innerHTML = this.wrapChars(preparedAscii)
  }
  randomSpot(sentenceLength, asciiLength) {
    let randomNumber = Math.round(Math.random() * 9)
    if (randomNumber === 0 || sentenceLength === asciiLength ) {
      return true
    } else {
      return false
    }
  }
  insertLetters(str) {
    let sentence = "Hi, my name is Jeff"
    let newString = ''

    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i).match(/[@#]/g) && sentence.length > 0 && this.randomSpot(sentence.length, this.asciiText().length)) {
        newString += sentence.charAt(0)
        sentence = sentence.substr(1)
      } else {
        newString += str.charAt(i)
      }
    }
    return newString
  }
  wrapChars(str, tmpl) {
    let newString = ''
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i).match(/\W/g)) newString += `<span class="ascii-char">${str.charAt(i)}</span>`
      if (str.charAt(i).match(/\w/g)) newString += `<span class="ascii-letter">${str.charAt(i)}</span>`
    }
    return newString
  }
  fadeAscii() {
    let start = 0
    let elements = document.getElementsByClassName('ascii-char')

    let addFade = (elements) => {
      for (let i = start; i <= (start + 500); i++) {
        console.log(start, i, elements.length)
        if (i >= elements.length) {
          clearInterval(interval)
          return
        }
        elements[i].className += ' fade'
      }
      start += 500
    }
    addFade(elements)
    let interval = setInterval(addFade, 25, elements)
  }
  asciiText() {
    return `
++++++++++''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''+''''''''''+'''''''''++'++++++++++++##
++++++++''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''++++++++++++
++++++++'''''''''''''''''''''''''''''''''''''''''''''''''''''';;'''''';''''''''''''''''''''''''''''''''''''''''''''''''+,'''++++++++++
++++++''''''''''''''''''''''''''''''''''''''''''''''''';''';;:,,,;,:;,,::,,:;;';;'''''''''''''''++++++++++++++++++++++++++++++########
++++++''''''''''''''''''''''''''''''''''''''''''''++++++++:'.'..................';+'+''''''''''''''''''''''''''''''''''''''''++++++++#
++++++'+''''''+++++++++++++++++++++++'++'''''''';';';;;;;:'.'........'.'....''....'',,';;;'''''''''''''''''''''''''''''''''''''+++++++
##++++++++''''''';;'';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:.'''.......''.'''''''''''''''..,:;;;;;;;'';;;'';'''''''''''''''''''''''''+++++
++++''''''''';;;;;;;;;;';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;''.'''''.....'.'...''''''''.''''.',;;;;;;;';;;'';;'';'''''''''''''''''''''++++++
++'+''''''';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,''''''''''...'''''''''''''.''''''''''',;;;;;;;;;;;;;;;;;;''''';''';'''''''''+++++
++++''''''';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:,.''''''''''...'..''''''..'.......'.''''..;;;;;;;;;;;;;;;;;;;;;;;;;;';'''''''''+++++
+++'''''';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:.'''''''''''...........'''''''''''''''.'''.',;;;;;;;;;;;;;;;;;;;;;;;;;;;;'''''''+++++
++'''''';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;::''''''''''''.......''''''''''''''''''''''''''',;;;;;;;;;;;;;;;;;;;;;;;;;;;;'''''''++++
++'''''''';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::,'''''''''''''..'.'''''''''''''.....'.''''''''''',;;;;;;;;;;;;;;;;;;;;;;;;;''''''''+++++
++''''''';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,''''''''''''''''''..''''.'...''...,:,,....'''''''.''''''+++++++++++++++++++++++++++######
+++'''''';';;;;;;;;;;;;;;'''''''''''+++++'''''''''''''''''''...........,,.,.,,:''+';:,......'''''.;;;;;;;;;;;;;;;;;;;;;;;;;;''''''++++
++++++++++++++++'''''''';;;;;;;;;;;;:;;;:,.''''''''''''''.......,,,,:::;;::::;;+@@##;::,,,.....''..;:;;;;;;;;;;:;;;;;;;;;;;;;''''''+++
++'''''';;;;;;;;;;;;;;;;;;;;;;;;:;;;;;:::''''''''''''.......,,:,,::,:;;'@@';;'#@@@@@#':;;:::,,...''':;;;;;;;;;;;;;;;;;;;;;;;''''''++++
++''''';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;.''''''.....,.,.,,,,.,,,:::;;'+@@@@@@@@@@@@@@@@#++;''';:,...'':;;;;;;;;;;:;;;;;;;;;;;''''''++++
++''''';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:,''''''..,,:::::,,,,,,:;';'+#@@@@@@@@@@@@@@@@@@@@@@@@@';;;:,..''.:;;;;;;;;;;;;;;;;;;;;;;'''''+++
++'''';;;;;;;;;;;;;;;;;;;;;;;;;;;::;,''''''..,:::,;;;::::'+''+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+;:,..''',::;;;;;;;;;;;;;;;;;;;''''++++
+''''';;;;;;;;;;;;;;;;;;;;;;::;::::.'......,,::;::::;'''#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@':::,...'';:;;;;;;;;;;;;;;;;;;'''''+++
++'''';;;;;;;;;;;;;;;;;;:;:;;;::::'..,,,,,,,::;:::'#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@;::::,.'''::;;;;;;;;;;;;;;;;;''''++++
+'''''';;;;;;;;;;;;;;:;;:;;;;;:;:'.,,;;:::::;;;'#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@######@@@@@#;::::,,..',:;;;;;;;;;;;;;;''''''++++
+'''''';;;;;;;;;;;;;;;;;;;;:::;;...:;;;;:;:;'+@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@########@@@@@#;::::,.'',+++++++++++++++++++#####
++''''''''';';'''''''''+'++++++'',:;'';;;+###@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@#@@@#@@##++#####@@@@@#;;;;;:..',:;;;;;;;;;;;;;;;''''+++
##++++++''';;;;;;;;;;:::::::::.'.:;;';;;+##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##+++++#+###@@@@@+';:;:,..',:;;;;;;;;;;;;;'''''+++
+''''';';;;;;:;:;;:;;:;;;;;:::..,::;''+###@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##@@@@@@@@#+++++++#++##@@@@#+';;:::,.'::;;;;;;;;;;;;;''''+++
++'''';;;;;;;:;;;;;;;::;;;;::.'.,::''+###@@@@@@@@@@@@@@@@@@@@@@@@@@@#@##@##@#@@@@@@##+'''''++#+###@@@@#+;;:::,...;;;;;;;;;;;;;;''''+++
++'''';;;;;;;;;;;;;;::::;;:;,'.,;::''+###@@@@@@@@@@@@@@@@@@@@@@#@@@@########@@@@@###''';''''++++###@@@@+':::::,..::::;;;;;;;;;'''''+++
++'''';;;;;;;;;;;::;::::::::..,;:::''+##@@@@@@@@@@@@@@@@@@@@@#@@@@@#########@@@####+;'';;;''''+#+##@@@@#+':,,,,..':::;;;;;;;;;;'''++++
+''''';;;;;;;;;:;;:::;:::::,',:;::;'++#@@@@@@@@@@@@@@@@@@@@@@##@@###########@######;;;:::;;;;''++###@@@#++',,,,,.',;:;;;;;;;;;;''''+++
++'''';;;;;;;;;;;:;:;:::;::'.:';;';+'+#@@@@@@@@@@@@@@@@@@@@@@##@############@#####';:::::::;;;''++##@@@@#'+:,,.,...::;;;;;;;;;;''''+++
++''';;;;;;;;;;;;;;:;;;;::'.:;;'';'+++#@@@@@@@@@@@@@@@@#@@@@@######;#+##########++;:,,,,,::::;;''+###@@@#+++,,,,..':;;;;;;;;;;''''++++
++'''';;;;;;;;;;:;;;;;;;;:',;;:'''''+++#@@@@@@@@@@@@@@@@@@@@########+##########++;:,,,,,,,:::;;''++##@@@##'';,,,,..'+++++++++++++#####
+++++++++'++++'+++'++++++'.,;::'++++++##@@@@@@@@@@@@@@@@@@#########+##########+'+:,.,,,,,,:::;;''++##@@@@#+'';,,:,..,:::;:;;;;;''''+++
+++'''';;;;;::::;;;;;;;::..:;;;'+++'++##@@@@@@@@@@#@@@@@@@@###@;####@########+'+;:,.,,,,,,::;;''++++#@@@@##++';,,,..'::;;;;;;;;'''++++
++'''';;;;;;;;;:;;;;;;:::',:;:;'++++++#@@@@@@@@@@@@@@@@@@@######@##@#########':':,,,,,,,:;:;'+#####+##@@@###'+';::,.',:;;;;;;;;'''++++
++'''';;;;;;;;;;:::;;:;:'.,;::''++++++##@@@@@@@#@@@@@@@@@#@@@@@@#@###@######';#::,,,,::;'+############@@@@##'';'':,..'::;;;;;;;'''++++
++'''';;;;;;;;:;;:;::::,'.:;:;++++++++#@@@@@@@@@@@@@@@@@@@@@####@@@#@####+#';+:,:,:''+#############@@@@@@@#++';::':,.':;;;;;;;;''''+++
++'''';;;;;;;;;;:::;:::..,;;:;++'++##+##@@@@@@@@@@@@@@@@@@@@#@@@@@#@#@##+#';';::,:;'+##@#######+###@@@@@@@@+#'':::':..':;;;;;;;'''++++
++'''';;;;;;;;::;;;:;:,',:;;;;''''+#####@@@@@@@@@@@@@@@@@@@@@@@@##@@@##++';+;::,::;+#####++';;''+++#@@@@@@@#++':,:;':.',:;;;;;;'''++++
++'''';;;;;;;;;;;;:;::'.:;;:;;''''+####@@@@@@@@@@@@@@@##@@@#@@@@@@@@###+';+':,,::;;'''''';;:::::;'++##@@@@@@'#'',:;;;,..:;;;;;;'''++++
++'''';;;;;;;;;;;;;;::.,::::;''''''####@@@@@@@@@@@@@@@@@@@@@@@@#######+''+;:,,::::;:;::;;::,,:,:;'+++#+#+####++';,,;;:.':;;;;;;'''++++
+++''';;;;;;;;;;:;;;:'.::;:;;+'''''+###@@@@@@@@@@@@#########@#######++'+';::,,,:::::;:;::,:;'++++#######+###+####::;;:..'''''++++++###
####+#+#++++++++++++'',:;;;:;''';'''###@@@@@@@@@@##++++###########+++#+;;:::,,,,::::::'+++++##+;::::;++';;+@####++::':,..:;;;;''''++++
++'''';;;;;;;;:::::;,.,:::::'''''';'+#@@@@@@@@@@@#+#++++#+++#@#####+';';;;::,,,,,::'++###;.....,,,::;#+###':######;::::..,;;;;;;'''+++
++''''';;;;;;;;;;;::'.::,,:;'''''''''+#@@@@@@@@##++#####+####+####+++'';;::,,,:;++#+#+,.,,....,,,:::;'+#+++#,####+;::::,..;;;;;'''++++
++'''';;;;;;;;;;:;::'.,,,:;'''''''''++@#@@##++######+';::::::::;;+##++++++++##++###;.,,,::,,,,::::::;'######'####+;;,,,...;;;;;''''+++
++'''';;;;;;;;;;;::,.,,,,,:';;;;'''+++@@#+#+###+;';:,,:::::::;;;:::::#+++++###+###,,:::;;::::,:::;::;'#######'####':,,,...:;;;;''''+++
++'''';;;;;;;;;;;;:..,:::::;';;;;;''+#@####+#;+#++;:,,::,,,::;;;;:::::+++++######,::::;''+''+''';;;;;'#####+';##+#';:,,,..,;;;;'''++++
++'''';;;;;;;;;;:::'.:,,,,:;;';;';'++######+:++#+';::::::;;'+'''';:::::+++##@####::::;;;;+';'+,'+';;;;+###+'':##'+;:::,,...;;;;'''++++
++'''';;;;;;;;;;;::.,,,,,,:''';;;;''+#######,#+++;:::::'':;';;'';;;::::+++##@@@##,:,;;;:;++'+;,;'';;:;'###+'',##;';:,::,...;;;;''''+++
+++''';;;;;;;;;;;;;'.....,;;:;;;;'''+#######;++++:,,::'':,:''''':;;:,::++##++#@@#,:,::;;:'++;::;;;::::;+##+'',##;';;:::,,..;;;''''++++
+++'''';;;;;;;;;;;;'....,;;::;;;;''+########'+'++,,,,:;;:,.'''';;::::,:#+#';;'+@#:,,,,:::::::,,:::::::;'##+';,#+';;:,,:,...:''''+++++#
####++#######++++++.....::;:;:;;';'+###+####''''+,,,,,::,::::::::::::,,+#+:,.,;##;:,,,,:::,,,,,,,,,,:::'##+';:#+';;;,,,,,,.,'''+++++##
+++''';;;;;;;;;;::..,...:,:::;;;;;'+#+++####'';'+,,,,,,,,,,,,,,,,:,,,,,+#;.....+@#,,,,,,,,,,,,,,,,,,,::;##+':;#+';;::,,,,...;;;'''++++
++''''';;;;;;;;;::.',,.,,,;:::::;;'+#+++###@;;;;',,,,,,,,,,,,,,,,,,,,,,##......,##:,,,,,,,......,,,,,,::+#+',##+';;,,,,,,...;;;'''++++
++''''';;;;;;;;;::.'..,,.,;:::::;;'++'++###@,;;';,,,........,,,,,,,,,,;#'.......##,,,,,,...........,,,::'#+'.###';;:.,,,,...;;;'''++++
++''''';;;;;;;;;::'...,,,,;:::::;;'++''++###';;':,..............,,,,,,+@........,##,,,,,............,,,:;#';,###+;;;..,,,,..;;;'''++++
++'''';;;;;;;;;:;;'.:.,,.:::::::;;''+'+++##+';;',................,,,,,#+,.......,+#,,,,.............,,,:;#':;#@#';:;....,,..:;;'''++++
++''''';;;;;;;;;;;'..,,..:::::::';''+'+++###';;;,.................,,,,#,,........,@+,,,..............,,,:+''+#@#'';:,...,,..:;;'''++++
++''''';;;;;;;;;;:..,:,.,,::::::;;'++''#+###@,;;..................,,,+#,..........:+,,,,.............,,,:+.:#@@#'';;,....,..,;;'''++++
++''''';;;;;;;;;::...,...,::,,:::;';'''+#####';;,.................,,,#:,.........,,##,,,............,,,,,.'#@@@+'';;:....,...'''''++++
+++'''';;;;;;;;;::...,....:::,::;;;;'+''+####'::,................,,,'#,,..........,+#',................,++#+@@@+''';:,...,...;''''+++#
######+####+###+#+'..,...,:,:,:::;;;''''+##@##':,,...............,,,++,,..........,,;#+''.....'''',:'+##+:;'@@@+;';:,:,..,...#########
+++'''';;;;;;;;;;:.......,::,,::::;;;''++#####+ :...............,,'+#:,,..........,,::###+++++#####+:..,::;'@@@+';;:,,,...,..'''''++++
+++'''';;;;;;;:;;:.,...,.,:,,,:::;;;'''++####'##.'............'';+##,,,,........,,,.,::,.,,,..,,,,,,,,,,:,;'@@@+';;:,,,,,,...;;'''++++
++''''';;;;;;;;;;:...,,..,::,:::::;;''+'++###'.+#+++';;;;;'+++###;;,,,,,,,......,,,,,,::,,,,,,,,,,,,,,,,,::'@@@#';;;:,,,,.,,.;;'''++++
++''''';;;;;;;;;;:...,..,,:::::::;;:''''++###+,,...:;;';;;:,...,:::,,,,:,,,,,,,,::,,,,,::,,,,,,,,,,,,,,,,,;+@@@#'';;;,,,,.,,.:;'''++++
++'''';;;;;;;;;;;:...,..,,:::::::;;:''+'''####,,......,,,,,,,,,::;,,,,:::::,,,,,:::,,,,::,,,,,,,.,,..,,,,,:+@@@@';;;;,.,,,,,.,''''++++
++''''';;;;;;;;;;;...,..,,,::::::;;;+;';''####,.....,,,,,,,,,,,,::,,,:+#+::::::;#+':,,,:,,,..........,,,,::+@@@@+;:;:,,.,,,..,;'''++++
++''''';;;;;;;;;;:...,..,,:;::::;::;;;;;;'####,,......,,..,,,,,,,:,,:';'';;:::;''';;,,:,,.............,,,::#@@@@+;:;:...,,,,..;'''++++
++''''';;;;;;;;;:;'..,..,,:::::::::;;;;;;'####,,..............,,,,:::;;;;;;::;';'''';:,,,.............,,,:;#@@@@+;:;;,...,,,,.;;''++++
+++''''';;;;;;;;;;...,.,,,::::::::::;:;;;'###+:,..............,,,,,:;'';:;:::::::''';:,,,..............,,:;#@@@@#'::;:,..,,,..;'''++++
##################.,.,,,,,:::::::;:;::::;+#+++;...............,,,,,,:::::,:::::::::::,.................,,:;@@@@@@+;;;:,.......##+#####
++''''';;;;;;;;;;;.,.,,,,:::::::::::::::;+#+++;...................,,,,,,,,,,:,:,,,,:,,.................,,:;@@@@@#';:;:,.......''''++++
++'''';;;;;;;;;;;;.,.,,,,:::::::::,:::::'##+++;,....................,,,,,,,,:,,,,,,,,,................,,,:'@@@@@@;;;::,....,..''''+++#
++''''';;;;;;;;;;;'.,,.,:::::::::,:::::;'+#+++#......................,,,,,,,,,..,,,,,,,................,,:'@@@@@#;;;::,,..,,..;'''++++
++'''';;;;;;;;;;;:.,.,,,,:::::::::,::,,;+++'++#......................,,,..,,,,.....,,,...............,.,,:+@@##@#+;;::,,,,,,,.;'''++++
++''''';;;;;;;;;:;..,:,,,:::::,,,:,::,:'++++++#............................,,,.....,,,,,,.............,,,:#@@@#@##;;::,,,,,,.,:'''++++
++'''';;;;;;;;;;:;.,.,.,::::::,::,,::,:''''+'+#..................,,........,,,..,.,,.,.,,,,,..........,,,:@@@@@@##:::::,,,,,..,'''++++
++''''';;;;;;;;;;;.,,..,,::,,,,,,,,,:,:''';+'+#:,..............,,,,,,,,,,:,.,,,,::,,,,,,,,,,,,.......,,,,;@@@@@@##:::::,,,,,...'''++++
+++''';;;;;;;;;;;;.....,:::,,,:,,,,,,:,;;;''++##..............,,,,,,,,::::::::::::;::,,,,,,,,,......,,,,,'@@@##@@#;::::,,,,,,..'''++++
+++'''';;;;;;;;;;;....,,::,,,,,,,,,,,,,;;;''#+#@.............,,,:,,,:;;;:::::::::::;;;::::,,,,......,,,,:#@@@@#@@#'::::,,,,,,,.'''++++
############++++++.,.,,,,:::,,.,,,,,,::;''''###@............,,::'';'''';::::::::'''++++#+;:,,,........,,:@@###@@##'::::,..,.,.,+++++##
++''''';;;;;;;;;;;'..,,,,,:::,,,,,,::;'+++++#@#@;...........,,:;';';'';';'+'++'';;::::::,,,,,........,,,;@@@@@##@#':,:::...,,..+++++##
++''''';;;;;;;;;;;',.,.,::,,,,,,,::;;;;'+######@@............,::,,,,,,,,,,,,,.,,..,,,,,,.............,,,#@@@@#@@@#';::,:,.,,,,,'''++++
++'''';;;;;;;;;;;:...,.,,,:,,,,,:;;;:::;+####''@#,............,,,.,,,,,,.,,..,....,,,,,.............,,,:#@@@@@#@##'',,::,,,,,,,'''++++
++''''';;;;;;;;;;;.....,:::,,,,,:;;:,,,:####+;'#;;..................,,,,..,.......,,,..............,,,:+#@@@@@@@@#+',,,:,,,,,,,;''++++
++''''';;;;;;;;;;:...,,,::,,,,,:;:,,,,,;@###;;#:;;,..................,,,,,,,.,,,,.,,..............,,,,:##@@@@@@@@#+;;,,:,.,:,,.:''++++
++'''''';;;;;;;;;;,..,.,,,,,.,::,,,,.,:+####:#:;;;',....................,,,,,,,,............,....,,,,:'#@@@@@@@@##+'',,::,,,,,.,''++++
++''''';;;;;;;;;:;:.....,,:,,::,,,.,,,:####@@::;;'#,,..,...............,,,,,,,,,,,..,..........,,,,,,:##@@@@@@@@@#+';,,,:,,,,,.,''++++
++''''';;;;;;;;;;;;......,:,,::,,...,,;#@#@@#@#'#';+,,,,,,,:,,..........,,,:;::,,..........,,..,,,,,:+#@@@@@@@@@@##';:,,::,,,,,,''++++
+++'''';;;;;;;;;;;;..,.,,,:,,,:,..,.,:+##@@@##@+#;:+,,,,,,,,,,............,,,,,............,,..,,,,:;##@@@@@@@@@@@#';:::::,.,,,,'+++++
################+#+',,...::,,,,.....,;+##@#'##@@+@#@',,,,,,.,,,.........................,.,,..,,,,,:+##@@@@@@@@@@@#';:::::,.,,,,'++++#
+++''''';;;;;;;;;;;'.....,:,,,,...,.:;+###'''',#@@@@;+,,,,,,,.,,..........................,,.,,,,,,;+#@@@@@@@@@@@@@':;:,:,:,,,,,#####@
+++'''';;;;;;;;;;;;.......,,..,....,:;+#@+'''''''@@@@@:,,,.,...,.........................,....,,,,:##@@@@@@@@@@@@@@+;:;:::,:,:,,''+++#
+++'''';;;;;;;;;;;;;.....,,,.,....,:;;++#.#'#:'.@@@@@@@,,,,,.................................,,,,:'##@@@@@@@@@@@@@@#;:;:::,,,,,,;'+++#
+++'''';;;;;;;;;;;;;',.......,....,::;+##+###@@@@@#@#@@@:,,,.................................,,,,;+#@@@@@@@@@@@@@@@@;:::,:,:::,,,'+++#
++''''';;;;;;;;;;;;;'.....,,:,....,::'##.#;#@#@@@'@@@@@@#,,,,............................,,,,,,,;++#@@@@@@@@@@@@@@@@;::::;,,:::,,'++++
++'''''';;;;;;;;;;;;:.......:....,,::'#+ ''''+@@+'@@@@@@@+:,,,,.........................,,,,,,,;'+#@@@@@@@@@@@@@@@@@;::::::,,::,,;+++#
+++''''';;;;;;;;;;;;;.....',:,...,::;@@''''',@@@;#@@@@@@@@#::,,,...........................,,:;'++#@@@@@@@@@@@@@@@@@';:::::,:::,,:+++#
+++''''';;;;;;;;;;;;;'..''.::...,,::+##.@@@;##@+:@@@@@@@@@@@;:,,,........................,,,:;''+#@@@@@@@@@@@@@@@@@@';::::;::,:,,,+++#
++++''''';;;;;;;;;;;;,.'''..:...,,::@+'###@##@@;:@@@@@@@@@@@@'::,.....................,,.,,:;''++#@@@@@@@@@@@@@@@@@@';;:::;;,:::,,++++
######################'.....,,.,,,:##@#'.++#@##:,@#@@@@@@@@@@@#:,,......................,::;+''++#@@@@@@@@@@@@@@@@@@+;;;:::::,:::,'++#
++++'''';;;;;;;;;;;;;;'.....,,.,::,@@#.'' ###@#:;#@@@@@@@@@@@@@#':,,,..............,,,,,,:'''+++#@@@@@@@@@@@@@@@@@@@+;:::::;::::,,+###
+++'''''';;;;;;;;;;;;;.......,.,,:#@@+''    :@+:'@@@@@#@@@@@@@@@#+:,,,,,,,,,...,,,,,,,,:;''+++###@@@@@@@@@@@@@@@@@@@+;:::::::::::::++#
+++'''''';;;;;;;;;;;;;;.'......,,:#@@+:'' '''@+:+@@@@@@@@@@@@@@@@@#;:,,,,,,,,,,,,,,,:,:;''+++####@@@@@@@@@@@@@@@@@@@+;:::::;;::::::+++
+++''''';;;;;;;;;;;;;;;'..'..,,.:#@@#;  ''''.@':#@@@@@@@@@@@@@@@@@@@+;::::,:::::::,::'++++#####@@@@@@@@@@@@@@@@@@@@@+;;::::;;::::::;++
+++'''''';;;;;;;;;;;;;;,.'''.,..;@@@@'''+:'':@,:+#@@@@@@@@@@@@@@@@@@@@#;;:;;;;;;;:;'########@@@@@@@@@@@@@@@@@@@@@@@@+;;:::::;:;;:;::++
+++''''';;;;;;;;;;;;;;;;''......#@@@@'+@##.''@#;+@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+;:::::::::;;:::++
++'''''';;;;;;;;;;;;'###''....,:@@@@@###@@ ';@#;'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+';::::::;:;;;;;'+
++++'''';;;;;;;;;'##'###+.....'#@@@@+####@'.#@@;'#@@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+';;;::::;;:;;;;:#
++++''''';'++:+++++######'.,..'#@@@@''  ##@'@@@;;#@@@#@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##+'';;;:::;':;';;:+
#########'#+++#########';.....#@@@@''  '#,@@@@@;:@@@@@#'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+'';;;:::;;:;';;;
++++'''+###@@###+########+...:@@@@@@'''.@@@@@@@;:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##+''';;;;;'';;';;
+++'''#@###@###++####+####'..@@#@@@+'@##@#+@@@@;;#@@@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##+'''';;;;'';'';
+++++@#+##@####+#########+,''@@@@@@###.@@@@@:@@;:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@####+'''';';;;;;''
+++#@@#+#@#####+###########.#@@@@@@+'  @@@@@@@@':#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###+++'';;;';;';;'
+++@@#++@@#########+########@@@@@@@+  ,#@@@@@@@':#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##++++;;'';;';;';'
++@@@@+#@#######+;+'++++###@@@@@@@#   ;@@@@@@@@;:+@###@#@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+++'+;;;;''';;'''
+@@@@##@#########++++#++##@@@@@@@@+'',#@@@@@@@@::'@#:@@@+@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+''@@@@@@@@@@@@@@++'''';;;'''';'''
@@@@############@##++#####@@@@@@@@:.+#@@@@@@@@@;:'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+';;#@@@@@@@@@@@@@#+''''';:;;'';;''
@@@#############@####+###@@@@@@#@@'#@@@@@@@@@@#::;#@@@@@@@@@@@@@@@@@##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@';;:#@@@@@@@@@@@@@#'''''';;;;'';;;'
@@####@#########@@+#+####@@@@@@@@#''';#@@@@@@@@:::@@@@@@@@@@@@@@@@@####+'++##@@@@@@@@@@###@@@@@@@@@+;::#@@@@@@@@@@@@@@+;;;;;';;;''';;'
@@####@++'###############@@@@@@@@''''@@@@@@@@@@,::@@@@@@@@@@@@@@@@@###++'';'''''''''''++###@@@@@@@@#:::'@@@@@@@@@@@@@@#';:;;';;;;''';;
@####################+##@@@@@@@@@:' '#@@@@@@@@@::,#@@@@,@@@@@@@@@@@##+++';;;;;;;;;;''''++##@@@@@@#@@:::;@@@@@@#@@@@@@@@+;;:;:;';;'''';
#######@############+#'#@@@@@@@@@',''#@@@@@@@@#:,,#@#@@@@@@@@@@@@@@@#+'';;;;:;:;;;;;;;''++#@@@@@#+#@:::;@@@@@@'#@@@@@@@#;;::;;';;;;'''
#######@+##############@@@@@@@@@+++##@@@@@@@@@#::,@@@@@@@@@@@@@@@@@@#+'';;;::::::::::;;'++#@@@@@#;+#::::#@@@@@':#@@@@@@@';::::;';'''''
###@###@+############:@@@@@@@@@+@',:#@@#@@@@@@+::,#@@@@@@@@@@@@@@@@@@+';;;::::::::::::;;'+#@@@@@@''#;::,#@@@@@+;;#@@@@@@';:::::;';'';'
###@###@++#############@@@@@@@@## ':#@@@@@@@@@',::@@@#@@@@@@@@@@@@@@@+';;:::::,,,,:,:::;''+@@@@@@#;#;:,,@@@@@@+;::+@@@@@#;:::;::;'';''
###@####+###########+@@@@@@@@@@@+.''#@@#@@@@@@::::@;@#@@@@@@@@@@@@@@@#;;;::::,,,,,,,:::;''#@@@@@@@'';.'''+@#@@+;:::#@@@@#':::;:::'';''
###@@###############+#@@@@@@@@@@#,''##@@@@@@@@:,::#@@@@@@@@@@@@@@@@@@@+:::::,,,,,,,,:::;;'#@@@@@@@#+:''''''@@@#;;::,#@@@#+;:::::;;;+;'
####@################@@@@@@@@@@#@+':@@@@@@@@@@,:::@@@@@@@@@@@@@#@@@@@@@;::::,:,,,,,,::::;+#@@@@@#@#;.''  ''#@@@+;::::@@@@#;::::;:;'';;
  `
  }
  asciiFace() {
    return (
      <pre className='asciiFontSize'>
        <code>
          {this.asciiText()}
      </code>
    </pre>
    )
  }

  render() {
    return (

      <div id='faceWrapper'>
        {this.asciiFace()}
        <button onClick={this.fadeAscii}>Click me</button>
      </div>
    )
  }

}

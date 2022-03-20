import { derived, readable, writable } from 'svelte/store';
import { browser } from '$app/env';

const words = [
	{
		word: 'KAISA',
		type: 'champion',
		clue: ['from the void']
	},
	{
		word: 'INHIB',
		type: 'in-game objective',
		clue: ['each team has three']
	},
	{
		word: 'LILLIA',
		type: 'champion',
		clue: ['oh deer']
	},
	{
		word: 'XAYAH',
		type: 'champion',
		clue: ['one part of a power couple']
	},
	{
		word: 'JARVAN',
		type: 'champion',
		clue: ['flag on the field']
	},
	{
		word: 'TARIC',
		type: 'champion',
		clue: ['dazzling starlight']
	},
	{
		word: 'LETHAL',
		type: 'rune keystone',
		clue: ['in the precision tree']
	},
	{
		word: 'AZIR',
		type: 'champion',
		clue: ['emperor of the sands']
	},
	{
		word: 'JUNGLE',
		type: 'game term',
		clue: ['monsters live here']
	},
	{
		word: 'ELISE',
		type: 'champion',
		clue: ['arachnophobia, anyone?']
	},
	{
		word: 'SHEEN',
		type: 'game item',
		clue: ['part of trinity force']
	},
	{
		word: 'DRAGON',
		type: 'in-game monster',
		clue: ['kill enough of them and you get the soul']
	},
	{
		word: 'GRASP',
		type: 'rune keystone',
		clue: ['in the resolve tree']
	},
	{
		word: 'NEEKO',
		type: 'champion',
		clue: ['shapeshifter']
	},
	{
		word: 'BRAND',
		type: 'champion',
		clue: ["burning vengeance"]
	},
	{
		word: 'GWEN',
		type: 'champion',
		clue: ["don't run with scissors"]
	},
	{
		word: 'PYKE',
		type: 'champion',
		clue: ["the bloodharbor ripper"]
	},
	{
		word: 'XERATH',
		type: 'champion',
		clue: ['artillery mage']
	},
	{
		word: 'MINION',
		type: 'in-game character',
		clue: ['these might block you']
	},
	{
		word: 'BASE',
		type: 'in-game location',
		clue: ['keep it safe']
	},
	{
		word: 'KENCH',
		type: 'champion',
		clue: ["he'll give you a tongue lashing"]
	},
	{
		word: 'GRAVES',
		type: 'champion',
		clue: ['double barrel']
	},
	{
		word: 'ESPORT',
		type: 'league term',
		clue: ["I'm not a regular sport, I'm an ______"]
	},
	{
		word: 'SAMIRA',
		type: 'champion',
		clue: ['the desert rose']
	},
	{
		word: 'EKKO',
		type: 'champion',
		clue: ['the boy who shattered time']
	},
	{
		word: 'NASUS',
		type: 'champion',
		clue: ["beware his Q's"]
	},
	{
		word: 'TARGON',
		type: 'lore location',
		clue: ['mightiest peak in Runeterra']
	},
	{
		word: 'GLASC',
		type: 'champion',
		clue: ['chem baroness']
	},
	{
		word: 'WUKONG',
		type: 'champion',
		clue: ["now you see him, now you don't"]
	},
	{
		word: 'TALON',
		type: 'champion',
		clue: ["the blade's shadow"]
	},
	{
		word: 'VEIGAR',
		type: 'champion',
		clue: ['evil little yordle']
	},
	{
		word: 'ZERI',
		type: 'champion',
		clue: ['hails from Zaun']
	},
	{
		word: 'ORNN',
		type: 'champion',
		clue: ['the fire below the mountain']
	},
	{
		word: 'LEONA',
		type: 'champion',
		clue: ['the radiant dawn']
	},
	{
		word: 'JHIN',
		type: 'champion',
		clue: ['# # # #']
	},
	{
		word: 'WARD',
		type: 'game item',
		clue: ['can you see it?']
	},
	{
		word: 'MUNDO',
		type: 'champion',
		clue: ['probably not in your insurance network']
	},
	{
		word: 'BRAUM',
		type: 'champion',
		clue: ['massive biceps and an even bigger heart']
	},
	{
		word: 'NOXUS',
		type: 'lore location',
		clue: ['powerful empire with a fearsome reputation']
	},
	{
		word: 'DUO',
		type: 'game term',
		clue: ['you and a friend']
	},
	{
		word: 'BANDLE',
		type: 'lore location',
		clue: ['they speak yordle here']
	},
	{
		word: 'KAYLE',
		type: 'champion',
		clue: ['scale to win']
	},
	{
		word: 'LUCIAN',
		type: 'champion',
		clue: ['sentinel of light']
	},
	{
		word: 'RAKAN',
		type: 'champion',
		clue: ['one part of a power couple']
	},
	{
		word: 'KAYN',
		type: 'champion',
		clue: ['the shadow reaper']
	},
	{
		word: 'QIYANA',
		type: 'champion',
		clue: ['empress of the elements']
	},
	{
		word: 'RAMMUS',
		type: 'champion',
		clue: ['ok']
	},
	{
		word: 'FIZZ',
		type: 'champion',
		clue: ['amphibious yordle']
	},
	{
		word: 'SONA',
		type: 'champion',
		clue: ['maven of the strings']
	},
	{
		word: 'RANKED',
		type: 'game term',
		clue: ['not just for fun']
	},
	{
		word: 'UDYR',
		type: 'champion',
		clue: ['the spirit walker']
	},
	{
		word: 'GRAGAS',
		type: 'champion',
		clue: ['rowdy brewmaster']
	},
	{
		word: 'MID',
		type: 'game term',
		clue: ["they usually think they're the main character"]
	},
	{
		word: 'YASUO',
		type: 'champion',
		clue: ['anybody got a knock-up? anybody?']
	},
	{
		word: 'TURRET',
		type: 'game term',
		clue: ['might keep you safe']
	},
	{
		word: 'IGNITE',
		type: 'summoner spell',
		clue: ['does damage over time']
	},
	{
		word: 'RELL',
		type: 'champion',
		clue: ['the iron maiden']
	},
	{
		word: 'RENGAR',
		type: 'champion',
		clue: ['what a pretty kitty']
	},
	{
		word: 'SERAPH',
		type: 'game item',
		clue: ['let it embrace you']
	},
	{
		word: 'SORAKA',
		type: 'champion',
		clue: ['the starchild']
	},
	{
		word: 'REKSAI',
		type: 'champion',
		clue: ['the void burrower']
	},
	{
		word: 'ANNIE',
		type: 'champion',
		clue: ['the dark child']
	},
	{
		word: 'TEMPO',
		type: 'rune keystone',
		clue: ['in the precision tree']
	},
	{
		word: 'DIANA',
		type: 'champion',
		clue: ['scorn of the moon']
	},
	{
		word: 'LEGEND',
		type: 'game term',
		clue: ['the name of the game']
	},
	{
		word: 'YONE',
		type: 'champion',
		clue: ['the unforgotten']
	},
	{
		word: 'LANE',
		type: 'game term',
		clue: ['there are 3 of them']
	},
	{
		word: 'JINX',
		type: 'champion',
		clue: ['powder']
	},
	{
		word: 'POTION',
		type: 'game item',
		clue: ['keeps you healthy']
	},
	{
		word: 'DARIUS',
		type: 'champion',
		clue: ['the hand of noxus']
	},
	{
		word: 'JANNA',
		type: 'champion',
		clue: ["the storm's fury"]
	},
	{
		word: 'PENTA',
		type: 'game term',
		clue: ["gotta kill 'em all"]
	},
	{
		word: 'FLASH',
		type: 'summoner spell',
		clue: ['jump around']
	},
	{
		word: 'OLAF',
		type: 'champion',
		clue: ['the berserker']
	},
	{
		word: 'SINGED',
		type: 'champion',
		clue: ["rule #1: don't chase him"]
	},
	{
		word: 'RENATA',
		type: 'champion',
		clue: ['chem baroness']
	},
	{
		word: 'ZAC',
		type: 'champion',
		clue: ['bouncy bouncy bouncy']
	},
	{
		word: 'JAYCE',
		type: 'champion',
		clue: ['the defender of tomorrow']
	},
	{
		word: 'AKSHAN',
		type: 'champion',
		clue: ['the rogue sentinel']
	},
	{
		word: 'VIEGO',
		type: 'champion',
		clue: ['the ruined king']
	},
	{
		word: 'VEX',
		type: 'champion',
		clue: ['doom and gloom']
	},
	{
		word: 'KARMA',
		type: 'champion',
		clue: ['the enlightened one']
	},
	{
		word: 'BARON',
		type: 'in-game objective',
		clue: ['might help you close out the game']
	},
	{
		word: 'SPELL',
		type: 'game term',
		clue: ['you get two of them']
	},
	{
		word: 'VI',
		type: 'champion',
		clue: ['the piltover enforcer']
	},
	{
		word: 'THRESH',
		type: 'champion',
		clue: ['the chain warden']
	},
	{
		word: 'KOGMAW',
		type: 'champion',
		clue: ['the mouth of the abyss']
	},
	{
		word: 'RIFT',
		type: 'in-game location',
		clue: ["summoner's ____"]
	},
	{
		word: 'SHEN',
		type: 'champion',
		clue: ['the eye of twilight']
	},
	{
		word: 'BOOTS',
		type: 'champion',
		clue: ["cassiopeia wouldn't buy them.."]
	},
	{
		word: 'AATROX',
		type: 'champion',
		clue: ['the darkin blade']
	},
	{
		word: 'BAN',
		type: 'game term',
		clue: ['you only get one']
	},
	{
		word: 'NAMI',
		type: 'champion',
		clue: ['the tidecaller']
	},
	{
		word: 'CORKI',
		type: 'champion',
		clue: ['the daring bombardier']
	},
	{
		word: 'POPPY',
		type: 'champion',
		clue: ['keeper of the hammer']
	},
	{
		word: 'TEEMO',
		type: 'champion',
		clue: ['the swift scout']
	},
	{
		word: 'SHACO',
		type: 'champion',
		clue: ['the demon jester']
	},
	{
		word: 'BARD',
		type: 'champion',
		clue: ['the wandering caretaker']
	},
	{
		word: 'IXTAL',
		type: 'lore location',
		clue: ['renowned for its mastery of elemental magic']
	},
	{
		word: 'ARCANE',
		type: 'rune keystone',
		clue: ['now available on netflix!']
	},
	{
		word: 'IVERN',
		type: 'champion',
		clue: ['the green father']
	},
	{
		word: 'KLED',
		type: 'champion',
		clue: ['the cantakerous cavalier']
	},
	{
		word: 'IONIA',
		type: 'lore location',
		clue: ['known to many as the First Lands']
	},
	{
		word: 'DRAVEN',
		type: 'champion',
		clue: ['welcome to the league of ______']
	},
	{
		word: 'ARDENT',
		type: 'game item',
		clue: ['just here for support']
	},
	{
		word: 'KENNEN',
		type: 'champion',
		clue: ['lightning-quick']
	},
	{
		word: 'RYLAI',
		type: 'game item',
		clue: ['might slow you down']
	},
	{
		word: 'VARUS',
		type: 'champion',
		clue: ['the arrow of retribution']
	},
	{
		word: 'AMUMU',
		type: 'champion',
		clue: ['everybody needs a friend']
	},
	{
		word: 'AERY',
		type: 'rune keystone',
		clue: ['summon ____']
	},
	{
		word: 'ASHE',
		type: 'champion',
		clue: ['the frost archer']
	},
	{
		word: 'ZAUN',
		type: 'lore location',
		clue: ['not Piltover, but nearby']
	},
	{
		word: 'ZYRA',
		type: 'champion',
		clue: ['rise of the thorns']
	},
	{
		word: 'SIVIR',
		type: 'champion',
		clue: ['the battle mistriss']
	},
	{
		word: 'JAX',
		type: 'champion',
		clue: ['imagine if he had a real weapon']
	},
	{
		word: 'RYZE',
		type: 'champion',
		clue: ['one of the most adept sorcerers on Runeterra']
	},
	{
		word: 'AKALI',
		type: 'champion',
		clue: ['the rogue assasin']
	},
	{
		word: 'IRELIA',
		type: 'champion',
		clue: ['the blade dancer']
	},
	{
		word: 'VIKTOR',
		type: 'champion',
		clue: ['the machine herald']
	},
	{
		word: 'LUDEN',
		type: 'game item',
		clue: ['splash damage']
	},
	{
		word: 'VAYNE',
		type: 'champion',
		clue: ['the night hunter']
	},
	{
		word: 'RUNAAN',
		type: 'game item',
		clue: ['hurricane']
	},
	{
		word: 'EZREAL',
		type: 'champion',
		clue: ['you belong in a museum']
	},
	{
		word: 'LUX',
		type: 'champion',
		clue: ['the lady of luminosity']
	},
	{
		word: 'ATTACK',
		type: 'game term',
		clue: ['auto ______']
	},
	{
		word: 'ADC',
		type: 'game term',
		clue: ['usually ranged']
	},
	{
		word: 'ZED',
		type: 'champion',
		clue: ['the master of shadows']
	},
	{
		word: 'ZILEAN',
		type: 'champion',
		clue: ['the chronokeeper']
	},
	{
		word: 'SION',
		type: 'champion',
		clue: ['the undead juggernaut']
	},
	{
		word: 'ZOE',
		type: 'champion',
		clue: ['do you feel sleepy?']
	},
	{
		word: 'TAHM',
		type: 'champion',
		clue: ["he'll give you a tongue lashing"]
	},
	{
		word: 'NUNU',
		type: 'champion',
		clue: ['the boy and his yeti']
	},
	{
		word: 'TOP',
		type: 'game term',
		clue: ['not the bottom']
	},
	{
		word: 'SWORD',
		type: 'game item',
		clue: ['long _____']
	},
	{
		word: 'TIAMAT',
		type: 'game item',
		clue: ['cleave damage']
	},
	{
		word: 'RIVEN',
		type: 'champion',
		clue: ['the exile']
	},
	{
		word: 'HEAL',
		type: 'summoner spell',
		clue: ['often taken by ADCs']
	},
	{
		word: 'SMITE',
		type: 'summoner spell',
		clue: ['junglers like it']
	},
	{
		word: 'RUMBLE',
		type: 'champion',
		clue: ['the mechanized menace']
	},
	{
		word: 'ILLAOI',
		type: 'champion',
		clue: ['the kraken priestess']
	},
	{
		word: 'QUINN',
		type: 'champion',
		clue: ["demacia's wings"]
	},
	{
		word: 'GNAR',
		type: 'champion',
		clue: ['boomerang throw']
	},
	{
		word: 'YUUMI',
		type: 'champion',
		clue: ['the magical cat']
	},
	{
		word: 'HERALD',
		type: 'in-game objective',
		clue: ["don't forget to pick the eye up"]
	},
	{
		word: 'GHOST',
		type: 'summoner spell',
		clue: ['no minion block here']
	},
	{
		word: 'RIVER',
		type: 'in-game location',
		clue: ['touches each lane']
	},
	{
		word: 'SYLAS',
		type: 'champion',
		clue: ['the unshackled']
	},
	{
		word: 'ANIVIA',
		type: 'champion',
		clue: ['the cryophoenix']
	},
	{
		word: 'ZHONYA',
		type: 'game item',
		clue: ['go for the gold']
	},
	{
		word: 'FIORA',
		type: 'champion',
		clue: ['the grand duelist']
	},
	{
		word: 'SENNA',
		type: 'champion',
		clue: ['the redeemer']
	},
	{
		word: 'URGOT',
		type: 'champion',
		clue: ['the dreadnought']
	},
	{
		word: 'TWITCH',
		type: 'champion',
		clue: ['the plague rat']
	},
	{
		word: 'SYNDRA',
		type: 'champion',
		clue: ['the dark sovereign']
	},
	{
		word: 'FLEET',
		type: 'rune keystone',
		clue: ['_____ footwork']
	},
	{
		word: 'LULU',
		type: 'champion',
		clue: ['this tastes purple']
	},
	{
		word: 'WARMOG',
		type: 'game item',
		clue: ['crazy health regeneration']
	},
	{
		word: 'ZIGGS',
		type: 'champion',
		clue: ['the hexplosives expert']
	},
	{
		word: 'GALIO',
		type: 'champion',
		clue: ['the colossus']
	},
	{
		word: 'YORICK',
		type: 'champion',
		clue: ['shepherd of souls']
	},
	{
		word: 'KHAZIX',
		type: 'champion',
		clue: ['the voidreaver']
	},
	{
		word: 'COMET',
		type: 'rune keystone',
		clue: ['flies through the air']
	},
	{
		word: 'DORAN',
		type: 'game item',
		clue: ['starting item']
	},
	{
		word: 'MEJAI',
		type: 'game item',
		clue: ['this item can be a gamble']
	},
	{
		word: 'VOID',
		type: 'lore location',
		clue: ['kassadin, kaisa..']
	},
	{
		word: 'SWAIN',
		type: 'champion',
		clue: ['the noxian grand general']
	},
	{
		word: 'AHRI',
		type: 'champion',
		clue: ['nine-tailed fox']
	},
	{
		word: 'SOLARI',
		type: 'game item',
		clue: ['gives your teammates a nice fat shield']
	},
	{
		word: 'YORDLE',
		type: 'game term',
		clue: ['think lulu, tristana, teemo..']
	},
	{
		word: 'GAREN',
		type: 'champion',
		clue: ['not a fan of magic']
	},
	{
		word: 'MAOKAI',
		type: 'champion',
		clue: ['the twisted treant']
	},
	{
		word: 'KDA',
		type: 'game term',
		clue: ['kind of like a score line']
	},
	{
		word: 'VELKOZ',
		type: 'champion',
		clue: ['the eye of the void']
	},
	{
		word: 'SETT',
		type: 'champion',
		clue: ['the boss']
	}
];

const today = new Date().toDateString();

function pickWord() {
	let dateDiff = Date.parse(today) - Date.parse('Sat Jan 01 2022');
	// convert to whole days
	dateDiff = Math.round(dateDiff / (1000 * 3600 * 24));
	while (dateDiff >= words.length) {
		// get the left overs
		dateDiff = dateDiff % words.length;
	}
	return dateDiff;
}
const wordIndex = pickWord();
const randomWord = words[wordIndex];
// const randomWord = {
//     "word": "MAOKAI",
//     "type": "champion",
//     "clue": ["the twisted treant"]
// }
const todaysWord = readable(randomWord);

const wordLength = derived(todaysWord, ($todaysWord) => $todaysWord.word.length);

const maxGuesses = 6;

const boardBuilder = () => {
	let ltrCount = 0;
	let tempRows = [];
	for (let i = 0; i < maxGuesses; i++) {
		// const row = [];
		const row = {
			status: '',
			hintsUsed: 0,
			letters: []
		};
		for (let j = 0; j < randomWord.word.length; j++) {
			row.letters.push({
				id: ltrCount,
				content: ''
			});
			ltrCount++;
		}

		tempRows.push(row);
	}
	return tempRows;
};

const saveVersion = 2;

let savedGame = browser
	? JSON.parse(window.localStorage.getItem('savedWordlolGameboard'))
	: undefined;
// ensure saved game is for same day as today
// otherwise disregard it
if (browser && savedGame && savedGame?.saveVersion != saveVersion) {
	window.localStorage.removeItem('savedWordlolGameboard');
	window.localStorage.removeItem('wordlolstats');
}
if (browser && savedGame?.saveDate != today) {
	window.localStorage.removeItem('savedWordlolGameboard');
	savedGame = null;
} else if (browser && savedGame.saveVersion != saveVersion) {
	window.localStorage.removeItem('savedWordlolGameboard');
	savedGame = null;
}

let savedThemes = {
	darkmode: null,
	hardmode: null, 
	contrast: null
};

if (browser) {
	savedThemes = JSON.parse(window.localStorage.getItem('wordlol-theme')) ?? savedThemes;
}

function getDarkModePref() {
	if (browser) {
		if (savedThemes.darkmode === false) {
			return false;
		} else if (savedThemes.darkmode === true) {
			return true;
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return true;
		}
	}
	return false;
}

const themeObj = {
	darkmode: getDarkModePref(),
	hardmode: savedThemes.hardmode, 
	contrast: savedThemes.contrast
}

const themePref = writable(themeObj);

// game data
const currentArray = writable(savedGame ? savedGame.currentArray : 0);
const currentLetter = writable(savedGame ? savedGame.currentLetter : 0);
const gameRows = writable(savedGame ? savedGame.rows : boardBuilder());
const hasWon = writable(savedGame ? savedGame.hasWon : false);
const gameOver = writable(savedGame ? savedGame.gameOver : false);
const numGuesses = writable(savedGame ? savedGame.numGuesses : 0);
const revealedLetters = writable(savedGame ? savedGame.revealedLetters : []);

// letter tracking
const correctLetters = writable(savedGame ? savedGame.correctLetters : []);
const wrongLetters = writable(savedGame ? savedGame.wrongLetters : []);
const inWordLetters = writable(savedGame ? savedGame.inWordLetters : []);

// letter position tracking
const correctLocations = writable(savedGame ? savedGame.correctLocations : []);
const wrongLocations = writable(savedGame ? savedGame.wrongLocations : []);
const inWordLocations = writable(savedGame ? savedGame.inWordLocations : []);

const statsObj = {
	totalGames: 0,
	totalWins: 0,
	lastDatePlayed: 0,
	currentStreak: 0,
	maxDayStreak: 0,
	numGuesses: 0,
	hints: 0,
	guessCounts: {
		1: 0,
		2: 0, 
		3: 0, 
		4: 0, 
		5: 0, 
		6: 0
	}
};

const savedStats = browser ? JSON.parse(window.localStorage.getItem('wordlolstats')) : null;
const stats = savedStats ? savedStats : statsObj;
const showStats = writable(false);
const showInfo = writable(false);
const showHint = writable(false);
const showSettings = writable(false);

const hintsUsed = writable(savedGame ? savedGame.hints : 0);
const revealType = writable(false);
const revealClue = writable(false);

export {
	today,
	todaysWord,
	correctLetters,
	wrongLetters,
	correctLocations,
	wrongLocations,
	inWordLocations,
	inWordLetters,
	wordLength,
	maxGuesses,
	gameRows,
	currentArray,
	currentLetter,
	hasWon,
	gameOver,
	stats,
	showStats,
	showInfo,
	numGuesses,
	showHint,
	words,
	hintsUsed,
	saveVersion,
	showSettings,
	revealType,
	revealClue,
	themePref,
	revealedLetters,
	wordIndex
};

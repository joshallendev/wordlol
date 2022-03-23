import { derived, readable, writable } from 'svelte/store';
import { browser } from '$app/env';

const words = [
	{
		word: 'KAISA',
		type: 'champion',
		clue: ['daughter of the void']
	},
	{
		word: 'INHIB',
		type: 'in-game objective',
		clue: ['each team has three']
	},
	{
		word: 'LILLIA',
		type: 'champion',
		clue: ['the bashful bloom']
	},
	{
		word: 'XAYAH',
		type: 'champion',
		clue: ['the rebel']
	},
	{
		word: 'JARVAN',
		type: 'champion',
		clue: ['the exemplar of demacia']
	},
	{
		word: 'TARIC',
		type: 'champion',
		clue: ['the shield of valoran']
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
		clue: ['the spider queen']
	},
	{
		word: 'SHEEN',
		type: 'game item',
		clue: ['part of trinity force, also a soft luster on a surface']
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
		clue: ['the curious chameleon']
	},
	{
		word: 'BRAND',
		type: 'champion',
		clue: ['the burning vengeance']
	},
	{
		word: 'GWEN',
		type: 'champion',
		clue: ["the hallowed seamstress"]
	},
	{
		word: 'PYKE',
		type: 'champion',
		clue: ['the bloodharbor ripper']
	},
	{
		word: 'XERATH',
		type: 'champion',
		clue: ['the magus ascendant']
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
		clue: ["the river king"]
	},
	{
		word: 'GRAVES',
		type: 'champion',
		clue: ['the outlaw']
	},
	{
		word: 'ESPORT',
		type: 'competitive league term',
		clue: ["competitive league might not be called a 'regular' sport, but an ______"]
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
		clue: ["the curator of the sands"]
	},
	{
		word: 'GANKED',
		type: 'game term',
		clue: ["when your laner invited a friend"]
	},
	{
		word: 'TARGON',
		type: 'lore location',
		clue: ['mightiest peak in Runeterra']
	},
	{
		word: 'GLASC',
		type: 'champion',
		clue: ['chem baroness, probably mad this word is only her last name']
	},
	{
		word: 'WUKONG',
		type: 'champion',
		clue: ["the monkey king"]
	},
	{
		word: 'TALON',
		type: 'champion',
		clue: ["the blade's shadow"]
	},
	{
		word: 'VEIGAR',
		type: 'champion',
		clue: ['the tiny master of evil']
	},
	{
		word: 'ZERI',
		type: 'champion',
		clue: ['the spark of zaun']
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
		clue: ['the virtuoso']
	},
	{
		word: 'WARD',
		type: 'game item',
		clue: ['helps with vision']
	},
	{
		word: 'MUNDO',
		type: 'champion',
		clue: ['the madman of zaun']
	},
	{
		word: 'BRAUM',
		type: 'champion',
		clue: ['the heart of the freljord']
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
		clue: ['the fabled home of the yordles']
	},
	{
		word: 'KAYLE',
		type: 'champion',
		clue: ['the righteous']
	},
	{
		word: 'LUCIAN',
		type: 'champion',
		clue: ['sentinel of light']
	},
	{
		word: 'RAKAN',
		type: 'champion',
		clue: ['the charmer']
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
		clue: ['the armordillo']
	},
	{
		word: 'FIZZ',
		type: 'champion',
		clue: ['the tidal trickster']
	},
	{
		word: 'SONA',
		type: 'champion',
		clue: ['maven of the strings']
	},
	{
		word: 'RANKED',
		type: 'game term',
		clue: ['not playing just for fun']
	},
	{
		word: 'UDYR',
		type: 'champion',
		clue: ['the spirit walker']
	},
	{
		word: 'GRAGAS',
		type: 'champion',
		clue: ['the rabble rouser']
	},
	{
		word: 'MID',
		type: 'game term',
		clue: ["they usually think they're the main character"]
	},
	{
		word: 'YASUO',
		type: 'champion',
		clue: ['the unforgiven']
	},
	{
		word: 'TURRET',
		type: 'game term',
		clue: ['each team has 11']
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
		clue: ['the pridestalker']
	},
	{
		word: 'SERAPH',
		type: 'game item',
		clue: ["______'s embrace"]
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
		clue: ['the loose canon']
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
		clue: ['chem baroness, probably mad this word is just her first name']
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
		clue: ["the most powerful neutral monster on Summoner's Rift"]
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
		clue: ['the glorious executioner']
	},
	{
		word: 'ARDENT',
		type: 'game item',
		clue: ['enthusiastic or passionate']
	},
	{
		word: 'KENNEN',
		type: 'champion',
		clue: ['the heart of the tempest']
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
		clue: ['the battle mistress']
	},
	{
		word: 'JAX',
		type: 'champion',
		clue: ['grandmaster at arms']
	},
	{
		word: 'RYZE',
		type: 'champion',
		clue: ['the rune mage']
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
		clue: ['the aspect of twilight']
	},
	{
		word: 'TAHM',
		type: 'champion',
		clue: ['the river king']
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
		clue: ['the missing link']
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
		clue: ['golden']
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
		clue: ['health regeneration']
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
		clue: ['the might of demacia']
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
	},
	{
		word: 'NASHOR',
		type: 'in-game objective',
		clue: ["the most powerful neutral monster on Summoner's Rift"]
	},
];

const today = new Date().toDateString();

function pickWord() {
	let dateDiff = Date.parse(today) - Date.parse('Tue Mar 01 2022');
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
			hints: 0,
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
};

const themePref = writable(themeObj);

const game = writable(
	savedGame
		? savedGame
		: {
				currentArray: 0,
				currentLetter: 0,
				rows: boardBuilder(),
				hasWon: false,
				gameOver: false,
				numGuesses: 0,
				revealedLetters: [],
				correctLetters: [],
				wrongLetters: [],
				inWordLetters: [],
				correctLocations: [],
				wrongLocations: [],
				inWordLocations: [],
				hints: 0
		  }
);

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
const revealType = writable(false);
const revealClue = writable(false);

export {
	today,
	todaysWord,
	game,
	wordLength,
	maxGuesses,
	stats,
	showStats,
	showInfo,
	showHint,
	words,
	saveVersion,
	showSettings,
	revealType,
	revealClue,
	themePref,
	wordIndex
};

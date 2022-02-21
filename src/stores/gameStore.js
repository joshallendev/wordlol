import { derived, readable, writable } from 'svelte/store';
import { browser } from '$app/env';

const words = [
	'KOGMAW',
	'JARVAN',
	'RENATA',
	'AKSHAN',
	'SAMIRA',
	'LILLIA',
	'QIYANA',
	'KAISA',
	'ILLAOI',
	'REKSAI',
	'VELKOZ',
	'LUCIAN',
	'AATROX',
	'THRESH',
	'SYNDRA',
	'RENGAR',
	'DRAVEN',
	'DARIUS',
	'VIKTOR',
	'GRAVES',
	'XERATH',
	'WUKONG',
	'YORICK',
	'RUMBLE',
	'MAOKAI',
	'IRELIA',
	'KENNEN',
	'EZREAL',
	'GRAGAS',
	'VEIGAR',
	'ANIVIA',
	'RAMMUS',
	'TWITCH',
	'SINGED',
	'ZILEAN',
	'SORAKA',
	'ESPORT',
	'YORDLE',
	'ATTACK',
	'DRAGON',
	'JUNGLE',
	'RANKED',
	'HERALD',
	'MINION',
	'TURRET',
	'IGNITE',
	'TIAMAT',
	'ARDENT',
	'RUNAAN',
	'ZHONYA',
	'SERAPH',
	'WARMOG',
	'SOLARI',
	'ARCANE',
	'LETHAL',
	'LEGEND',
	'POTION',
	'BANDLE',
	'DARKIN',
	'TARGON',
	'MUNDO',
	'GLASC',
	'VIEGO',
	'SENNA',
	'YUUMI',
	'SYLAS',
	'NEEKO',
	'RAKAN',
	'XAYAH',
	'IVERN',
	'KENCH',
	'BRAUM',
	'YASUO',
	'QUINN',
	'ELISE',
	'DIANA',
	'JAYCE',
	'VARUS',
	'FIORA',
	'ZIGGS',
	'RIVEN',
	'TALON',
	'LEONA',
	'VAYNE',
	'BRAND',
	'KARMA',
	'SWAIN',
	'URGOT',
	'GALIO',
	'AKALI',
	'GAREN',
	'POPPY',
	'SHACO',
	'NASUS',
	'CORKI',
	'JANNA',
	'TARIC',
	'AMUMU',
	'ANNIE',
	'KAYLE',
	'SIVIR',
	'TEEMO',
	'BARON',
	'PENTA',
	'CHAMP',
	'FLASH',
	'INHIB',
	'SMITE',
	'GHOST',
	'DORAN',
	'SWORD',
	'SHEEN',
	'COMET',
	'MEJAI',
	'RYLAI',
	'LUDEN',
	'GRASP',
	'SPELL',
	'TEMPO',
	'FLEET',
	'MAGIC',
	'RIVER',
	'BOOTS',
	'NOXUS',
	'ZAUN ',
	'IXTAL',
	'IONIA',
	'KHAZIX',
	'ZERI',
	'GWEN',
	'RELL',
	'YONE',
	'SETT',
	'PYKE',
	'ORNN',
	'KAYN',
	'KLED',
	'JHIN',
	'TAHM',
	'EKKO',
	'BARD',
	'AZIR',
	'GNAR',
	'JINX',
	'NAMI',
	'ZYRA',
	'LULU',
	'AHRI',
	'FIZZ',
	'SONA',
	'OLAF',
	'SHEN',
	'UDYR',
	'ASHE',
	'NUNU',
	'RYZE',
	'SION',
	'LANE',
	'RIFT',
	'BASE',
	'ULTI',
	'HEAL',
	'WARD',
	'AERY',
	'VOID',
	'VEX',
	'ZOE',
	'ZAC',
	'ZED',
	'LUX',
	'JAX',
	'KDA',
	'ADC',
	'DUO',
	'BAN',
	'MID',
	'TOP',
	'VI'
];
const today = new Date().getDay();
const randomWord = words[Math.floor(Math.random() * words.length)];
const todaysWord = readable(randomWord);

const wordLength = derived(todaysWord, ($todaysWord) => $todaysWord.length);

const maxGuesses = derived(todaysWord, ($todaysWord) => $todaysWord.length);

const boardBuilder = () => {
	let tempRows = [];
	for (let i = 0; i < randomWord.length; i++) {
		const row = [];
		for (let j = 0; j < randomWord.length; j++) {
			row.push('');
		}
		tempRows.push(row);
	}
	return tempRows;
};


const rows = boardBuilder();
const savedGame = browser ? JSON.parse(window.localStorage.getItem('savedWordlolGameboard')) : null;

// game data
const currentArray = savedGame ? writable(savedGame.currentArray) : writable(0);
const currentLetter = savedGame ? writable(savedGame.currentLetter) : writable(0);
const gameRows = savedGame ? writable(savedGame.rows) : writable(rows);

// letter tracking
const correctLetters = savedGame? writable(savedGame.correctLetters) : writable([]);
const wrongLetters = savedGame? writable(savedGame.wrongLetters) : writable([]);
const inWordLetters = savedGame? writable(savedGame.inWordLetters) : writable([]);

// letter position tracking
const correctLocations = savedGame ? writable(savedGame.correctLocations) : writable([]);
const wrongLocations = savedGame ? writable(savedGame.wrongLocations) : writable([]);
const inWordLocations = savedGame ? writable(savedGame.inWordLocations) : writable([]);

const statsObj = {
	totalWins: 0, 
	totalLosses: 0, 
}

const savedStats = browser ? window.localStorage.getItem('wordlolstats') : null;

const stats = savedStats ? writable(savedStats) : statsObj;

export {
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
};

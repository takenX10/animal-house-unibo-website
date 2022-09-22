import fetch from "node-fetch";
import { FormData } from "formdata-node"; // You can use `File` from fetch-blob >= 3.x
import { fileFromSync } from "fetch-blob/from.js";
import { FormDataEncoder } from "form-data-encoder";
import { Readable } from "stream";

const AUTH_KEY = "d0cfe49a9eccd6e8956a6430c581ec8c6eaf48e3";
const API_BASE = "https://scanner-ai-api.siwalusoftware.de/";

const TYPES = ["cat", "nothing", "humang_being", "dog", "nothing"];
const BREEDS = [
  "birman",
  "burmese_cat",
  "abyssinian_cat",
  "tuxedo",
  "burmilla",
  "himalayan_cat",
  "balinese_cat",
  "siamese_cat",
  "snowshoe_cat",
  "tabby_cat",
  "egyptian_mau",
  "chartreux",
  "european_shorthair",
  "seychellois_longhair",
  "exotic_shorthair",
  "domestic_short-haired_cat",
  "maine_coon",
  "ragdoll",
  "korat",
  "british_shorthair",
  "domestic_long-haired_cat",
  "bengal_cat",
  "siberian_cat",
  "russian_blue",
  "somali_cat",
  "tortoiseshell_cat",
  "kurilian_bobtail_longhair",
  "calico_cat",
  "turkish_van",
  "javanese_cat_longhair",
  "sphynx_cat",
  "tiger",
  "snow_leopard",
  "cheetah",
  "turkish_angora",
  "oriental_shorthair",
  "persian_cat",
  "norwegian_forest_cat",
  "cornish_rex",
  "cougar",
  "devon_rex",
  "manx_cat",
  "nebelung",
  "lion",
  "jaguar",
  "american_curl_longhair",
  "ocicat",
  "neva_masquarade",
  "cymric_cat",
  "leopard",
  "american_curl_shorthair",
  "donskoy_cat",
  "black_panther",
  "japanese_bobtail_shorthair",
  "german_rex",
  "sokoke",
  "seychellois_shorthair",
  "japanese_bobtail_longhair",
  "kurilian_bobtail_shorthair",
];
const IMG_BREEDS = [
  "birman.jpg",
  "burmese_cat.jpeg",
  "abyssinian_cat.jpg",
  "tuxedo.jpg",
  "burmilla.jpeg",
  "himalayan.webp",
  "balinese.png",
  "siamese.jpg",
  "snowshoe.jpeg",
  "tabby.jpg",
  "egyptian.jpg",
  "chartreux.jpg",
  "european_shorthair.jpeg",
  "seychellois_longhair.jpg",
  "exotic_shorthair.jpg",
  "domestic_shorthaired.jpg",
  "maine_coon.jpg",
  "ragdoll.jpeg",
  "korat.jpeg",
  "british_shorthair.jpg",
  "domestic_longhaired.jpg",
  "bengal.jpg",
  "siberian.jpg",
  "russian_blue.jpg",
  "somali.jpeg",
  "tortoiseshell.jpeg",
  "kurilian_bobtail_longhair.jpg",
  "calico.jpg",
  "turkish.jpg",
  "javanese_longhair.jpeg",
  "sphynx.jpeg",
  "tiger.jpg",
  "snow_leopard.jpg",
  "cheetah.jpg",
  "turkish_angora.jpg",
  "oriental_shorthair.jpeg",
  "persian.jpg",
  "norwegian_forest.jpg",
  "cornish_rex.jpeg",
  "cougar.jpg",
  "devon_rex.jpg",
  "manx.jpg",
  "nebelung.jpg",
  "lion.jpg",
  "jaguar.jpg",
  "american_curl_longhair.jpg",
  "ocicat.jpg",
  "neva_masquarade.jpeg",
  "cymric.jpg",
  "leopard.jpg",
  "american_curl_shorthair.jpg",
  "donskoy.jpg",
  "black_panther.jpg",
  "japanese_bobtail_shorthair.jpg",
  "german_rex.jpg",
  "sokoke.jpg",
  "seychellois_shorthair.jpeg",
  "japanese_bobtail_longhair.jpeg",
  "kurilian_bobtail_shorthair.jpg",
];

function getHeaders() {
  return {
    "App-Id": "com.siwalusoftware.catscanner",
    "Device-Os": "android",
    "Device-Abi": "x86",
    "Version-Code": "8521",
    "Version-Code-Short": "8521",
    "Version-Name": "12.8.15-G",
    "User-Agent": "Siwalu Software Scanner App on Android",
    "Accept-Encoding": "gzip, deflate",
  };
}

async function getSessionToken() {
  try {
    let url = `${API_BASE}start_session?auth_key=${AUTH_KEY}`;
    let headers = getHeaders();
    let res = await fetch(url, {
      headers: headers,
      method: "GET",
    });
    let data = await res.json();
    return data.result;
  } catch (e) {
    throw e;
  }
}

async function getCatBreedAI(path) {
  try {
    let session_token = await getSessionToken();
    let base_path = "/assets/cats/"
    let url = `${API_BASE}predict`;
    let headers = getHeaders();
    const form = new FormData();
    const file = fileFromSync(path);
    form.append("auth_key", AUTH_KEY);
    form.append("img", file, "image.jpg");
    form.append("top_k", 0);
    const encoder = new FormDataEncoder(form);
    headers["Session-Token"] = session_token;
    headers["Content-Type"] = encoder.headers["Content-Type"];
    headers["Content-Length"] = encoder.headers["Content-Length"];
    let res = await fetch(url, {
      method: "POST",
      body: Readable.from(encoder.encode()),
      headers: headers,
    });
    let data = await res.json();
    let breeds = data.result?.closed_world?.recognitions;
    let types = data.result?.open_world?.recognitions;

    let type = findTypeByKey(types[0]?.breed_key, session_token);

    let results = [];
    for (let i = 0; i < breeds.length && i < 5; i++) {
      let name = findBreedByKey(breeds[i].breed_key, session_token).replaceAll(
        "_",
        " "
      );
      let perc = Math.round(breeds[i].confidence, 2) * 100;
      // console.log(`${b} -> ${breeds[i].confidence}`);
      let img_name = base_path + findBreedImgByKey(breeds[i].breed_key, session_token);
      results.push({ name, perc, img_name });
    }
    console.log(results)
    // console.log({ type, results });
    return { type, results };
  } catch (e) {
    throw e;
  }
}

var a_table =
  "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
var b_table = a_table.split(" ").map(function(s) {
  return parseInt(s, 16);
});
function b_crc32(str) {
  var crc = -1;
  for (var i = 0, iTop = str.length; i < iTop; i++) {
    crc = (crc >>> 8) ^ b_table[(crc ^ str.charCodeAt(i)) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function encodeBreed(session_token, str) {
  let all = str + "85h4532kfd28Afrej6r23asd" + session_token;
  let enc = b_crc32(all).toString(16);
  return "0x" + enc;
}

function findTypeByKey(key, session_token) {
  for (let i = 0; i < TYPES.length; i++) {
    let enc = encodeBreed(session_token, TYPES[i]);
    if (enc == key) return TYPES[i];
  }
  throw "NOT FOUND";
}
function findBreedByKey(key, session_token) {
  for (let i = 0; i < BREEDS.length; i++) {
    let enc = encodeBreed(session_token, BREEDS[i]);
    if (enc == key) return BREEDS[i];
  }
  throw "NOT FOUND";
}
function findBreedImgByKey(key, session_token) {
  for (let i = 0; i < BREEDS.length; i++) {
    let enc = encodeBreed(session_token, BREEDS[i]);
    if (enc == key) return IMG_BREEDS[i];
  }
  throw "NOT FOUND";
}

// getCatBreedAPI("cane2.jpeg");

export default { getCatBreedAI };

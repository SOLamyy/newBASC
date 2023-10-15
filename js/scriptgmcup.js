document.addEventListener('DOMContentLoaded', function() {
  // Get references to the elements
  const fetchButton = document.getElementById('fetchButton');
  const mergeButton = document.getElementById('mergeButton');

  // Add click event listener to the fetch button
  fetchButton.addEventListener('click', fetchNFT);

  // Add click event listener to the merge button
  mergeButton.addEventListener('click', mergeAndDownload);

  // Add change event listener to the Layer dropdown
  const layerDropdown = document.getElementById('layer-dropdown');
  layerDropdown.addEventListener('change', function() {
    const selectedLayerUrl = layerDropdown.value;
    selectLayer(selectedLayerUrl);
  });
});

const selectedLayerImages = [];
const layerImageUrls = [
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_GOLD.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Gold.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_NOISE.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Noise.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_CHEETAH.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Cheetah.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_ROBO.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Robo.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_TRIPPY.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Trippy.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_DMT.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/DMT.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_DEATH_BOT.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Deathbot.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_ZOMBIE.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Zombie.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_WHITE.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/White.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_BROWN.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Brown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_RED.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Red.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_BLACK.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Black.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_PINK.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Pink.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_CREAM.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Cream.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_BLUE.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Blue.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_GREY.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Grey.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_DARK_BROWN.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Darkbrown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_GOLDEN_BROWN.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Goldenbrown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/gmcup/GM_TAN.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/shots/Tan.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Gold.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Noise.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Cheetah.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Robo.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Trippy.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/DMT.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Deathbot.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Zombie.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/White.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Brown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Red.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Black.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Pink.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Cream.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Blue.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Grey.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Darkbrown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Goldenbrown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/bottle/Tan.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Gold.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Noise.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Cheetah.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Robo.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Trippy.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/DMT.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Deathbot.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Zombie.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/White.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Brown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Red.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Black.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Pink.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Cream.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Blue.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Grey.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Darkbrown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Goldenbrown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/beer/Tan.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/pizza/pizza.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Gold.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Noise.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Cheetah.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Robo.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Trippy.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/DMT.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Deathbot.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Zombie.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/White.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Brown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Red.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Black.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Pink.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Cream.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Blue.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Grey.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Darkbrown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Goldenbrown.png',
  'https://raw.githubusercontent.com/SOLamyy/BoredApeGallery/main/ledger/Tan.png',

  // Add more layer image URLs here
];

function fetchNFT() {
  const nftIdInput = document.getElementById('nftIdInput');
  const nftId = nftIdInput.value.trim();

  if (nftId === '') {
    alert('Please enter an NFT ID');
    return;
  }

  const nftImageUrl = `https://raw.githubusercontent.com/akh1lsol/Bascdao.net/main/New%20Collection/${nftId}.png`;

  const img = new Image();
  img.onload = function() {
    displayImage(nftImageUrl);
    addButton(layerImageUrls);
  };
  img.onerror = function() {
    displayNotFoundModal();
  };
  img.src = nftImageUrl;
}

function displayNotFoundModal() {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  const closeModal = document.getElementById('closeModal');

  modalMessage.textContent = 'ID NOT FOUND';
  modal.style.display = 'block';

  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });
}

function displayImage(imageUrl) {
  const nftContainer = document.getElementById('nftContainer');
  nftContainer.innerHTML = `<img src="${imageUrl}" alt="NFT Image">`;
}

const customLayerNames = [
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'GM Cup',
  'Shot',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Bottle',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Beer',
  'Pizza',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger',
  'Ledger'
  // Add more custom layer names here
];

function addButton(layerImageUrls) {
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown-container');
  const layerDropdown = document.createElement('select');
  layerDropdown.id = 'layer-dropdown';

  // Add the default option "CHOOSE YOUR LAYER"
  const defaultLayerOption = document.createElement('option');
  defaultLayerOption.value = '';
  defaultLayerOption.textContent = 'CHOOSE YOUR LAYER';
  layerDropdown.appendChild(defaultLayerOption);

  // Check if the NFT ID is 1, 3004, 5437, 722, or ....
  const nftIdInput = document.getElementById('nftIdInput');
  const nftId = nftIdInput.value.trim();
  
  if (nftId === '1' || nftId === '3004' || nftId === '5437'|| nftId === '5232'|| nftId === '449'|| nftId === '218'|| nftId === '2620'|| nftId === '2666'|| nftId === '4468'
    || nftId === '907'|| nftId === '5227'|| nftId === '1439'|| nftId === '3333'|| nftId === '902'|| nftId === '1088'|| nftId === '1254'|| nftId === '1907'|| nftId === '3482'|| nftId === '3689'|| nftId === '4119'|| nftId === '1396'|| nftId === '4926'|| nftId === '1526'|| nftId === '1107'|| nftId === '2561'
    || nftId === '2388'|| nftId === '2167'|| nftId === '3324'|| nftId === '2628'|| nftId === '4347'|| nftId === '3765'|| nftId === '2743'|| nftId === '4737'|| nftId === '5260'|| nftId === '1515'|| nftId === '5735'|| nftId === '2889'
    || nftId === '3544'|| nftId === '5027'|| nftId === '1601'|| nftId === '17'|| nftId === '1715'|| nftId === '3876'|| nftId === '5625'|| nftId === '5442'|| nftId === '5680'|| nftId === '774'|| nftId === '5014'|| nftId === '1657'|| nftId === '3093'|| nftId === '3999'|| nftId === '1204'
    || nftId === '5172'|| nftId === '979'|| nftId === '3348'|| nftId === '1119'|| nftId === '5220'|| nftId === '1712'|| nftId === '5312'|| nftId === '2343'|| nftId === '1439'|| nftId === '6001') {
      // Add Gold and Shot layer options
    const goldOption = document.createElement('option');
    goldOption.value = layerImageUrls[0]; // Assuming Gold layer URL is the first in the array
    goldOption.textContent = customLayerNames[0]; // Assuming Gold layer name is the first in the array
    layerDropdown.appendChild(goldOption);

    const shotOption = document.createElement('option');
    shotOption.value = layerImageUrls[1]; // Assuming Shot layer URL is the second in the array
    shotOption.textContent = customLayerNames[1]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(shotOption);

    const bottleOption = document.createElement('option');
    bottleOption.value = layerImageUrls[38]; // Assuming Shot layer URL is the second in the array
    bottleOption.textContent = customLayerNames[38]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(bottleOption);

    const beerOption = document.createElement('option');
    beerOption.value = layerImageUrls[57]; // Assuming Shot layer URL is the second in the array
    beerOption.textContent = customLayerNames[57]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(beerOption);

    const pizzaOption = document.createElement('option');
    pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
    pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(pizzaOption);

    const ledgerOption = document.createElement('option');
    ledgerOption.value = layerImageUrls[77]; // Assuming Shot layer URL is the second in the array
    ledgerOption.textContent = customLayerNames[77]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(ledgerOption);
  }

  if (nftId === '722' || nftId === '3986'|| nftId === '4417'|| nftId === '3171'|| nftId === '3130'|| nftId === '2524'|| nftId === '5611'|| nftId === '5154'|| nftId === '548'|| nftId === '1387'|| nftId === '3977'|| nftId === '4739'|| nftId === '5406'|| nftId === '2334'|| nftId === '4098'|| nftId === '5602'|| nftId === '216'
  || nftId === '2893'|| nftId === '2236'|| nftId === '1060'|| nftId === '264'|| nftId === '3304'|| nftId === '270'|| nftId === '257'|| nftId === '2262'|| nftId === '4578'|| nftId === '3329'|| nftId === '4466'|| nftId === '3727'|| nftId === '1540'
  || nftId === '344'|| nftId === '5249'|| nftId === '3985'|| nftId === '4950'|| nftId === '174'|| nftId === '5096'|| nftId === '5519'|| nftId === '5928'|| nftId === '1075'
  || nftId === '5947'|| nftId === '1493'|| nftId === '4522'|| nftId === '4361'|| nftId === '988'|| nftId === '1048'|| nftId === '535'|| nftId === '4732'|| nftId === '1157'
  || nftId === '2400'|| nftId === '4586'|| nftId === '2215'|| nftId === '3197'|| nftId === '5109'|| nftId === '4359'|| nftId === '4649'|| nftId === '5144'|| nftId === '2191'
  || nftId === '3419'|| nftId === '287'|| nftId === '802'|| nftId === '3611'|| nftId === '4548'|| nftId === '2190'|| nftId === '1797'|| nftId === '3160'|| nftId === '997'
  || nftId === '4844'|| nftId === '3322'|| nftId === '4985'|| nftId === '3928'|| nftId === '5990'|| nftId === '1567'|| nftId === '2247'|| nftId === '1521'|| nftId === '2494'
  || nftId === '2014'|| nftId === '192'|| nftId === '675'|| nftId === '4060'|| nftId === '1746'|| nftId === '4823'|| nftId === '1131'|| nftId === '1963'
  || nftId === '5636'|| nftId === '1773'|| nftId === '3710'|| nftId === '2922'|| nftId === '392'|| nftId === '1705'|| nftId === '3031'|| nftId === '4490'
  || nftId === '3326'|| nftId === '3008'|| nftId === '4471'|| nftId === '2872'|| nftId === '4150'|| nftId === '1375'|| nftId === '2946'|| nftId === '5257'|| nftId === '1928'
  || nftId === '1221'|| nftId === '3722'|| nftId === '2131'|| nftId === '4934'|| nftId === '3088'|| nftId === '5489'|| nftId === '1038'|| nftId === '2135'
  || nftId === '5048'|| nftId === '4476'|| nftId === '3660'|| nftId === '1376'|| nftId === '4485'|| nftId === '1707'|| nftId === '1421'|| nftId === '379'|| nftId === '4693'
  || nftId === '939'|| nftId === '4389'|| nftId === '386'|| nftId === '5734'|| nftId === '4740'|| nftId === '2993'|| nftId === '919'|| nftId === '792'
  || nftId === '3062'|| nftId === '1917'|| nftId === '4450'|| nftId === '5606'|| nftId === '862'|| nftId === '5795'|| nftId === '3986'|| nftId === '3986') {
    // Add Noise layer options
    const noiseGmCupOption = document.createElement('option');
    noiseGmCupOption.value = layerImageUrls[2]; // Assuming Noise GM Cup layer URL is the third in the array
    noiseGmCupOption.textContent = customLayerNames[2]; // Assuming Noise GM Cup layer name is the third in the array
    layerDropdown.appendChild(noiseGmCupOption);

    const noiseShotOption = document.createElement('option');
    noiseShotOption.value = layerImageUrls[3]; // Assuming Noise Shot layer URL is the fourth in the array
    noiseShotOption.textContent = customLayerNames[3]; // Assuming Noise Shot layer name is the fourth in the array
    layerDropdown.appendChild(noiseShotOption);

    const noiseBottleOption = document.createElement('option');
    noiseBottleOption.value = layerImageUrls[39]; // Assuming Shot layer URL is the second in the array
    noiseBottleOption.textContent = customLayerNames[39]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(noiseBottleOption);

    const noiseBeerOption = document.createElement('option');
    noiseBeerOption.value = layerImageUrls[58]; // Assuming Shot layer URL is the second in the array
    noiseBeerOption.textContent = customLayerNames[58]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(noiseBeerOption);

    const pizzaOption = document.createElement('option');
    pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
    pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(pizzaOption);

    const ledgerOption = document.createElement('option');
    ledgerOption.value = layerImageUrls[78]; // Assuming Shot layer URL is the second in the array
    ledgerOption.textContent = customLayerNames[78]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(ledgerOption);
  }
  if (nftId === '111'|| nftId === '3588'|| nftId === '531'|| nftId === '2649'|| nftId === '9'|| nftId === '302'|| nftId === '5775'|| nftId === '5283'
  || nftId === '1638'|| nftId === '1813'|| nftId === '2735'|| nftId === '2126'|| nftId === '428'|| nftId === '5686'|| nftId === '2170'|| nftId === '5853'
  || nftId === '5391'|| nftId === '1870'|| nftId === '3750'|| nftId === '3646'|| nftId === '2122'|| nftId === '4852'|| nftId === '276'
  || nftId === '3851'|| nftId === '2746'|| nftId === '1834'|| nftId === '144'|| nftId === '2390'|| nftId === '3227'|| nftId === '1367'
  || nftId === '839'|| nftId === '4153'|| nftId === '1033'|| nftId === '2449'|| nftId === '2166'|| nftId === '4176'|| nftId === '3495'
  || nftId === '3127'|| nftId === '3982'|| nftId === '3579'|| nftId === '274'|| nftId === '112'|| nftId === '931'|| nftId === '5918'
  || nftId === '231'|| nftId === '5439'|| nftId === '3879'|| nftId === '3530'|| nftId === '2012'|| nftId === '1757'|| nftId === '936'
  || nftId === '1232'|| nftId === '2659'|| nftId === '3065'|| nftId === '891'|| nftId === '2276'|| nftId === '2681'|| nftId === '786'
  || nftId === '2192'|| nftId === '1501'|| nftId === '744'|| nftId === '2232'|| nftId === '4839'|| nftId === '3195'|| nftId === '3434'
  || nftId === '50'|| nftId === '2477'|| nftId === '4697'|| nftId === '168'|| nftId === '4234'|| nftId === '1363'|| nftId === '5155'
  || nftId === '2653'|| nftId === '5035'|| nftId === '977'|| nftId === '825'|| nftId === '3003'|| nftId === '427'|| nftId === '5389'
  || nftId === '4245'|| nftId === '1852'|| nftId === '4026'|| nftId === '664'|| nftId === '5959'|| nftId === '1097'|| nftId === '3853'
  || nftId === '5304'|| nftId === '4965'|| nftId === '2852'|| nftId === '4993'|| nftId === '5311'|| nftId === '2437'|| nftId === '5218'
  || nftId === '3025'|| nftId === '5566'|| nftId === '1353'|| nftId === '5565'|| nftId === '4837'|| nftId === '2638'|| nftId === '2651'
  || nftId === '66'|| nftId === '2503'|| nftId === '3719'|| nftId === '1943'|| nftId === '3912'|| nftId === '4392'|| nftId === '5150'
  || nftId === '2281'|| nftId === '75'|| nftId === '1087'|| nftId === '143'|| nftId === '4796'|| nftId === '5231'|| nftId === '3520'
  || nftId === '4975'|| nftId === '2306'|| nftId === '3809'|| nftId === '879'|| nftId === '5464'|| nftId === '1753'|| nftId === '1627'
  || nftId === '5702'|| nftId === '3577'|| nftId === '4804'|| nftId === '1423'|| nftId === '1676'|| nftId === '4483'|| nftId === '145'
  || nftId === '604'|| nftId === '6000'|| nftId === '1459'|| nftId === '5978'|| nftId === '2393'|| nftId === '1726'|| nftId === '985'|| nftId === '2734'
  || nftId === '2255'|| nftId === '4173'|| nftId === '32'|| nftId === '779'|| nftId === '2753'|| nftId === '1716'|| nftId === '4949'
  || nftId === '746'|| nftId === '2897'|| nftId === '1332'|| nftId === '1457'|| nftId === '1971'|| nftId === '2657'|| nftId === '1269'
  || nftId === '3358'|| nftId === '4094'|| nftId === '5072'|| nftId === '2119'|| nftId === '3145'|| nftId === '1176'|| nftId === '4566'
  || nftId === '5804'|| nftId === '3641'|| nftId === '748'|| nftId === '3338'|| nftId === '2217'|| nftId === '421'|| nftId === '4734'
  || nftId === '2044'|| nftId === '607'|| nftId === '354'|| nftId === '5713'|| nftId === '42'|| nftId === '2003'|| nftId === '5480'
  || nftId === '2722'|| nftId === '5010'|| nftId === '4787'|| nftId === '5333'|| nftId === '5769'|| nftId === '415'|| nftId === '5531'
  || nftId === '1932'|| nftId === '3238'|| nftId === '2061'|| nftId === '2526'|| nftId === '1911'|| nftId === '962'|| nftId === '609'|| nftId === '2986'
  || nftId === '5819'|| nftId === '148'|| nftId === '4707'|| nftId === '3499'|| nftId === '612'|| nftId === '3091'|| nftId === '4096'
  || nftId === '2909'|| nftId === '5076'|| nftId === '4599'|| nftId === '5903'|| nftId === '1465'|| nftId === '1261'|| nftId === '5696'
  || nftId === '743'|| nftId === '3992'|| nftId === '703'|| nftId === '350'|| nftId === '1045'|| nftId === '5886'|| nftId === '3161'
  || nftId === '5961'|| nftId === '517'|| nftId === '4738'|| nftId === '5567'|| nftId === '506'|| nftId === '1181'|| nftId === '863'
  || nftId === '1014'|| nftId === '2353'|| nftId === '484'|| nftId === '3658'|| nftId === '3178'|| nftId === '2791'|| nftId === '2728'
  || nftId === '2335'|| nftId === '5758'|| nftId === '5679'|| nftId === '1290'|| nftId === '4659'|| nftId === '2289'|| nftId === '1619'
  || nftId === '716'|| nftId === '367'|| nftId === '4295'|| nftId === '3157'|| nftId === '4077'|| nftId === '2646'|| nftId === '1820'
  || nftId === '366'|| nftId === '1414'|| nftId === '890'|| nftId === '5798'|| nftId === '5166'|| nftId === '521'|| nftId === '4902'
  || nftId === '1160'|| nftId === '2994'|| nftId === '492'|| nftId === '5559'|| nftId === '5327'|| nftId === '4306'|| nftId === '1355'
  || nftId === '4265'|| nftId === '3406'|| nftId === '5915'|| nftId === '5603'|| nftId === '537'|| nftId === '2627'|| nftId === '1416'
  || nftId === '425'|| nftId === '5790'|| nftId === '4621'|| nftId === '1340'|| nftId === '868'|| nftId === '4432'|| nftId === '3468'
  || nftId === '2144'|| nftId === '3215'|| nftId === '5745'|| nftId === '5092'|| nftId === '1897'|| nftId === '4146'){
    
    
    const cheetahGmCupOption = document.createElement('option');
    cheetahGmCupOption.value = layerImageUrls[4]; // Assuming Noise GM Cup layer URL is the third in the array
    cheetahGmCupOption.textContent = customLayerNames[4]; // Assuming Noise GM Cup layer name is the third in the array
    layerDropdown.appendChild(cheetahGmCupOption);

    const cheetahShotOption = document.createElement('option');
    cheetahShotOption.value = layerImageUrls[5]; // Assuming Noise Shot layer URL is the fourth in the array
    cheetahShotOption.textContent = customLayerNames[5]; // Assuming Noise Shot layer name is the fourth in the array
    layerDropdown.appendChild(cheetahShotOption);

    const cheetahBottleOption = document.createElement('option');
    cheetahBottleOption.value = layerImageUrls[40]; // Assuming Noise Shot layer URL is the fourth in the array
    cheetahBottleOption.textContent = customLayerNames[40]; // Assuming Noise Shot layer name is the fourth in the array
    layerDropdown.appendChild(cheetahBottleOption);
    
    const cheetahBeerOption = document.createElement('option');
    cheetahBeerOption.value = layerImageUrls[59]; // Assuming Noise Shot layer URL is the fourth in the array
    cheetahBeerOption.textContent = customLayerNames[59]; // Assuming Noise Shot layer name is the fourth in the array
    layerDropdown.appendChild(cheetahBeerOption);

     const pizzaOption = document.createElement('option');
    pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
    pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(pizzaOption);

    const ledgerOption = document.createElement('option');
    ledgerOption.value = layerImageUrls[79]; // Assuming Shot layer URL is the second in the array
    ledgerOption.textContent = customLayerNames[79]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(ledgerOption);
  }
  if (nftId === '5351'|| nftId === '1819'|| nftId === '5661'|| nftId === '2879'|| nftId === '1622'|| nftId === '4789'|| nftId === '3393'
  || nftId === '1338'|| nftId === '3038'|| nftId === '398'|| nftId === '3517'|| nftId === '1822'|| nftId === '86'|| nftId === '5315'
  || nftId === '2739'|| nftId === '3401'|| nftId === '2757'|| nftId === '3503'|| nftId === '3725'|| nftId === '2514'|| nftId === '2157'|| nftId === '5946'
  || nftId === '4892'|| nftId === '195'|| nftId === '1728'|| nftId === '2348'|| nftId === '5672'|| nftId === '4731'|| nftId === '5803'
  || nftId === '2402'|| nftId === '5373'|| nftId === '418'|| nftId === '1154'|| nftId === '177'|| nftId === '1006'|| nftId === '1899'|| nftId === '172'
  || nftId === '4817'|| nftId === '2622'|| nftId === '942'|| nftId === '2870'|| nftId === '1133'|| nftId === '3902'
  || nftId === '5778'|| nftId === '3169'|| nftId === '4718'|| nftId === '3280'|| nftId === '4924'|| nftId === '5613'|| nftId === '2011'
  || nftId === '2578'|| nftId === '3013'|| nftId === '5223'|| nftId === '251'|| nftId === '1313'|| nftId === '2997'
  || nftId === '407'|| nftId === '2113'|| nftId === '5730'|| nftId === '4984'|| nftId === '2451'|| nftId === '2328'|| nftId === '1898'
  || nftId === '5992'|| nftId === '2915'|| nftId === '1688'|| nftId === '1347'|| nftId === '1472'|| nftId === '2269'|| nftId === '5133'
  || nftId === '3653'|| nftId === '3166'|| nftId === '5243'|| nftId === '5921'|| nftId === '5267'|| nftId === '5585'|| nftId === '448'
  || nftId === '1473'|| nftId === '1735'|| nftId === '1687'|| nftId === '5541'|| nftId === '3865'|| nftId === '3885'|| nftId === '4293'
  || nftId === '1039'|| nftId === '3793'|| nftId === '2083'|| nftId === '434'|| nftId === '2345'|| nftId === '1429'|| nftId === '2569'
  || nftId === '1867'|| nftId === '737'|| nftId === '2780'|| nftId === '1256'|| nftId === '4132'|| nftId === '4702'|| nftId === '207'
  || nftId === '2048'|| nftId === '851'|| nftId === '3963'|| nftId === '4708'|| nftId === '5241'|| nftId === '3395'|| nftId === '2875'
  || nftId === '1734'|| nftId === '4699'|| nftId === '3472'|| nftId === '5097'|| nftId === '323'|| nftId === '5298'|| nftId === '5968'
  || nftId === '3341'|| nftId === '5588'|| nftId === '5599'|| nftId === '1950'|| nftId === '2386'|| nftId === '5371'|| nftId === '3268'
  || nftId === '4825'|| nftId === '5617'|| nftId === '214'|| nftId === '5706'|| nftId === '3474'|| nftId === '5632'|| nftId === '1947'
  || nftId === '790'|| nftId === '5310'|| nftId === '4478'|| nftId === '2497'|| nftId === '3440'|| nftId === '2895'|| nftId === '29'
  || nftId === '3111'|| nftId === '4894'|| nftId === '3995'|| nftId === '5043'|| nftId === '1200'|| nftId === '5663'|| nftId === '2531'
  || nftId === '314'|| nftId === '2047'|| nftId === '1541'|| nftId === '775'|| nftId === '1626'|| nftId === '4364'|| nftId === '3882'
  || nftId === '4803'|| nftId === '3828'|| nftId === '519'|| nftId === '3756'|| nftId === '3571'|| nftId === '557'|| nftId === '3492'
  || nftId === '2028'|| nftId === '2424'|| nftId === '715'|| nftId === '4606'|| nftId === '4794'|| nftId === '2495'|| nftId === '447'
  || nftId === '3022'|| nftId === '4626'|| nftId === '1250'|| nftId === '1136'|| nftId === '2469'|| nftId === '159'|| nftId === '4665'
  || nftId === '4336'|| nftId === '3648'|| nftId === '5161'|| nftId === '2633'|| nftId === '758'|| nftId === '2094'|| nftId === '1645'
  || nftId === '5807'|| nftId === '1370'|| nftId === '2380'|| nftId === '5887'|| nftId === '1211'|| nftId === '55'|| nftId === '5457'
  || nftId === '1763') {// Add Robot layer
  // 
  const robotGmCupOption = document.createElement('option');
  robotGmCupOption.value = layerImageUrls[6]; // Assuming Gold layer URL is the first in the array
  robotGmCupOption.textContent = customLayerNames[6]; // Assuming Gold layer name is the first in the array
  layerDropdown.appendChild(robotGmCupOption);

  const robotShotOption = document.createElement('option');
  robotShotOption.value = layerImageUrls[7]; // Assuming Shot layer URL is the second in the array
  robotShotOption.textContent = customLayerNames[7]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(robotShotOption);

  const robotBottleOption = document.createElement('option');
  robotBottleOption.value = layerImageUrls[41]; // Assuming Shot layer URL is the second in the array
  robotBottleOption.textContent = customLayerNames[41]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(robotBottleOption);

  const robotBeerOption = document.createElement('option');
  robotBeerOption.value = layerImageUrls[60]; // Assuming Shot layer URL is the second in the array
  robotBeerOption.textContent = customLayerNames[60]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(robotBeerOption);
  
  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[80]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[80]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);

}
if (nftId === '4909'|| nftId === '5011'|| nftId === '250'|| nftId === '836'|| nftId === '4101'|| nftId === '4576'|| nftId === '77'
|| nftId === '3628'|| nftId === '4878'|| nftId === '2201'|| nftId === '4317'|| nftId === '3306'|| nftId === '340'|| nftId === '2721'
|| nftId === '4212'|| nftId === '4791'|| nftId === '4283'|| nftId === '3997'|| nftId === '4171'|| nftId === '3282'|| nftId === '4425'
|| nftId === '2585'|| nftId === '3382'|| nftId === '1266'|| nftId === '3753'|| nftId === '1517'|| nftId === '1968'|| nftId === '5017'
|| nftId === '2089'|| nftId === '4579'|| nftId === '4024'|| nftId === '3785'|| nftId === '3691'|| nftId === '338'|| nftId === '1958'
|| nftId === '2271'|| nftId === '3460'|| nftId === '818'|| nftId === '2057'|| nftId === '3625'|| nftId === '956'|| nftId === '3705'
|| nftId === '831'|| nftId === '4486'|| nftId === '5229'|| nftId === '3802'|| nftId === '2018'|| nftId === '1729'|| nftId === '3126'
|| nftId === '1826'|| nftId === '1319'|| nftId === '2603'|| nftId === '76'|| nftId === '856'|| nftId === '5571'|| nftId === '5997'
|| nftId === '1390'|| nftId === '4346'|| nftId === '5444'|| nftId === '4800'|| nftId === '4354'|| nftId === '5128'|| nftId === '1507'
|| nftId === '5748'|| nftId === '5036'|| nftId === '3389'|| nftId === '1824'|| nftId === '1382'|| nftId === '4451'|| nftId === '1196') {// Add Trippy layer
  // 
  const trippyGmCupOption = document.createElement('option');
  trippyGmCupOption.value = layerImageUrls[8]; // Assuming Gold layer URL is the first in the array
  trippyGmCupOption.textContent = customLayerNames[8]; // Assuming Gold layer name is the first in the array
  layerDropdown.appendChild(trippyGmCupOption);

  const trippyShotOption = document.createElement('option');
  trippyShotOption.value = layerImageUrls[9]; // Assuming Shot layer URL is the second in the array
  trippyShotOption.textContent = customLayerNames[9]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(trippyShotOption);

  const trippyBottleOption = document.createElement('option');
  trippyBottleOption.value = layerImageUrls[42]; // Assuming Shot layer URL is the second in the array
  trippyBottleOption.textContent = customLayerNames[42]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(trippyBottleOption);

  const trippyBeerOption = document.createElement('option');
  trippyBeerOption.value = layerImageUrls[61]; // Assuming Shot layer URL is the second in the array
  trippyBeerOption.textContent = customLayerNames[61]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(trippyBeerOption);

  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[81]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[81]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);

}
if (nftId === '2471'|| nftId === '1292'|| nftId === '2418'|| nftId === '1127'|| nftId === '4639'|| nftId === '2508'|| nftId === '4936'
|| nftId === '2460'|| nftId === '5750'|| nftId === '445'|| nftId === '4368'|| nftId === '3077'|| nftId === '4128'|| nftId === '140'
|| nftId === '5430'|| nftId === '3461'|| nftId === '4908'|| nftId === '5912'|| nftId === '3050'|| nftId === '4108'|| nftId === '1629'
|| nftId === '4217'|| nftId === '2263'|| nftId === '4769'|| nftId === '1832'|| nftId === '3863'|| nftId === '2180'|| nftId === '835'
|| nftId === '1859'|| nftId === '1124'|| nftId === '3535'|| nftId === '3041'|| nftId === '2461'|| nftId === '1449'|| nftId === '1300'
|| nftId === '1013'|| nftId === '5396'|| nftId === '834'|| nftId === '3987'|| nftId === '3538'|| nftId === '2300'|| nftId === '558'
|| nftId === '1235'|| nftId === '4064'|| nftId === '3211'|| nftId === '1220'|| nftId === '3415'|| nftId === '955'|| nftId === '5452'
|| nftId === '4572'|| nftId === '5703'|| nftId === '3467'|| nftId === '4801'|| nftId === '184'|| nftId === '3125'|| nftId === '4914'
|| nftId === '3199'|| nftId === '2009'|| nftId === '375'|| nftId === '1341'|| nftId === '917'|| nftId === '2588'|| nftId === '5403'
|| nftId === '5723'|| nftId === '3516'|| nftId === '3231'|| nftId === '3007'|| nftId === '5085'|| nftId === '3305'|| nftId === '4773'
|| nftId === '3301'|| nftId === '2087'|| nftId === '3679'|| nftId === '4851'|| nftId === '1777'|| nftId === '73'|| nftId === '5142'
|| nftId === '3594'|| nftId === '2373'|| nftId === '2745'|| nftId === '4507'|| nftId === '5635'|| nftId === '5564'|| nftId === '1983'
|| nftId === '4157'|| nftId === '1320'|| nftId === '4721'|| nftId === '381'|| nftId === '649'|| nftId === '5132'|| nftId === '2029'
|| nftId === '906'|| nftId === '95'|| nftId === '5533'|| nftId === '237'|| nftId === '5902'|| nftId === '1499'|| nftId === '4834'
|| nftId === '409'|| nftId === '4444'|| nftId === '5342'|| nftId === '4869'|| nftId === '4643') {  // Add DMT
  
    const dmtGmCupOption = document.createElement('option');
    dmtGmCupOption.value = layerImageUrls[10]; // Assuming Gold layer URL is the first in the array
    dmtGmCupOption.textContent = customLayerNames[10]; // Assuming Gold layer name is the first in the array
    layerDropdown.appendChild(dmtGmCupOption);

    const dmtShotOption = document.createElement('option');
    dmtShotOption.value = layerImageUrls[11]; // Assuming Shot layer URL is the second in the array
    dmtShotOption.textContent = customLayerNames[11]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(dmtShotOption);

    const dmtBottleOption = document.createElement('option');
    dmtBottleOption.value = layerImageUrls[43]; // Assuming Shot layer URL is the second in the array
    dmtBottleOption.textContent = customLayerNames[43]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(dmtBottleOption);

    const dmtBeerOption = document.createElement('option');
    dmtBeerOption.value = layerImageUrls[62]; // Assuming Shot layer URL is the second in the array
    dmtBeerOption.textContent = customLayerNames[62]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(dmtBeerOption);

    const pizzaOption = document.createElement('option');
    pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
    pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(pizzaOption);

    const ledgerOption = document.createElement('option');
    ledgerOption.value = layerImageUrls[82]; // Assuming Shot layer URL is the second in the array
    ledgerOption.textContent = customLayerNames[82]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(ledgerOption);
  }
  if (nftId === '3590'|| nftId === '2436'|| nftId === '1880'|| nftId === '3168'|| nftId === '2050'|| nftId === '3595'
  || nftId === '4091'|| nftId === '3767'|| nftId === '3907'|| nftId === '4743'|| nftId === '5889'|| nftId === '3512'
  || nftId === '4488'|| nftId === '1864'|| nftId === '3374'|| nftId === '1385'|| nftId === '2606'|| nftId === '573'
  || nftId === '2242'|| nftId === '3947'|| nftId === '3742'|| nftId === '336'|| nftId === '1748'|| nftId === '2720'
  || nftId === '2456'|| nftId === '3379'|| nftId === '1422'|| nftId === '3456'|| nftId === '3609'|| nftId === '3006'
  || nftId === '138'|| nftId === '1187'|| nftId === '3749'|| nftId === '4912'|| nftId === '2375'|| nftId === '1257'
  || nftId === '1237'|| nftId === '5074'|| nftId === '299'|| nftId === '3113'|| nftId === '4802'|| nftId === '4367'
  || nftId === '751'|| nftId === '3927'|| nftId === '1310'|| nftId === '1462'|| nftId === '4120'|| nftId === '2250'
  || nftId === '4342'|| nftId === '5451'|| nftId === '926'|| nftId === '581'|| nftId === '1497'|| nftId === '3762'
  || nftId === '3900'|| nftId === '1036'|| nftId === '2690'|| nftId === '4384'|| nftId === '1853'|| nftId === '4725'
  || nftId === '3733'|| nftId === '5925'|| nftId === '497'|| nftId === '5018'|| nftId === '5483'|| nftId === '3867'
  || nftId === '4730'|| nftId === '2488'|| nftId === '4783'|| nftId === '1703'|| nftId === '1791'|| nftId === '5194'
  || nftId === '1653'|| nftId === '2500'|| nftId === '2642'|| nftId === '5358'|| nftId === '1128'|| nftId === '4694'
  || nftId === '396'|| nftId === '3232'|| nftId === '572'|| nftId === '2186'|| nftId === '4683'|| nftId === '5623'
  || nftId === '5786'|| nftId === '4495'|| nftId === '1442'|| nftId === '3429'|| nftId === '2499'|| nftId === '5764'
  || nftId === '1869'|| nftId === '1750'|| nftId === '4428'|| nftId === '4434'|| nftId === '3277'|| nftId === '3647'
  || nftId === '3696'|| nftId === '3675'|| nftId === '4556'|| nftId === '1316'|| nftId === '3330'|| nftId === '4558'
  || nftId === '1800'|| nftId === '2756'|| nftId === '3729'|| nftId === '2594'|| nftId === '5891'|| nftId === '4038'
  || nftId === '5473'|| nftId === '1071'|| nftId === '4470'|| nftId === '3037'|| nftId === '1096'|| nftId === '1987'
  || nftId === '2399'|| nftId === '2332'|| nftId === '1180'|| nftId === '153'|| nftId === '5357'|| nftId === '4219') {   // Add Death bot
    //\
    const deathGmCupOption = document.createElement('option');
    deathGmCupOption.value = layerImageUrls[12]; // Assuming Gold layer URL is the first in the array
    deathGmCupOption.textContent = customLayerNames[12]; // Assuming Gold layer name is the first in the array
    layerDropdown.appendChild(deathGmCupOption);

    const deathShotOption = document.createElement('option');
    deathShotOption.value = layerImageUrls[13]; // Assuming Shot layer URL is the second in the array
    deathShotOption.textContent = customLayerNames[13]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(deathShotOption);

    const deathBottleOption = document.createElement('option');
    deathBottleOption.value = layerImageUrls[44]; // Assuming Shot layer URL is the second in the array
    deathBottleOption.textContent = customLayerNames[44]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(deathBottleOption);

    const deathBeerOption = document.createElement('option');
    deathBeerOption.value = layerImageUrls[63]; // Assuming Shot layer URL is the second in the array
    deathBeerOption.textContent = customLayerNames[63]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(deathBeerOption);

    const pizzaOption = document.createElement('option');
    pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
    pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(pizzaOption);

    const ledgerOption = document.createElement('option');
    ledgerOption.value = layerImageUrls[83]; // Assuming Shot layer URL is the second in the array
    ledgerOption.textContent = customLayerNames[83]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(ledgerOption);
  }
  if (nftId === '3716'|| nftId === '1544'|| nftId === '817'|| nftId === '5497'|| nftId === '4312'|| nftId === '4222'|| nftId === '5479'
  || nftId === '4588'|| nftId === '1306'|| nftId === '4806'|| nftId === '2453'|| nftId === '1352'|| nftId === '4749'|| nftId === '798'
  || nftId === '5115'|| nftId === '690'|| nftId === '45'|| nftId === '404'|| nftId === '4203'|| nftId === '2849'|| nftId === '3124'
  || nftId === '1210'|| nftId === '1080'|| nftId === '814'|| nftId === '1043'|| nftId === '542'|| nftId === '686'|| nftId === '4745'
  || nftId === '4047'|| nftId === '1776'|| nftId === '3715'|| nftId === '966'|| nftId === '4036'|| nftId === '4473'|| nftId === '1383'
  || nftId === '5757'|| nftId === '853'|| nftId === '3220'|| nftId === '4328'|| nftId === '4423'|| nftId === '5244'|| nftId === '401'
  || nftId === '5556'|| nftId === '61'|| nftId === '2611'|| nftId === '2433'|| nftId === '1539'|| nftId === '3279'|| nftId === '2133'
  || nftId === '2648'|| nftId === '3365'|| nftId === '1973'|| nftId === '3454'|| nftId === '4040'|| nftId === '3469'|| nftId === '261'
  || nftId === '4799'|| nftId === '5303'|| nftId === '4602'|| nftId === '933'|| nftId === '4808'|| nftId === '1926'|| nftId === '4172'
  || nftId === '1663'|| nftId === '134'|| nftId === '5829'|| nftId === '1189'|| nftId === '3884'|| nftId === '2955'|| nftId === '4239'
  || nftId === '4915'|| nftId === '3055'|| nftId === '4979'|| nftId === '3954'|| nftId === '697'|| nftId === '1969'|| nftId === '821'
  || nftId === '2562'|| nftId === '1115'|| nftId === '2381'|| nftId === '3134'|| nftId === '4836'|| nftId === '3654'|| nftId === '3276'
  || nftId === '2385'|| nftId === '3404'|| nftId === '2130'|| nftId === '5643'|| nftId === '4218'|| nftId === '4604'|| nftId === '2796'
  || nftId === '2154'|| nftId === '2904'|| nftId === '2093'|| nftId === '1285'|| nftId === '327'|| nftId === '1906'|| nftId === '242'
  || nftId === '390'|| nftId === '4879'|| nftId === '5407'|| nftId === '482'|| nftId === '5600'|| nftId === '4000'|| nftId === '293'
  || nftId === '5454'|| nftId === '1593'|| nftId === '965'|| nftId === '4524'|| nftId === '5187'|| nftId === '1386'|| nftId === '1975'
  || nftId === '5057'|| nftId === '603'|| nftId === '4422'|| nftId === '4941'|| nftId === '3345'|| nftId === '4138'|| nftId === '1492'
  || nftId === '5555'|| nftId === '3151'|| nftId === '754'|| nftId === '110'|| nftId === '5699'|| nftId === '4247'|| nftId === '3943'
  || nftId === '1774'|| nftId === '5361'|| nftId === '3155'|| nftId === '5190'|| nftId === '3896'|| nftId === '2684'|| nftId === '952'
  || nftId === '1337'|| nftId === '516'|| nftId === '4142'|| nftId === '1205'|| nftId === '5143'|| nftId === '5659'|| nftId === '2509'
  || nftId === '1110'|| nftId === '3342'|| nftId === '443'|| nftId === '1015'|| nftId === '2752'|| nftId === '4818'|| nftId === '2371'
  || nftId === '4156'|| nftId === '2941'|| nftId === '2384'|| nftId === '5328'|| nftId === '4273'|| nftId === '2485'|| nftId === '877'
  || nftId === '1379'|| nftId === '3585'|| nftId === '1658'|| nftId === '602'|| nftId === '446'|| nftId === '5285'|| nftId === '5431'
  || nftId === '1682') { // Add Zombie
  
  const zombieGmCupOption = document.createElement('option');
  zombieGmCupOption.value = layerImageUrls[14]; // Assuming Gold layer URL is the first in the array
  zombieGmCupOption.textContent = customLayerNames[14]; // Assuming Gold layer name is the first in the array
  layerDropdown.appendChild(zombieGmCupOption);

  const zombieShotOption = document.createElement('option');
  zombieShotOption.value = layerImageUrls[15]; // Assuming Shot layer URL is the second in the array
  zombieShotOption.textContent = customLayerNames[15]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(zombieShotOption);

  const zombieBottleOption = document.createElement('option');
  zombieBottleOption.value = layerImageUrls[45]; // Assuming Shot layer URL is the second in the array
  zombieBottleOption.textContent = customLayerNames[45]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(zombieBottleOption);

  const zombieBeerOption = document.createElement('option');
  zombieBeerOption.value = layerImageUrls[64]; // Assuming Shot layer URL is the second in the array
  zombieBeerOption.textContent = customLayerNames[64]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(zombieBeerOption);

  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[84]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[84]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);
}
if (nftId === '1111'|| nftId === '5112'|| nftId === '1354'|| nftId === '2109'|| nftId === '1248'|| nftId === '2892'|| nftId === '348'
|| nftId === '1891'|| nftId === '3283'|| nftId === '4095'|| nftId === '442'|| nftId === '3250'|| nftId === '5843'|| nftId === '1249'
|| nftId === '2253'|| nftId === '569'|| nftId === '1322'|| nftId === '3473'|| nftId === '1323'|| nftId === '1605'|| nftId === '3308'
|| nftId === '1920'|| nftId === '391'|| nftId === '534'|| nftId === '763'|| nftId === '1793'|| nftId === '4180'|| nftId === '669'
|| nftId === '560'|| nftId === '4675'|| nftId === '3064'|| nftId === '5365'|| nftId === '2054'|| nftId === '436'|| nftId === '4664'
|| nftId === '4735'|| nftId === '2554'|| nftId === '1812'|| nftId === '1775'|| nftId === '2882'|| nftId === '1140'|| nftId === '2008'
|| nftId === '4759'|| nftId === '1066'|| nftId === '3103'|| nftId === '1701'|| nftId === '1471'|| nftId === '2949'|| nftId === '3904'
|| nftId === '2987'|| nftId === '954'|| nftId === '4016'|| nftId === '3920'|| nftId === '4873'|| nftId === '5512'|| nftId === '1114'
|| nftId === '3870'|| nftId === '4925'|| nftId === '5475'|| nftId === '301'|| nftId === '1719'|| nftId === '387'|| nftId === '2309'
|| nftId === '5086'|| nftId === '3360'|| nftId === '1298'|| nftId === '1171'|| nftId === '543'|| nftId === '4415'|| nftId === '1474'
|| nftId === '812'|| nftId === '753'|| nftId === '4093'|| nftId === '696'|| nftId === '4598'|| nftId === '5435'|| nftId === '5849'
|| nftId === '5633'|| nftId === '5376'|| nftId === '1361'|| nftId === '617'|| nftId === '1762'|| nftId === '4229'|| nftId === '5759'
|| nftId === '4895'|| nftId === '48'|| nftId === '4152'|| nftId === '5151'|| nftId === '2672'|| nftId === '5817'|| nftId === '2208'
|| nftId === '5678'|| nftId === '1828'|| nftId === '120'|| nftId === '2266'|| nftId === '5774'|| nftId === '5246'|| nftId === '5335'
|| nftId === '4821'|| nftId === '4617'|| nftId === '1089'|| nftId === '3118'|| nftId === '1064'|| nftId === '701'|| nftId === '326'
|| nftId === '3212'|| nftId === '453'|| nftId === '1700'|| nftId === '1401'|| nftId === '1671'|| nftId === '1530'|| nftId === '5551'
|| nftId === '1551'|| nftId === '308'|| nftId === '5174'|| nftId === '2961'|| nftId === '1041'|| nftId === '3731'|| nftId === '1607'
|| nftId === '528'|| nftId === '1265'|| nftId === '2977'|| nftId === '2763'|| nftId === '1175'|| nftId === '4554'|| nftId === '1030'
|| nftId === '306'|| nftId === '1260'|| nftId === '2520'|| nftId === '2270'|| nftId === '5214'|| nftId === '3983'|| nftId === '1504'
|| nftId === '2534'|| nftId === '1252'|| nftId === '5920'|| nftId === '3172'|| nftId === '889'|| nftId === '1415'|| nftId === '893'
|| nftId === '1303'|| nftId === '3408'|| nftId === '5300'|| nftId === '4756'|| nftId === '3174'|| nftId === '5926'|| nftId === '4294'
|| nftId === '756'|| nftId === '1630'|| nftId === '209'|| nftId === '2382'|| nftId === '5440'|| nftId === '1247'|| nftId === '4079'
|| nftId === '1357'|| nftId === '3410'|| nftId === '3191'|| nftId === '1028'|| nftId === '5513'|| nftId === '5872'|| nftId === '1535'
|| nftId === '3632'|| nftId === '3483'|| nftId === '4018'|| nftId === '4592'|| nftId === '4845'|| nftId === '1139'|| nftId === '1810'
|| nftId === '1811'|| nftId === '5682'|| nftId === '244'|| nftId === '2446'|| nftId === '186'|| nftId === '1993'|| nftId === '4504'
|| nftId === '4888'|| nftId === '1563'|| nftId === '674'|| nftId === '3439'|| nftId === '4881'|| nftId === '3601'|| nftId === '5215'
|| nftId === '2617'|| nftId === '3240'|| nftId === '515'|| nftId === '1922'|| nftId === '459'|| nftId === '1307'|| nftId === '700'
|| nftId === '3597'|| nftId === '2832'|| nftId === '1084'|| nftId === '240'|| nftId === '656'|| nftId === '5548'|| nftId === '2458'
|| nftId === '118'|| nftId === '5754'|| nftId === '3651'|| nftId === '3194'|| nftId === '4704'|| nftId === '416'|| nftId === '4288'
|| nftId === '2206'|| nftId === '4505'|| nftId === '5908'|| nftId === '3844'|| nftId === '5605'|| nftId === '3969'|| nftId === '2199'
|| nftId === '5245'|| nftId === '2365'|| nftId === '3776'|| nftId === '2917'|| nftId === '3129'|| nftId === '3497'|| nftId === '4073'
|| nftId === '182'|| nftId === '4529'|| nftId === '1240'|| nftId === '987'|| nftId === '3779'|| nftId === '2965'|| nftId === '1930'
|| nftId === '1733'|| nftId === '101') { // Add White 

  const whiteGmCupOption = document.createElement('option');
whiteGmCupOption.value = layerImageUrls[16]; // Assuming Gold layer URL is the first in the array
whiteGmCupOption.textContent = customLayerNames[16]; // Assuming Gold layer name is the first in the array
layerDropdown.appendChild(whiteGmCupOption);

const whiteShotOption = document.createElement('option');
whiteShotOption.value = layerImageUrls[17]; // Assuming Shot layer URL is the second in the array
whiteShotOption.textContent = customLayerNames[17]; // Assuming Shot layer name is the second in the array
layerDropdown.appendChild(whiteShotOption);

const whiteBottleOption = document.createElement('option');
whiteBottleOption.value = layerImageUrls[46]; // Assuming Shot layer URL is the second in the array
whiteBottleOption.textContent = customLayerNames[46]; // Assuming Shot layer name is the second in the array
layerDropdown.appendChild(whiteBottleOption);

const whiteBeerOption = document.createElement('option');
whiteBeerOption.value = layerImageUrls[65]; // Assuming Shot layer URL is the second in the array
whiteBeerOption.textContent = customLayerNames[65]; // Assuming Shot layer name is the second in the array
layerDropdown.appendChild(whiteBeerOption);

const pizzaOption = document.createElement('option');
pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
layerDropdown.appendChild(pizzaOption);

const ledgerOption = document.createElement('option');
ledgerOption.value = layerImageUrls[85]; // Assuming Shot layer URL is the second in the array
ledgerOption.textContent = customLayerNames[85]; // Assuming Shot layer name is the second in the array
layerDropdown.appendChild(ledgerOption);
}
if ( nftId === '3966'|| nftId === '2172'|| nftId === '4959'|| nftId === '2248'|| nftId === '2284'|| nftId === '4315'|| nftId === '273'
|| nftId === '4441'|| nftId === '1545'|| nftId === '5563'|| nftId === '4125'|| nftId === '3105'|| nftId === '4641'|| nftId === '1025'|| nftId === '811'
|| nftId === '3831'|| nftId === '4349'|| nftId === '1164'|| nftId === '339'|| nftId === '4250'|| nftId === '353'|| nftId === '5688'|| nftId === '601'
|| nftId === '3063'|| nftId === '2404'|| nftId === '670'|| nftId === '355'|| nftId === '3741'|| nftId === '87'|| nftId === '1020'|| nftId === '1767'
|| nftId === '4491'|| nftId === '3255'|| nftId === '1121'|| nftId === '4104'|| nftId === '3098'|| nftId === '2421'|| nftId === '1816'|| nftId === '1523'
|| nftId === '3313'|| nftId === '4928'|| nftId === '3955'|| nftId === '4164'|| nftId === '3862'|| nftId === '5282'|| nftId === '3493'|| nftId === '2219'
|| nftId === '4023'|| nftId === '3074'|| nftId === '1076'|| nftId === '796'|| nftId === '219'|| nftId === '1177'|| nftId === '1510'|| nftId === '3533'
|| nftId === '2165'|| nftId === '826'|| nftId === '5277'|| nftId === '2234'|| nftId === '5964'|| nftId === '4724'|| nftId === '3794'|| nftId === '28'
|| nftId === '3564'|| nftId === '3937'|| nftId === '2000'|| nftId === '5898'|| nftId === '3780'|| nftId === '3940'|| nftId === '5488'|| nftId === '5369'
|| nftId === '2592'|| nftId === '3754'|| nftId === '4088'|| nftId === '481'|| nftId === '991'|| nftId === '5638'|| nftId === '1683'|| nftId === '1841'
|| nftId === '635'|| nftId === '631'|| nftId === '3663'|| nftId === '5791'|| nftId === '4300'|| nftId === '479'|| nftId === '2797'|| nftId === '1231'
|| nftId === '2591'|| nftId === '1803'|| nftId === '500'|| nftId === '3496'|| nftId === '1057'|| nftId === '5534'|| nftId === '3296'|| nftId === '5766'
|| nftId === '2220'|| nftId === '4891'|| nftId === '5549'|| nftId === '3881'|| nftId === '4770'|| nftId === '3622'|| nftId === '1344'|| nftId === '2888'
|| nftId === '3411'|| nftId === '374'|| nftId === '4692'|| nftId === '3504'|| nftId === '4819'|| nftId === '2376'|| nftId === '5387'|| nftId === '765'
|| nftId === '4084'|| nftId === '3165'|| nftId === '5382'|| nftId === '5516'|| nftId === '5981'|| nftId === '3357'|| nftId === '3941'|| nftId === '1742'
|| nftId === '5714'|| nftId === '1095'|| nftId === '2316'|| nftId === '5929'|| nftId === '4281'|| nftId === '3070'|| nftId === '1058'|| nftId === '1655'
|| nftId === '904'|| nftId === '4584'|| nftId === '4968'|| nftId === '1023'|| nftId === '1040'|| nftId === '4140'|| nftId === '789'|| nftId === '2748'
|| nftId === '469'|| nftId === '4509'|| nftId === '4443'|| nftId === '2064'|| nftId === '315'|| nftId === '3978'|| nftId === '3241'|| nftId === '5095'
|| nftId === '4559'|| nftId === '5487'|| nftId === '2394'|| nftId === '3436'|| nftId === '4074'|| nftId === '2120'|| nftId === '3732'|| nftId === '2891'
|| nftId === '1146'|| nftId === '4571'|| nftId === '5765'|| nftId === '511'|| nftId === '5463'|| nftId === '3156'|| nftId === '5962'|| nftId === '4521'
|| nftId === '5045'|| nftId === '2980'|| nftId === '2205'|| nftId === '5737'|| nftId === '4240'|| nftId === '4062'|| nftId === '2914'|| nftId === '1317'
|| nftId === '1246'|| nftId === '1117'|| nftId === '2694'|| nftId === '480'|| nftId === '5523'|| nftId === '4780'|| nftId === '4539'|| nftId === '165'
|| nftId === '3830'|| nftId === '4375'|| nftId === '771'|| nftId === '1685'|| nftId === '5888'|| nftId === '4179'|| nftId === '4520'|| nftId === '1351'
|| nftId === '4534'|| nftId === '4236'|| nftId === '2294'|| nftId === '5427'|| nftId === '2693'|| nftId === '2'|| nftId === '1191'|| nftId === '5370'
|| nftId === '2866'|| nftId === '4190'|| nftId === '5356'|| nftId === '190'|| nftId === '4779'|| nftId === '3083'|| nftId === '2542'|| nftId === '2656'
|| nftId === '2768'|| nftId === '2567'|| nftId === '783'|| nftId === '2086'|| nftId === '5196'|| nftId === '5579'|| nftId === '1672'|| nftId === '5653'
|| nftId === '613'|| nftId === '757'|| nftId === '2151'|| nftId === '5084'|| nftId === '3409'|| nftId === '5306'|| nftId === '5478'|| nftId === '4353'
|| nftId === '5863'|| nftId === '2671'|| nftId === '2066'|| nftId === '2259'|| nftId === '1709'|| nftId === '3819'|| nftId === '2336'|| nftId === '3924'
|| nftId === '1448'|| nftId === '84'|| nftId === '5927'|| nftId === '5263'|| nftId === '2019'|| nftId === '1528'|| nftId === '461'|| nftId === '5576'
|| nftId === '1425'|| nftId === '5948'|| nftId === '1575'|| nftId === '2911'|| nftId === '1616'|| nftId === '699'|| nftId === '3614'|| nftId === '4167'
|| nftId === '4916'|| nftId === '3471'|| nftId === '5136'|| nftId === '894'|| nftId === '3351'|| nftId === '337'|| nftId === '56'|| nftId === '3189'
|| nftId === '2360'|| nftId === '5495'|| nftId === '1659'|| nftId === '1022'|| nftId === '157'|| nftId === '4035'|| nftId === '64'|| nftId === '5359'
|| nftId === '3378'|| nftId === '1752'|| nftId === '3591'|| nftId === '3872'|| nftId === '5971'|| nftId === '5121'|| nftId === '82'|| nftId === '5050'
|| nftId === '4159'|| nftId === '5119'|| nftId === '5299'|| nftId === '1500'|| nftId === '3246'|| nftId === '5670'|| nftId === '5426'|| nftId === '4126'
|| nftId === '4741'|| nftId === '972'|| nftId === '1166'|| nftId === '3803'|| nftId === '815'|| nftId === '860'|| nftId === '5494'|| nftId === '3572'
|| nftId === '4360'|| nftId === '628'|| nftId === '4619'|| nftId === '3936'|| nftId === '3187'|| nftId === '3841'|| nftId === '3910'|| nftId === '92'
|| nftId === '1435'|| nftId === '1063'|| nftId === '46'|| nftId === '2887'|| nftId === '5627'|| nftId === '1730'|| nftId === '3555'|| nftId === '2678'
|| nftId === '5860'|| nftId === '1840'|| nftId === '3448'|| nftId === '2582'|| nftId === '2323'|| nftId === '1311'|| nftId === '241'|| nftId === '156'
|| nftId === '3847'|| nftId === '692'|| nftId === '5812'|| nftId === '5309'|| nftId === '3942'|| nftId === '3704'|| nftId === '2123'|| nftId === '661'
|| nftId === '5217'|| nftId === '2792'|| nftId === '2313'|| nftId === '592'|| nftId === '5416'|| nftId === '1321'|| nftId === '5395'|| nftId === '108'
|| nftId === '1259'|| nftId === '191'|| nftId === '4206'|| nftId === '352'|| nftId === '3285'|| nftId === '2046'|| nftId === '3521'|| nftId === '4646'
|| nftId === '5296'|| nftId === '898'|| nftId === '2164'|| nftId === '2710'|| nftId === '1562'|| nftId === '600'|| nftId === '3089'|| nftId === '4002'
|| nftId === '5507'|| nftId === '2809'|| nftId === '694'|| nftId === '1609'|| nftId === '4209'|| nftId === '1079'|| nftId === '4695'|| nftId === '1280'
|| nftId === '3417'|| nftId === '4437'|| nftId === '3833'|| nftId === '4661'|| nftId === '2396'|| nftId === '426'|| nftId === '114'|| nftId === '5410'
|| nftId === '4358'|| nftId === '3801'|| nftId === '2036'|| nftId === '3539'|| nftId === '5693'|| nftId === '3542'|| nftId === '5436'|| nftId === '2830'
|| nftId === '3340'|| nftId === '2516'|| nftId === '5958'|| nftId === '2833'|| nftId === '4904'|| nftId === '1936'|| nftId === '1954'|| nftId === '1713'
|| nftId === '5841'|| nftId === '4410'|| nftId === '5046'|| nftId === '720'|| nftId === '1027'|| nftId === '1923'|| nftId === '405'|| nftId === '2301'
|| nftId === '3152'|| nftId === '1044'|| nftId === '1150'|| nftId === '3236'|| nftId === '3033'|| nftId === '318'|| nftId === '2486'|| nftId === '5275'
|| nftId === '5289'|| nftId === '5068'|| nftId === '598'|| nftId === '5552'|| nftId === '3144'|| nftId === '1466'|| nftId === '5477'|| nftId === '4256'
|| nftId === '2246'|| nftId === '4545'|| nftId === '2504'|| nftId === '3949'|| nftId === '2102'|| nftId === '11'|| nftId === '829'|| nftId === '2148'
|| nftId === '4372'|| nftId === '3726'|| nftId === '466'|| nftId === '579'|| nftId === '247'|| nftId === '4784'|| nftId === '2574'|| nftId === '2346'
|| nftId === '4653'|| nftId === '574'|| nftId === '4263'|| nftId === '4577'|| nftId === '4635'|| nftId === '5789'|| nftId === '1572'|| nftId === '2308'
|| nftId === '385'|| nftId === '5626'|| nftId === '3510'|| nftId === '4004'|| nftId === '3834'|| nftId === '1118'|| nftId === '3413'|| nftId === '3012'
|| nftId === '2555'|| nftId === '3957'|| nftId === '1202'|| nftId === '546'|| nftId === '5216'|| nftId === '529'|| nftId === '188'|| nftId === '2401'
|| nftId === '4365'|| nftId === '2415'|| nftId === '1582'|| nftId === '2425'|| nftId === '1394'|| nftId === '181'|| nftId === '5976'|| nftId === '1381'
|| nftId === '457'|| nftId === '3923'|| nftId === '3193'|| nftId === '167'|| nftId === '4557'|| nftId === '2566'|| nftId === '440'|| nftId === '5071'
|| nftId === '711'|| nftId === '2362'|| nftId === '2742'|| nftId === '3709'|| nftId === '5247'|| nftId === '4009'|| nftId === '2261'|| nftId === '4285'
|| nftId === '5047'|| nftId === '5932'|| nftId === '4746'|| nftId === '325'|| nftId === '74'|| nftId === '2850'|| nftId === '2991'|| nftId === '4406'
|| nftId === '3115'|| nftId === '286'|| nftId === '3119'|| nftId === '5601'|| nftId === '430'|| nftId === '4930'|| nftId === '1613'|| nftId === '4564'
|| nftId === '840'|| nftId === '4889'|| nftId === '1170'|| nftId === '5381'|| nftId === '4846'|| nftId === '4211'|| nftId === '2196'|| nftId === '4105'
|| nftId === '1768'|| nftId === '4761'|| nftId === '5753'|| nftId === '5905'|| nftId === '3570'|| nftId === '1443'|| nftId === '2894'|| nftId === '1639'
|| nftId === '361'|| nftId === '3108'|| nftId === '3578'|| nftId === '2661'|| nftId === '4813'|| nftId === '5640'|| nftId === '3718'|| nftId === '1458'
|| nftId === '714'|| nftId === '2325'|| nftId === '1503'|| nftId === '4533'|| nftId === '2652'|| nftId === '2272'|| nftId === '3259'|| nftId === '5742'
|| nftId === '5230'|| nftId === '1649'|| nftId === '5896'|| nftId === '3548'|| nftId === '5347'|| nftId === '4286'|| nftId === '2819'|| nftId === '3371'
|| nftId === '3117'|| nftId === '3252'|| nftId === '4951'|| nftId === '5899'|| nftId === '4381'|| nftId === '3085'|| nftId === '1452'|| nftId === '1970'
|| nftId === '959'|| nftId === '759'|| nftId === '4107'|| nftId === '854'|| nftId === '4139'|| nftId === '3505'|| nftId === '4948'|| nftId === '3684'
|| nftId === '2631'|| nftId === '1823'|| nftId === '5983'|| nftId === '4654'|| nftId === '2837'|| nftId === '4921'|| nftId === '2198'|| nftId === '5116'
|| nftId === '4911'|| nftId === '1573'|| nftId === '1825'|| nftId === '3102'|| nftId === '5177'|| nftId === '1009'|| nftId === '1847'|| nftId === '4461'
|| nftId === '5833'|| nftId === '1520'|| nftId === '5859'|| nftId === '4987'|| nftId === '3600'|| nftId === '766'|| nftId === '187'|| nftId === '5550'
|| nftId === '3142'|| nftId === '5854'|| nftId === '3850'|| nftId === '2114'|| nftId === '1242'|| nftId === '3702'|| nftId === '5062'|| nftId === '2912'
|| nftId === '1591'|| nftId === '4532'|| nftId === '1113'|| nftId === '5459'|| nftId === '2056'|| nftId === '2773'|| nftId === '1646'|| nftId === '2714'
|| nftId === '201'|| nftId === '2193'|| nftId === '1566'|| nftId === '1796'|| nftId === '784'|| nftId === '3888'|| nftId === '2361'|| nftId === '3078'
|| nftId === '3052'|| nftId === '4184'|| nftId === '2556'|| nftId === '512'|| nftId === '330'|| nftId === '117'|| nftId === '3703'|| nftId === '4078'
|| nftId === '2174'|| nftId === '566'|| nftId === '1184'|| nftId === '1553'|| nftId === '2900'|| nftId === '5941'|| nftId === '2290'|| nftId === '283'
|| nftId === '1343'|| nftId === '663'|| nftId === '1388'|| nftId === '236'|| nftId === '4681'|| nftId === '1996'|| nftId === '5979'|| nftId === '2572'
|| nftId === '3297'|| nftId === '1977'|| nftId === '5937'|| nftId === '1283'|| nftId === '1143'|| nftId === '377'|| nftId === '3315'|| nftId === '5385'
|| nftId === '2338'|| nftId === '4647'|| nftId === '769'|| nftId === '485'|| nftId === '259'|| nftId === '4195'|| nftId === '4371'|| nftId === '3845'
|| nftId === '4115'|| nftId === '2583'|| nftId === '2077'|| nftId === '4563'|| nftId === '3547'|| nftId === '899'|| nftId === '3234'|| nftId === '5491'
|| nftId === '2880'|| nftId === '5619'|| nftId === '2786'|| nftId === '5455'|| nftId === '4124'|| nftId === '1667'|| nftId === '3140'|| nftId === '1632'
|| nftId === '953'|| nftId === '1697'|| nftId === '3179'|| nftId === '2055'|| nftId === '5284'|| nftId === '1592'|| nftId === '5871'|| nftId === '5893'
|| nftId === '2846'|| nftId === '4991'|| nftId === '5186'|| nftId === '307'|| nftId === '3757'|| nftId === '5314'|| nftId === '1291'|| nftId === '4046'
|| nftId === '5707'|| nftId === '5107'|| nftId === '5809'|| nftId === '4351'|| nftId === '5120'|| nftId === '4189'|| nftId === '4874'|| nftId === '5458'
|| nftId === '3274'|| nftId === '4939'|| nftId === '2947'|| nftId === '3188'|| nftId === '2161'|| nftId === '2770'|| nftId === '5953'|| nftId === '2037'
|| nftId === '1426'|| nftId === '3814'|| nftId === '142'|| nftId === '3892'|| nftId === '4751'|| nftId === '3810'|| nftId === '317'|| nftId === '4252'
|| nftId === '5248'|| nftId === '946'|| nftId === '1564'|| nftId === '5724'|| nftId === '3852'|| nftId === '3045'|| nftId === '432'|| nftId === '5069'
|| nftId === '1664'|| nftId === '1451'|| nftId === '5380'|| nftId === '2546'|| nftId === '4690'|| nftId === '271'|| nftId === '2669'|| nftId === '4830'
|| nftId === '1743'|| nftId === '3403'|| nftId === '1241'|| nftId === '2963'|| nftId === '5821'|| nftId === '5490'|| nftId === '3067'|| nftId === '1122'
|| nftId === '4335'|| nftId === '1965'|| nftId === '3185'|| nftId === '4880'|| nftId === '414'|| nftId === '1065'|| nftId === '4345'|| nftId === '5712'
|| nftId === '5320'|| nftId === '1475'|| nftId === '4370'|| nftId === '5618'|| nftId === '2602'|| nftId === '5051'|| nftId === '3804'|| nftId === '2076'
|| nftId === '658'|| nftId === '795'|| nftId === '3391'|| nftId === '5111'|| nftId === '23'|| nftId === '1159'|| nftId === '2475'|| nftId === '4227'
|| nftId === '3057'|| nftId === '595'|| nftId === '4249'|| nftId === '4458'|| nftId === '2129'|| nftId === '1512'|| nftId === '5461'|| nftId === '963'
|| nftId === '3956'|| nftId === '967'|| nftId === '2022'|| nftId === '3688'|| nftId === '1315'|| nftId === '4797'|| nftId === '4583'|| nftId === '78'
|| nftId === '5007'|| nftId === '847'|| nftId === '2143'|| nftId === '1524'|| nftId === '5175'|| nftId === '2755'|| nftId === '278'|| nftId === '5814'
|| nftId === '5517'|| nftId === '1428'|| nftId === '272'|| nftId === '1681'|| nftId === '3228'|| nftId === '4292'|| nftId === '1931'|| nftId === '2480'
|| nftId === '2118'|| nftId === '4728'|| nftId === '2483'|| nftId === '456'|| nftId === '3864'|| nftId === '3624'|| nftId === '4964'|| nftId === '1277'
|| nftId === '1295'|| nftId === '805'|| nftId === '1846'|| nftId === '684'|| nftId === '1182') { // Add Brown
    
  
  const brownGmCupOption = document.createElement('option');
    brownGmCupOption.value = layerImageUrls[18]; // Assuming Gold layer URL is the first in the array
    brownGmCupOption.textContent = customLayerNames[18]; // Assuming Gold layer name is the first in the array
    layerDropdown.appendChild(brownGmCupOption);

    const brownShotOption = document.createElement('option');
    brownShotOption.value = layerImageUrls[19]; // Assuming Shot layer URL is the second in the array
    brownShotOption.textContent = customLayerNames[19]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(brownShotOption);

    const brownBottletOption = document.createElement('option');
    brownBottletOption.value = layerImageUrls[47]; // Assuming Shot layer URL is the second in the array
    brownBottletOption.textContent = customLayerNames[47]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(brownBottletOption);

    const brownBeerOption = document.createElement('option');
    brownBeerOption.value = layerImageUrls[66]; // Assuming Shot layer URL is the second in the array
    brownBeerOption.textContent = customLayerNames[66]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(brownBeerOption);

    const pizzaOption = document.createElement('option');
    pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
    pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(pizzaOption);

    const ledgerOption = document.createElement('option');
    ledgerOption.value = layerImageUrls[86]; // Assuming Shot layer URL is the second in the array
    ledgerOption.textContent = customLayerNames[86]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(ledgerOption);
  }
  const redId = [7, 25, 35, 38, 49, 69, 132, 213, 226, 246, 254, 289, 316, 329, 331, 332, 333, 334, 372, 380, 403, 422, 460, 470, 475, 483, 498, 499, 520, 527, 568, 578, 636, 644, 680, 705, 721, 760, 801, 845, 849, 864, 881, 911, 943, 951, 957, 976, 983, 990, 1011, 1050, 1073, 1108, 1112, 1125, 1142, 1153, 1179, 1194, 1224, 1236, 1294, 1301, 1329, 1360, 1405, 1412, 1413, 1427, 1456, 1463, 1478, 1483, 1485, 1529, 1587, 1590, 1600, 1618, 1633, 1636, 1642, 1652, 1666, 1692, 1714, 1723, 1736, 1756, 1787, 1815, 1843, 1860, 1879, 1882, 1885, 1912, 1929, 2004, 2060, 2069, 2097, 2136, 2141, 2163, 2175, 2216, 2238, 2260, 2275, 2298, 2310, 2326, 2330, 2357, 2391, 2423, 2442, 2455, 2476, 2479, 2491, 2502, 2510, 2529, 2549, 2597, 2605, 2675, 2718, 2730, 2737, 2738, 2774, 2795, 2804, 2817, 2825, 2840, 2843, 2856, 2867, 2886, 2933, 2934, 2936, 2944, 2948, 2962, 2978, 3000, 3015, 3021, 3027, 3053, 3056, 3069, 3092, 3104, 3120, 3122, 3149, 3150, 3176, 3177, 3219, 3245, 3253, 3261, 3270, 3294, 3298, 3316, 3327, 3334, 3359, 3373, 3376, 3383, 3390, 3418, 3437, 3462, 3463, 3491, 3500, 3507, 3509, 3549, 3560, 3592, 3616, 3634, 3638, 3721, 3738, 3747, 3773, 3789, 3806, 3821, 3886, 3889, 3944, 3976, 3990, 4021, 4051, 4067, 4083, 4085, 4111, 4134, 4160, 4166, 4198, 4207, 4216, 4225, 4237, 4251, 4254, 4266, 4302, 4318, 4394, 4409, 4433, 4442, 4465, 4482, 4487, 4489, 4527, 4530, 4550, 4569, 4570, 4582, 4593, 4607, 4679, 4689, 4705, 4723, 4742, 4754, 4782, 4828, 4835, 4864, 4866, 4876, 4901, 4931, 4997, 5008, 5034, 5041, 5042, 5093, 5110, 5125, 5127, 5160, 5162, 5165, 5185, 5205, 5208, 5234, 5238, 5274, 5292, 5317, 5323, 5334, 5340, 5377, 5379, 5393, 5413, 5433, 5443, 5448, 5456, 5472, 5506, 5525, 5540, 5546, 5592, 5612, 5616, 5622, 5624, 5667, 5671, 5691, 5746, 5752, 5761, 5776, 5834, 5870, 5875, 5878, 5890, 5900, 5907, 5914, 5923, 5966, 5970];

  if (redId.includes(parseInt(nftId))) {
    const redOption = document.createElement('option');
    redOption.value = layerImageUrls[20];
    redOption.textContent = customLayerNames[20];
    layerDropdown.appendChild(redOption);
  
    const redShotOption = document.createElement('option');
    redShotOption.value = layerImageUrls[21];
    redShotOption.textContent = customLayerNames[21];
    layerDropdown.appendChild(redShotOption);

    const redBottleOption = document.createElement('option');
    redBottleOption.value = layerImageUrls[48];
    redBottleOption.textContent = customLayerNames[48];
    layerDropdown.appendChild(redBottleOption);

    const redBeerOption = document.createElement('option');
    redBeerOption.value = layerImageUrls[67];
    redBeerOption.textContent = customLayerNames[67];
    layerDropdown.appendChild(redBeerOption);

    const pizzaOption = document.createElement('option');
    pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
    pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(pizzaOption);

    const ledgerOption = document.createElement('option');
    ledgerOption.value = layerImageUrls[87]; // Assuming Shot layer URL is the second in the array
    ledgerOption.textContent = customLayerNames[87]; // Assuming Shot layer name is the second in the array
    layerDropdown.appendChild(ledgerOption);
  }
  const blackId = [3, 8, 12, 15, 36, 37, 51, 52, 53, 57, 59, 62, 63, 71, 72, 80, 91, 106, 123, 125, 127, 130, 147, 152, 158, 170, 189, 198, 211, 212, 224, 229, 235, 252, 265, 266, 267, 284, 303, 309, 335, 349, 351, 356, 359, 368, 371, 373, 383, 393, 408, 410, 452, 454, 463, 464, 473, 489, 490, 491, 495, 496, 508, 518, 544, 550, 563, 586, 593, 594, 608, 614, 616, 618, 624, 638, 672, 677, 681, 682, 685, 689, 702, 708, 709, 718, 726, 735, 761, 772, 793, 804, 810, 813, 816, 861, 882, 883, 884, 888, 892, 895, 900, 901, 908, 910, 914, 915, 934, 947, 949, 984, 993, 998, 1008, 1010, 1029, 1032, 1049, 1053, 1056, 1061, 1083, 1085, 1092, 1104, 1130, 1147, 1162, 1178, 1206, 1214, 1216, 1217, 1227, 1230, 1233, 1253, 1270, 1288, 1293, 1325, 1346, 1349, 1359, 1377, 1384, 1395, 1397, 1406, 1418, 1420, 1433, 1437, 1467, 1479, 1484, 1495, 1509, 1513, 1527, 1532, 1549, 1554, 1555, 1560, 1568, 1579, 1583, 1584, 1594, 1604, 1631, 1644, 1647, 1650, 1662, 1706, 1710, 1725, 1727, 1741, 1754, 1761, 1772, 1778, 1781, 1783, 1785, 1827, 1830, 1838, 1844, 1848, 1856, 1857, 1878, 1890, 1901, 1902, 1909, 1924, 1940, 1942, 1953, 1962, 1967, 1998, 2007, 2015, 2023, 2027, 2035, 2042, 2051, 2052, 2063, 2068, 2074, 2079, 2081, 2085, 2091, 2092, 2103, 2106, 2110, 2124, 2128, 2137, 2147, 2156, 2160, 2162, 2182, 2195, 2225, 2229, 2265, 2278, 2293, 2320, 2327, 2331, 2340, 2341, 2349, 2364, 2377, 2383, 2395, 2412, 2413, 2416, 2422, 2431, 2435, 2439, 2459, 2465, 2468, 2473, 2481, 2484, 2539, 2540, 2543, 2550, 2559, 2576, 2593, 2600, 2613, 2615, 2619, 2629, 2637, 2647, 2655, 2663, 2674, 2683, 2686, 2700, 2708, 2712, 2719, 2741, 2744, 2747, 2750, 2751, 2760, 2764, 2765, 2776, 2777, 2778, 2794, 2814, 2818, 2820, 2851, 2857, 2858, 2874, 2885, 2890, 2901, 2908, 2910, 2913, 2918, 2921, 2923, 2925, 2928, 2937, 2938, 2945, 2950, 2958, 2959, 2966, 2973, 2979, 2983, 2984, 3001, 3018, 3024, 3039, 3072, 3100, 3106, 3109, 3112, 3123, 3136, 3139, 3158, 3206, 3209, 3224, 3239, 3265, 3267, 3269, 3272, 3275, 3292, 3295, 3300, 3311, 3317, 3318, 3323, 3350, 3370, 3392, 3398, 3420, 3427, 3428, 3438, 3443, 3449, 3477, 3478, 3488, 3490, 3519, 3528, 3540, 3554, 3558, 3561, 3562, 3565, 3573, 3580, 3593, 3598, 3599, 3602, 3607, 3610, 3618, 3619, 3626, 3636, 3637, 3642, 3656, 3683, 3687, 3707, 3714, 3723, 3728, 3734, 3739, 3744, 3761, 3766, 3768, 3784, 3787, 3807, 3812, 3816, 3839, 3859, 3866, 3877, 3895, 3899, 3903, 3917, 3929, 3933, 3934, 3946, 3953, 3965, 3973, 3974, 3991, 4007, 4011, 4012, 4019, 4028, 4031, 4034, 4043, 4044, 4050, 4053, 4071, 4072, 4089, 4099, 4102, 4106, 4117, 4129, 4130, 4133, 4136, 4174, 4178, 4181, 4183, 4192, 4196, 4208, 4233, 4244, 4246, 4255, 4257, 4258, 4261, 4267, 4268, 4271, 4309, 4320, 4324, 4326, 4337, 4339, 4340, 4343, 4344, 4348, 4355, 4356, 4385, 4387, 4391, 4403, 4416, 4418, 4419, 4424, 4435, 4436, 4460, 4464, 4467, 4472, 4475, 4498, 4512, 4516, 4519, 4525, 4535, 4537, 4567, 4575, 4587, 4589, 4591, 4625, 4627, 4631, 4633, 4644, 4645, 4655, 4657, 4670, 4676, 4677, 4688, 4700, 4752, 4757, 4771, 4772, 4775, 4790, 4798, 4807, 4812, 4849, 4850, 4856, 4857, 4870, 4872, 4885, 4906, 4942, 4952, 4956, 4978, 4982, 4989, 4996, 5000, 5004, 5009, 5028, 5033, 5054, 5055, 5077, 5078, 5091, 5094, 5100, 5106, 5130, 5135, 5146, 5157, 5158, 5168, 5180, 5182, 5195, 5201, 5203, 5207, 5224, 5250, 5251, 5255, 5266, 5267, 5269, 5271, 5287, 5290, 5308, 5313, 5316, 5319, 5322, 5338, 5343, 5353, 5362, 5397, 5400, 5409, 5417, 5420, 5425, 5466, 5470, 5471, 5482, 5498, 5500, 5505, 5508, 5538, 5561, 5568, 5570, 5575, 5581, 5614, 5642, 5644, 5657, 5662, 5681, 5687, 5701, 5704, 5711, 5731, 5749, 5756, 5770, 5773, 5813, 5816, 5823, 5836, 5840, 5845, 5847, 5883, 5885, 5894, 5916, 5930, 5951, 5957, 5980, 5996];

if (blackId.includes(parseInt(nftId))) {
  const blackOption = document.createElement('option');
  blackOption.value = layerImageUrls[22];
  blackOption.textContent = customLayerNames[22];
  layerDropdown.appendChild(blackOption);

  const blackShotOption = document.createElement('option');
  blackShotOption.value = layerImageUrls[23];
  blackShotOption.textContent = customLayerNames[23];
  layerDropdown.appendChild(blackShotOption);
  
  const blackBottleOption = document.createElement('option');
  blackBottleOption.value = layerImageUrls[49];
  blackBottleOption.textContent = customLayerNames[49];
  layerDropdown.appendChild(blackBottleOption);

  const blackBeerOption = document.createElement('option');
  blackBeerOption.value = layerImageUrls[68];
  blackBeerOption.textContent = customLayerNames[68];
  layerDropdown.appendChild(blackBeerOption);

  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[88]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[88]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);
}
 const pinkId = [19,21,97,136,149,150,162,173,183,197,208,249,253,313,364,406,412,450,462,471,509,514,541,553,611,633,643,646,668,678,687,693,717,723,762,778,785,794,841,852,871,876,912,968,992,1047,1099,1102,1103,1105,1185,1188,1203,1258,1267,1362,1372,1374,1378,1444,1496,1511,1533,1546,1550,1580,1586,1589,1611,1625,1628,1704,1720,1722,1770,1786,1798,1802,1836,1839,1865,1866,1873,1881,1883,1884,1894,1895,1918,1919,1937,1960,1976,1994,2026,2033,2038,2058,2099,2101,2132,2138,2194,2218,2224,2226,2239,2244,2267,2295,2324,2329,2359,2366,2372,2405,2426,2432,2467,2513,2518,2523,2533,2536,2568,2577,2630,2636,2641,2643,2644,2662,2679,2692,2697,2706,2715,2727,2759,2781,2782,2793,2799,2810,2816,2826,2827,2828,2841,2845,2899,2903,2919,2932,2939,2943,2972,2982,3011,3032,3035,3071,3073,3087,3095,3114,3121,3154,3230,3233,3249,3290,3332,3366,3367,3381,3384,3425,3465,3522,3529,3545,3557,3652,3659,3662,3672,3677,3701,3736,3820,3825,3849,3883,3891,3906,3909,3919,3939,3945,3964,3993,4006,4025,4032,4052,4059,4097,4163,4168,4175,4199,4201,4231,4241,4296,4331,4366,4395,4402,4413,4438,4449,4456,4500,4502,4511,4526,4541,4562,4622,4650,4669,4672,4687,4696,4711,4760,4762,4768,4868,4955,4961,4971,4973,4977,4980,4983,4999,5015,5025,5029,5037,5040,5087,5114,5139,5156,5170,5173,5178,5184,5192,5204,5212,5226,5242,5258,5307,5318,5367,5374,5378,5384,5401,5429,5446,5460,5532,5544,5572,5607,5609,5648,5654,5664,5683,5700,5719,5726,5733,5740,5780,5909,5910,5943,5975,5987,5991,5999]
if (pinkId.includes(parseInt(nftId))) {
  const pinkOption = document.createElement('option');
  pinkOption.value = layerImageUrls[24];
  pinkOption.textContent = customLayerNames[24];
  layerDropdown.appendChild(pinkOption);

  const pinkShotOption = document.createElement('option');
  pinkShotOption.value = layerImageUrls[25];
  pinkShotOption.textContent = customLayerNames[25];
  layerDropdown.appendChild(pinkShotOption);

  const pinkBottleOption = document.createElement('option');
  pinkBottleOption.value = layerImageUrls[50];
  pinkBottleOption.textContent = customLayerNames[50];
  layerDropdown.appendChild(pinkBottleOption);

  const pinkBeerOption = document.createElement('option');
  pinkBeerOption.value = layerImageUrls[69];
  pinkBeerOption.textContent = customLayerNames[69];
  layerDropdown.appendChild(pinkBeerOption);

  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[89]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[89]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);
}
const creamId = [22,27,41,67,81,88,89,93,105,115,119,124,141,169,180,215,223,239,260,279,282,288,291,322,345,360,362,369,382,389,394,400,419,423,465,474,505,530,536,549,555,567,570,575,582,588,630,632,704,719,732,739,741,770,776,791,797,809,838,846,848,859,869,875,886,897,918,922,932,944,981,999,1017,1031,1034,1052,1054,1055,1077,1081,1120,1123,1145,1149,1173,1192,1222,1225,1239,1263,1278,1302,1305,1358,1364,1373,1399,1402,1404,1424,1445,1460,1476,1494,1498,1506,1508,1522,1543,1571,1585,1588,1641,1670,1678,1680,1689,1749,1751,1758,1765,1771,1779,1795,1809,1858,1872,1913,1974,1995,1997,2001,2053,2078,2082,2152,2158,2159,2173,2176,2178,2187,2203,2207,2233,2235,2237,2258,2279,2280,2282,2297,2299,2302,2315,2344,2351,2379,2387,2417,2419,2434,2445,2452,2454,2492,2515,2532,2560,2564,2571,2579,2580,2586,2587,2599,2601,2604,2616,2625,2634,2635,2640,2650,2654,2696,2698,2709,2713,2717,2758,2761,2762,2767,2772,2775,2783,2789,2798,2812,2813,2836,2838,2848,2862,2863,2864,2865,2868,2871,2873,2877,2884,2906,2920,2929,2988,3020,3029,3042,3048,3058,3097,3110,3133,3138,3163,3164,3170,3180,3181,3198,3202,3205,3208,3218,3221,3229,3235,3271,3286,3293,3299,3319,3321,3343,3355,3361,3386,3387,3397,3400,3426,3431,3444,3458,3484,3502,3523,3527,3532,3536,3541,3563,3566,3569,3586,3596,3604,3606,3623,3627,3640,3643,3644,3649,3661,3666,3673,3682,3686,3698,3699,3708,3748,3760,3770,3798,3805,3818,3822,3836,3846,3854,3869,3880,3890,3894,3915,3918,3921,3922,3932,3975,3998,4010,4030,4039,4054,4057,4063,4103,4109,4137,4148,4158,4210,4221,4232,4253,4276,4277,4280,4284,4287,4298,4311,4314,4338,4386,4401,4414,4440,4453,4497,4503,4515,4528,4540,4543,4546,4547,4555,4560,4568,4573,4600,4603,4613,4630,4666,4671,4680,4682,4684,4698,4709,4710,4720,4726,4729,4747,4753,4776,4814,4827,4831,4840,4843,4848,4886,4910,4918,4920,4927,4974,4990,4992,5003,5024,5082,5105,5108,5124,5137,5188,5198,5240,5273,5297,5301,5324,5360,5375,5383,5398,5402,5404,5405,5408,5414,5421,5422,5424,5462,5465,5467,5476,5485,5496,5499,5511,5547,5583,5591,5634,5639,5665,5668,5692,5697,5705,5718,5744,5760,5787,5788,5793,5794,5802,5827,5842,5851,5873,5897,5911,5933,5944,5950,5952,5955,5985,5994]
  if (creamId.includes(parseInt(nftId))) {
  const creamOption = document.createElement('option');
  creamOption.value = layerImageUrls[26];
  creamOption.textContent = customLayerNames[26];
  layerDropdown.appendChild(creamOption);

  const creamShotOption = document.createElement('option');
  creamShotOption.value = layerImageUrls[27];
  creamShotOption.textContent = customLayerNames[27];
  layerDropdown.appendChild(creamShotOption);

  const creamBottleOption = document.createElement('option');
  creamBottleOption.value = layerImageUrls[51];
  creamBottleOption.textContent = customLayerNames[51];
  layerDropdown.appendChild(creamBottleOption);

  const creamBeerOption = document.createElement('option');
  creamBeerOption.value = layerImageUrls[70];
  creamBeerOption.textContent = customLayerNames[70];
  layerDropdown.appendChild(creamBeerOption);

  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[90]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[90]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);

}
const blueId = [6,13,60,96,100,104,151,166,199,204,206,227,262,280,296,304,438,444,455,486,487,504,559,562,589,590,599,621,641,691,695,698,706,736,768,788,820,823,827,833,865,916,940,995,996,1019,1086,1100,1219,1223,1229,1238,1244,1255,1264,1275,1276,1287,1334,1356,1398,1419,1432,1482,1502,1514,1525,1534,1556,1565,1569,1597,1603,1621,1640,1651,1654,1656,1660,1669,1698,1766,1837,1921,1927,1934,1957,2016,2031,2067,2071,2080,2111,2116,2183,2189,2200,2213,2221,2254,2256,2264,2288,2339,2407,2462,2489,2498,2530,2535,2541,2551,2552,2557,2584,2598,2621,2626,2639,2667,2673,2685,2695,2703,2731,2788,2821,2823,2829,2905,2924,2954,2970,2985,3002,3030,3046,3099,3153,3159,3175,3196,3213,3214,3226,3243,3247,3260,3281,3291,3302,3303,3320,3325,3328,3331,3385,3394,3421,3424,3430,3453,3466,3475,3498,3567,3568,3584,3587,3608,3613,3615,3645,3670,3706,3712,3720,3769,3781,3795,3799,3811,3835,3840,3848,3958,3994,4001,4013,4033,4092,4100,4135,4144,4186,4188,4213,4215,4230,4235,4269,4289,4301,4305,4310,4316,4323,4334,4363,4377,4388,4430,4459,4462,4506,4513,4580,4585,4590,4615,4652,4658,4663,4673,4765,4774,4884,4947,5006,5022,5023,5038,5060,5070,5080,5123,5141,5148,5163,5176,5268,5270,5280,5288,5363,5411,5447,5449,5503,5514,5528,5535,5537,5574,5589,5597,5615,5620,5621,5647,5655,5715,5717,5729,5772,5781,5783,5797,5852,5861,5879,5881,5904,5922,5934,5940,5942,5960,5973,5977,5993,5995]
  if (blueId.includes(parseInt(nftId))) {
  const blueOption = document.createElement('option');
  blueOption.value = layerImageUrls[28];
  blueOption.textContent = customLayerNames[28];
  layerDropdown.appendChild(blueOption);

  const blueShotOption = document.createElement('option');
  blueShotOption.value = layerImageUrls[29];
  blueShotOption.textContent = customLayerNames[29];
  layerDropdown.appendChild(blueShotOption);

  const blueBottleOption = document.createElement('option');
  blueBottleOption.value = layerImageUrls[52];
  blueBottleOption.textContent = customLayerNames[52];
  layerDropdown.appendChild(blueBottleOption);

  const blueBeerOption = document.createElement('option');
  blueBeerOption.value = layerImageUrls[71];
  blueBeerOption.textContent = customLayerNames[71];
  layerDropdown.appendChild(blueBeerOption);

  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[91]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[91]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);
}
const greyId = [4,16,43,44,54,70,83,121,146,161,164,176,178,185,203,221,222,243,245,248,255,268,295,300,312,357,358,363,365,417,488,502,510,513,539,547,551,576,584,619,629,734,745,800,807,819,857,878,880,885,923,938,980,986,1001,1042,1072,1106,1109,1158,1169,1243,1262,1274,1299,1304,1318,1342,1400,1441,1447,1469,1480,1557,1559,1576,1581,1718,1739,1769,1788,1829,1845,1855,1905,1941,1951,1959,1992,2013,2075,2084,2095,2098,2121,2125,2139,2168,2171,2177,2184,2212,2243,2268,2277,2286,2287,2319,2322,2333,2409,2414,2420,2430,2448,2466,2472,2506,2563,2570,2573,2581,2608,2610,2624,2668,2676,2687,2723,2733,2766,2779,2785,2805,2808,2824,2835,2853,2861,2878,2902,2926,2927,2930,2931,2957,2981,3047,3146,3162,3173,3186,3201,3203,3216,3217,3278,3289,3309,3337,3352,3362,3369,3399,3432,3446,3485,3486,3487,3506,3550,3605,3612,3617,3630,3655,3697,3755,3764,3788,3790,3808,3824,3860,3871,3875,3908,3913,3938,3952,3979,3980,3996,4005,4029,4070,4086,4147,4149,4154,4155,4165,4193,4220,4278,4282,4290,4357,4369,4374,4383,4420,4457,4501,4536,4549,4612,4640,4642,4685,4703,4706,4713,4733,4744,4820,4822,4838,4841,4853,4875,4905,4923,4938,4945,4953,4963,4967,4970,4995,5002,5012,5061,5066,5067,5073,5118,5126,5134,5149,5164,5169,5189,5225,5235,5237,5278,5326,5348,5390,5428,5453,5468,5526,5536,5543,5573,5584,5595,5641,5645,5656,5669,5673,5684,5698,5708,5709,5739,5784,5796,5825,5857,5874,5884,5949,5986]
  if (greyId.includes(parseInt(nftId))) {
  const greyOption = document.createElement('option');
  greyOption.value = layerImageUrls[30];
  greyOption.textContent = customLayerNames[30];
  layerDropdown.appendChild(greyOption);

  const greyShotOption = document.createElement('option');
  greyShotOption.value = layerImageUrls[31];
  greyShotOption.textContent = customLayerNames[31];
  layerDropdown.appendChild(greyShotOption);

  const greyBottleOption = document.createElement('option');
  greyBottleOption.value = layerImageUrls[53];
  greyBottleOption.textContent = customLayerNames[53];
  layerDropdown.appendChild(greyBottleOption);

  const greyBeerOption = document.createElement('option');
  greyBeerOption.value = layerImageUrls[72];
  greyBeerOption.textContent = customLayerNames[72];
  layerDropdown.appendChild(greyBeerOption);

  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[92]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[92]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);
}
const darkBrownId = [0,14,18,26,31,47,107,122,131,133,137,154,160,163,193,202,205,210,217,220,228,232,256,258,263,269,275,277,285,292,310,319,321,342,343,347,370,384,397,402,413,420,424,431,441,451,458,468,477,478,494,503,523,525,532,540,556,561,577,580,583,591,597,606,615,620,622,623,627,640,651,653,666,667,671,679,683,707,713,724,729,740,742,747,755,764,777,780,782,787,799,822,828,830,832,870,872,874,896,903,905,909,925,927,930,937,945,958,969,970,974,975,982,1002,1003,1004,1005,1007,1012,1016,1018,1024,1035,1037,1051,1070,1091,1093,1098,1101,1116,1132,1134,1137,1138,1151,1155,1161,1168,1174,1193,1195,1198,1201,1208,1212,1215,1226,1228,1251,1271,1279,1281,1282,1286,1296,1308,1312,1327,1330,1331,1333,1345,1348,1350,1366,1369,1389,1392,1393,1407,1409,1410,1411,1430,1431,1434,1436,1440,1455,1468,1470,1481,1487,1491,1516,1518,1519,1531,1538,1552,1558,1574,1578,1595,1598,1599,1606,1608,1610,1620,1623,1634,1635,1637,1643,1648,1665,1668,1674,1690,1693,1694,1696,1699,1702,1708,1731,1737,1738,1740,1744,1747,1760,1782,1784,1790,1792,1801,1805,1806,1807,1808,1814,1818,1831,1842,1851,1871,1875,1877,1886,1888,1893,1903,1908,1910,1915,1925,1933,1938,1939,1946,1948,1952,1956,1964,1966,1972,1978,1981,1982,1984,1991,2002,2006,2010,2017,2020,2021,2024,2034,2040,2041,2059,2065,2096,2100,2104,2105,2112,2115,2127,2145,2146,2149,2150,2153,2155,2204,2222,2223,2227,2240,2241,2245,2251,2252,2257,2283,2291,2292,2296,2303,2304,2307,2311,2314,2318,2337,2352,2354,2355,2358,2368,2374,2389,2392,2427,2438,2440,2441,2443,2482,2487,2496,2505,2507,2511,2519,2521,2522,2527,2537,2548,2553,2558,2589,2590,2595,2614,2623,2632,2658,2660,2670,2677,2680,2688,2691,2702,2705,2711,2716,2724,2725,2729,2736,2740,2754,2769,2771,2787,2800,2803,2811,2834,2842,2859,2876,2883,2898,2907,2916,2935,2942,2953,2976,2989,2992,2998,3005,3010,3014,3017,3028,3043,3044,3049,3060,3061,3066,3068,3079,3084,3086,3094,3107,3116,3131,3137,3147,3167,3182,3200,3210,3242,3251,3258,3262,3264,3284,3288,3314,3335,3344,3347,3353,3356,3363,3368,3372,3375,3380,3388,3405,3423,3442,3445,3450,3455,3464,3470,3479,3480,3494,3501,3508,3511,3513,3514,3518,3524,3537,3543,3552,3553,3574,3575,3581,3583,3603,3620,3621,3631,3633,3639,3657,3664,3665,3667,3668,3669,3671,3674,3685,3692,3693,3694,3695,3724,3730,3735,3737,3751,3759,3771,3772,3777,3782,3783,3791,3796,3797,3800,3817,3823,3826,3829,3832,3838,3842,3843,3855,3857,3861,3878,3887,3893,3901,3925,3935,3948,3960,3961,3962,3967,3968,3989,4008,4014,4015,4017,4027,4045,4049,4056,4069,4076,4082,4110,4112,4113,4118,4125,4131,4141,4151,4161,4162,4170,4177,4187,4202,4204,4223,4224,4242,4248,4259,4260,4264,4270,4272,4274,4275,4279,4297,4299,4307,4308,4313,4319,4322,4327,4329,4330,4332,4333,4341,4350,4352,4362,4376,4378,4380,4382,4396,4397,4399,4404,4405,4411,4421,4426,4427,4431,4439,4447,4448,4463,4477,4480,4484,4492,4493,4494,4496,4508,4510,4514,4517,4531,4538,4544,4552,4561,4574,4594,4595,4597,4605,4608,4610,4614,4624,4629,4637,4648,4651,4662,4667,4668,4686,4691,4714,4715,4716,4727,4750,4763,4764,4766,4781,4792,4815,4826,4833,4855,4859,4860,4861,4862,4865,4871,4882,4883,4899,4900,4907,4917,4919,4922,4940,4943,4958,4960,4969,4976,4981,4986,4988,4994,4998,5001,5005,5013,5019,5020,5030,5031,5053,5058,5063,5065,5083,5098,5099,5122,5131,5138,5140,5147,5153,5159,5167,5171,5181,5193,5199,5219,5233,5236,5239,5252,5253,5256,5259,5261,5264,5286,5293,5302,5321,5331,5336,5337,5341,5344,5345,5349,5350,5354,5364,5366,5386,5388,5394,5399,5423,5432,5438,5445,5469,5474,5481,5492,5493,5502,5504,5515,5524,5529,5530,5553,5554,5557,5560,5562,5577,5580,5582,5586,5587,5596,5598,5610,5628,5646,5666,5675,5676,5685,5690,5695,5710,5716,5722,5727,5736,5738,5747,5751,5763,5771,5792,5799,5800,5801,5805,5806,5810,5818,5820,5824,5826,5831,5832,5835,5837,5838,5844,5850,5855,5856,5858,5862,5864,5876,5877,5906,5913,5917,5935,5936,5963,5965,5967,5969,5989]
  if (darkBrownId.includes(parseInt(nftId))) {
  const darkBrownOption = document.createElement('option');
  darkBrownOption.value = layerImageUrls[32];
  darkBrownOption.textContent = customLayerNames[32];
  layerDropdown.appendChild(darkBrownOption);

  const darkBrownShotOption = document.createElement('option');
  darkBrownShotOption.value = layerImageUrls[33];
  darkBrownShotOption.textContent = customLayerNames[33];
  layerDropdown.appendChild(darkBrownShotOption);

  const darkBrownBottleOption = document.createElement('option');
  darkBrownBottleOption.value = layerImageUrls[54];
  darkBrownBottleOption.textContent = customLayerNames[54];
  layerDropdown.appendChild(darkBrownBottleOption);

  const darkBrownBeerOption = document.createElement('option');
  darkBrownBeerOption.value = layerImageUrls[73];
  darkBrownBeerOption.textContent = customLayerNames[73];
  layerDropdown.appendChild(darkBrownBeerOption);

  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[93]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[93]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);
}
const goldenkBrownId = [5,24,34,40,58,65,68,79,90,98,99,102,103,113,126,128,135,139,171,175,179,194,200,233,238,281,297,305,311,346,376,395,399,411,437,439,472,476,507,522,524,545,552,564,587,596,610,626,637,642,645,647,650,652,654,655,662,688,710,725,727,728,730,731,749,767,773,781,806,808,842,844,850,858,887,913,920,924,960,964,978,989,994,1000,1026,1046,1059,1067,1068,1069,1078,1090,1126,1129,1135,1144,1148,1163,1172,1183,1197,1207,1213,1234,1245,1268,1272,1284,1297,1309,1324,1328,1365,1368,1371,1380,1391,1403,1417,1438,1453,1454,1461,1477,1488,1489,1490,1505,1536,1537,1548,1561,1577,1596,1612,1614,1615,1624,1675,1679,1686,1691,1721,1732,1745,1755,1764,1794,1799,1821,1849,1854,1876,1887,1896,1914,1916,1935,1944,1945,1949,1961,1990,1999,2030,2032,2039,2045,2070,2072,2073,2088,2090,2107,2108,2117,2134,2179,2188,2197,2202,2209,2211,2228,2230,2231,2249,2274,2285,2312,2321,2342,2363,2369,2398,2403,2410,2411,2428,2429,2444,2457,2463,2464,2470,2474,2478,2490,2493,2501,2512,2528,2538,2544,2545,2575,2607,2609,2612,2618,2645,2664,2682,2699,2704,2707,2784,2790,2801,2806,2822,2844,2847,2854,2855,2860,2881,2896,2940,2951,2952,2956,2960,2964,2968,2974,2975,2990,2995,2996,3026,3034,3036,3051,3059,3075,3076,3080,3082,3135,3143,3148,3192,3204,3222,3225,3237,3254,3257,3273,3312,3336,3364,3377,3402,3412,3414,3435,3441,3447,3452,3459,3476,3481,3515,3546,3556,3559,3589,3629,3635,3676,3678,3680,3700,3711,3713,3717,3745,3746,3758,3763,3774,3778,3786,3792,3813,3827,3858,3868,3898,3905,3911,3914,3916,3926,3930,3950,3971,3972,3981,3984,3988,4020,4037,4042,4048,4055,4061,4065,4081,4087,4090,4116,4127,4145,4169,4182,4194,4197,4228,4238,4243,4291,4303,4304,4321,4373,4379,4390,4398,4407,4408,4412,4429,4445,4446,4452,4455,4469,4518,4542,4551,4553,4565,4581,4596,4601,4609,4611,4618,4623,4634,4636,4656,4674,4701,4719,4748,4758,4767,4777,4785,4793,4809,4811,4816,4824,4829,4832,4842,4847,4854,4877,4890,4897,4898,4903,4913,4929,4937,4946,4954,4957,4962,4972,5016,5026,5032,5049,5052,5056,5059,5079,5081,5089,5090,5102,5113,5117,5145,5152,5191,5197,5200,5202,5206,5209,5210,5213,5221,5265,5279,5305,5329,5330,5339,5352,5355,5368,5392,5418,5419,5434,5484,5486,5501,5509,5510,5518,5521,5522,5527,5539,5542,5545,5569,5578,5594,5608,5629,5637,5649,5652,5658,5660,5674,5677,5694,5720,5725,5741,5743,5755,5762,5767,5768,5782,5785,5815,5822,5828,5830,5867,5869,5892,5901,5919,5924,5931,5938,5945,5954,5972,5974,5984,5998]
  if (goldenkBrownId.includes(parseInt(nftId))) {
  const goldenBrownOption = document.createElement('option');
  goldenBrownOption.value = layerImageUrls[34];
  goldenBrownOption.textContent = customLayerNames[34];
  layerDropdown.appendChild(goldenBrownOption);

  const goldenBrownShotOption = document.createElement('option');
  goldenBrownShotOption.value = layerImageUrls[35];
  goldenBrownShotOption.textContent = customLayerNames[35];
  layerDropdown.appendChild(goldenBrownShotOption);

  const goldenBrownBottleOption = document.createElement('option');
  goldenBrownBottleOption.value = layerImageUrls[55];
  goldenBrownBottleOption.textContent = customLayerNames[55];
  layerDropdown.appendChild(goldenBrownBottleOption);

  const goldenBrownBeerOption = document.createElement('option');
  goldenBrownBeerOption.value = layerImageUrls[74];
  goldenBrownBeerOption.textContent = customLayerNames[74];
  layerDropdown.appendChild(goldenBrownBeerOption);

  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[94]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[94]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);
}
const tanId = [10,30,33,39,85,94,109,116,129,155,196,225,230,234,290,294,298,320,324,328,341,378,388,429,433,435,467,493,501,526,533,538,554,565,571,585,605,625,634,639,648,657,659,660,665,673,676,712,733,738,750,803,824,837,843,855,866,867,873,921,928,929,935,941,948,950,961,971,973,1021,1062,1074,1082,1094,1141,1152,1156,1165,1167,1186,1190,1199,1209,1218,1273,1289,1314,1326,1335,1336,1339,1408,1446,1450,1464,1486,1542,1547,1570,1602,1617,1661,1673,1677,1684,1695,1711,1717,1724,1759,1780,1789,1804,1817,1833,1835,1850,1861,1862,1863,1868,1874,1889,1892,1900,1904,1955,1979,1980,1985,1986,1988,1989,2005,2025,2043,2049,2062,2140,2142,2169,2181,2185,2210,2214,2273,2305,2317,2347,2350,2356,2367,2370,2378,2397,2406,2408,2447,2450,2517,2525,2547,2565,2596,2665,2689,2701,2726,2732,2749,2802,2807,2815,2831,2839,2869,2967,2969,2971,2999,3009,3016,3019,3023,3040,3054,3081,3090,3096,3101,3128,3132,3141,3183,3184,3190,3207,3223,3244,3248,3256,3263,3266,3287,3307,3310,3339,3346,3349,3354,3396,3407,3416,3422,3433,3451,3457,3489,3525,3526,3531,3534,3551,3576,3582,3650,3681,3690,3740,3743,3752,3775,3815,3837,3856,3873,3874,3897,3931,3951,3959,3970,4003,4022,4041,4058,4066,4068,4075,4080,4114,4121,4122,4123,4143,4185,4191,4200,4205,4214,4226,4262,4325,4393,4400,4454,4474,4479,4481,4499,4523,4616,4620,4628,4632,4638,4660,4678,4712,4717,4722,4736,4755,4778,4786,4788,4795,4805,4810,4858,4863,4867,4887,4893,4896,4932,4933,4935,4944,4966,5021,5039,5044,5064,5075,5088,5101,5103,5104,5129,5179,5183,5211,5222,5228,5254,5262,5272,5281,5291,5294,5295,5325,5332,5346,5372,5412,5415,5441,5450,5520,5558,5590,5593,5604,5630,5631,5650,5651,5689,5721,5728,5732,5777,5779,5808,5811,5839,5846,5848,5865,5866,5868,5880,5882,5895,5939,5956,5982,5988]
  if (tanId.includes(parseInt(nftId))) {
  const tanOption = document.createElement('option');
  tanOption.value = layerImageUrls[36];
  tanOption.textContent = customLayerNames[36];
  layerDropdown.appendChild(tanOption);

  const tanShotOption = document.createElement('option');
  tanShotOption.value = layerImageUrls[37];
  tanShotOption.textContent = customLayerNames[37];
  layerDropdown.appendChild(tanShotOption);

  const tanBottleOption = document.createElement('option');
  tanBottleOption.value = layerImageUrls[56];
  tanBottleOption.textContent = customLayerNames[56];
  layerDropdown.appendChild(tanBottleOption);

  const tanBeerOption = document.createElement('option');
  tanBeerOption.value = layerImageUrls[75];
  tanBeerOption.textContent = customLayerNames[75];
  layerDropdown.appendChild(tanBeerOption);

  const pizzaOption = document.createElement('option');
  pizzaOption.value = layerImageUrls[76]; // Assuming Shot layer URL is the second in the array
  pizzaOption.textContent = customLayerNames[76]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(pizzaOption);

  const ledgerOption = document.createElement('option');
  ledgerOption.value = layerImageUrls[95]; // Assuming Shot layer URL is the second in the array
  ledgerOption.textContent = customLayerNames[95]; // Assuming Shot layer name is the second in the array
  layerDropdown.appendChild(ledgerOption);
}
  layerDropdown.addEventListener('change', function() {
    const selectedLayerImageUrl = layerDropdown.value;
    selectLayer(selectedLayerImageUrl);
  });

  // Clear the existing dropdown list
  const existingDropdown = document.getElementById('layer-dropdown');
  if (existingDropdown) {
    existingDropdown.parentNode.remove();
  }

  dropdownContainer.appendChild(layerDropdown);
  const imageContainer = document.querySelector('.image-container');
  imageContainer.appendChild(dropdownContainer);
}

function selectLayer(imageUrl) {
  const nftContainer = document.getElementById('nftContainer');

  // Remove any existing layer overlay
  const existingOverlay = document.querySelector('.layer-overlay');
  if (existingOverlay) {
    nftContainer.removeChild(existingOverlay);
  }

  // Create a new layer overlay and append it to the nftContainer
  const layerOverlay = document.createElement('img');
  layerOverlay.src = imageUrl;
  layerOverlay.alt = 'Layer Overlay';

  // Apply the appropriate CSS class based on the layer image URL
  if (imageUrl === layerImageUrls[0]) {
    layerOverlay.classList.add('gm-cup-layer');
  } else if (imageUrl === layerImageUrls[1]) {
    layerOverlay.classList.add('shot-layer');
  } else if (imageUrl === layerImageUrls[2]) {
    layerOverlay.classList.add('noise-gm-cup-layer');
  } else if (imageUrl === layerImageUrls[3]) {
    layerOverlay.classList.add('noise-shot-layer');
} else if (imageUrl === layerImageUrls[4]) {
  layerOverlay.classList.add('cheetah-gm-cup-layer');
} else if (imageUrl === layerImageUrls[5]) {
  layerOverlay.classList.add('cheetah-shot-layer');
} else if (imageUrl === layerImageUrls[6]) {
  layerOverlay.classList.add('robot-gm-cup-layer');
} else if (imageUrl === layerImageUrls[7]) {
  layerOverlay.classList.add('robot-shot-layer');
} else if (imageUrl === layerImageUrls[8]) {
  layerOverlay.classList.add('trippy-gm-cup-layer');
} else if (imageUrl === layerImageUrls[9]) {
  layerOverlay.classList.add('trippy-shot-layer');
} else if (imageUrl === layerImageUrls[10]) {
  layerOverlay.classList.add('dmt-gm-cup-layer');
} else if (imageUrl === layerImageUrls[11]) {
  layerOverlay.classList.add('dmt-shot-layer');
} else if (imageUrl === layerImageUrls[12]) {
  layerOverlay.classList.add('death-gm-cup-layer');
} else if (imageUrl === layerImageUrls[13]) {
  layerOverlay.classList.add('death-shot-layer');
} else if (imageUrl === layerImageUrls[14]) {
  layerOverlay.classList.add('zombie-gm-cup-layer');
} else if (imageUrl === layerImageUrls[15]) {
  layerOverlay.classList.add('zombie-shot-layer');
} else if (imageUrl === layerImageUrls[16]) {
  layerOverlay.classList.add('white-gm-cup-layer');
} else if (imageUrl === layerImageUrls[17]) {
  layerOverlay.classList.add('white-shot-layer');
} else if (imageUrl === layerImageUrls[18]) {
  layerOverlay.classList.add('brown-gm-cup-layer');
} else if (imageUrl === layerImageUrls[19]) {
  layerOverlay.classList.add('brown-shot-layer');
} else if (imageUrl === layerImageUrls[20]) {
  layerOverlay.classList.add('brown-gm-cup-layer');
} else if (imageUrl === layerImageUrls[21]) {
  layerOverlay.classList.add('brown-shot-layer');
} else if (imageUrl === layerImageUrls[22]) {
  layerOverlay.classList.add('brown-gm-cup-layer');
} else if (imageUrl === layerImageUrls[23]) {
  layerOverlay.classList.add('brown-shot-layer');
} else if (imageUrl === layerImageUrls[24]) {
  layerOverlay.classList.add('brown-gm-cup-layer');
} else if (imageUrl === layerImageUrls[25]) {
  layerOverlay.classList.add('brown-shot-layer');
} else if (imageUrl === layerImageUrls[26]) {
  layerOverlay.classList.add('brown-gm-cup-layer');
} else if (imageUrl === layerImageUrls[27]) {
  layerOverlay.classList.add('brown-shot-layer');
} else if (imageUrl === layerImageUrls[28]) {
  layerOverlay.classList.add('brown-gm-cup-layer');
} else if (imageUrl === layerImageUrls[29]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[30]) {
  layerOverlay.classList.add('brown-gm-cup-layer');
} else if (imageUrl === layerImageUrls[31]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[32]) {
  layerOverlay.classList.add('brown-gm-cup-layer');
} else if (imageUrl === layerImageUrls[33]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[34]) {
  layerOverlay.classList.add('brown-gm-cup-layer');
} else if (imageUrl === layerImageUrls[35]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[36]) {
  layerOverlay.classList.add('brown-gm-cup-layer');
} else if (imageUrl === layerImageUrls[37]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[38]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[39]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[40]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[41]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[42]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[43]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[44]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[45]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[46]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[47]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[48]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[49]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[50]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[51]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[52]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[53]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[54]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[55]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[56]) {
  layerOverlay.classList.add('brown-shot-layer');
}else if (imageUrl === layerImageUrls[57]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[58]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[59]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[60]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[61]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[62]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[63]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[64]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[65]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[66]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[67]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[68]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[69]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[70]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[71]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[72]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[73]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[74]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[75]) {
  layerOverlay.classList.add('brown-beer-layer');
}else if (imageUrl === layerImageUrls[76]) {
  layerOverlay.classList.add('pizza');
}else if (imageUrl === layerImageUrls[77]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[78]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[79]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[80]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[81]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[82]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[83]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[84]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[85]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[86]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[87]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[88]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[89]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[90]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[91]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[92]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[93]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[94]) {
  layerOverlay.classList.add('ledger');
}else if (imageUrl === layerImageUrls[95]) {
  layerOverlay.classList.add('ledger');
}


  layerOverlay.classList.add('layer-overlay');
  nftContainer.appendChild(layerOverlay);

  // Store the selected layer image URL
  selectedLayerImages.push(imageUrl);
}

function mergeAndDownload() {
  const selectedLayerCount = selectedLayerImages.length;

  if (selectedLayerCount === 0) {
    alert('Please select a layer image');
    return;
  }

  const nftContainer = document.getElementById('nftContainer');

  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Load the NFT image
  const nftImage = new Image();
  nftImage.crossOrigin = 'anonymous';
  const nftIdInput = document.getElementById('nftIdInput');
  const nftId = nftIdInput.value.trim();

  if (nftId === '') {
    alert('Please enter an NFT ID');
    return;
  }

  const nftImageUrl = `https://raw.githubusercontent.com/akh1lsol/Bascdao.net/main/New%20Collection/${nftId}.png`;
  nftImage.onload = function() {
    // Set the canvas size based on the larger dimension of the images
    const canvasSize = Math.max(nftImage.width, nftImage.height);
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Draw the NFT image onto the canvas, centered horizontally and at the bottom
    const nftX = (canvas.width - nftImage.width) / 2;
    const nftY = canvas.height - nftImage.height;
    ctx.drawImage(nftImage, nftX, nftY);

    if (selectedLayerCount > 0) {
      // Load and draw the selected layer image onto the canvas
      const layerImageUrl = selectedLayerImages[selectedLayerCount - 1];
      const layerImage = new Image();
      layerImage.crossOrigin = 'anonymous';
      layerImage.onload = function() {
        if (layerImageUrl === layerImageUrls[0]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[1]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[38]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        } else if (layerImageUrl === layerImageUrls[2]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[3]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[39]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        } else if (layerImageUrl === layerImageUrls[4]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[5]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[40]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        } else if (layerImageUrl === layerImageUrls[6]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[7]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[41]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        } else if (layerImageUrl === layerImageUrls[8]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[9]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[42]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        } else if (layerImageUrl === layerImageUrls[10]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[11]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[43]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        } else if (layerImageUrl === layerImageUrls[12]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[13]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[44]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        } else if (layerImageUrl === layerImageUrls[14]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[15]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[45]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        } else if (layerImageUrl === layerImageUrls[16]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[17]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[46]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[18]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[19]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[47]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[20]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[21]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[48]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[22]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[23]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[49]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[24]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[25]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[50]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[26]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[27]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[51]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[28]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[29]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[52]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[30]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[31]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[53]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[32]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[33]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[54]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[34]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[35]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[55]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[36]) {
          // GM Cup layer
          const gmCupX = (canvas.width - layerImage.width) / 2;
          const gmCupY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, gmCupX, gmCupY);
        } else if (layerImageUrl === layerImageUrls[37]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        } else if (layerImageUrl === layerImageUrls[56]) {
          // Bottle Layer
          const bottleX = canvas.width - layerImage.width - 150;
          const bottleY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, bottleX, bottleY);
        }else if (layerImageUrl === layerImageUrls[57]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[58]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[59]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[60]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[61]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[62]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[63]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[64]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[65]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[66]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[67]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[68]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[69]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[70]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[71]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[72]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[73]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[74]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[75]) {
          // Beer Layer
          const beerX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const beerY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, beerX, beerY);
        }else if (layerImageUrl === layerImageUrls[76]) {
          // Pizza
          const pizzaX = 0; // Aligning the left edge of the layer with the left edge of the canvas
          const pizzaY = canvas.height - layerImage.height; // Aligning the bottom edge of the layer with the bottom edge of the canvas
          ctx.drawImage(layerImage, pizzaX, pizzaY);
        }else if (layerImageUrl === layerImageUrls[77]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[78]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[79]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[80]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[81]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[82]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[83]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[84]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[85]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[86]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[87]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[88]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[89]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[90]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[91]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[92]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[93]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[94]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }else if (layerImageUrl === layerImageUrls[95]) {
          // Shot layer
          const shotX = canvas.width - layerImage.width - 150;
          const shotY = canvas.height - layerImage.height;
          ctx.drawImage(layerImage, shotX, shotY);
        }
        
        // Other layers can be added here
        
        
        // Create a link element for downloading the merged image
        const link = document.createElement('a');
        link.href = canvas.toDataURL(); // Convert the canvas to a data URL
        link.download = 'merged_image.png'; // Set the filename for the downloaded image
        link.click(); // Trigger the download

        // Clean up
        URL.revokeObjectURL(link.href);
      };
      layerImage.onerror = function() {
        // Image failed to load, display error message
        alert('Failed to load layer image.');
      };
      layerImage.src = layerImageUrl;
    }
  };
  nftImage.onerror = function() {
    // Image failed to load, display error message
    alert('Failed to load NFT image.');
  };
  nftImage.src = nftImageUrl;
}

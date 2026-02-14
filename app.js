const priceBtn=document.getElementById('priceBtn');
const settingsModal=document.getElementById('settingsModal');

const vType=document.getElementById('vType');
const vQty=document.getElementById('vQty');
const vSide=document.getElementById('vSide');
const vTypeButtons=document.getElementById('vTypeButtons');
const vQtyButtons=document.getElementById('vQtyButtons');
const vSideButtons=document.getElementById('vSideButtons');
const vLamBtn=document.getElementById('vLamBtn');
const vLamCheck=document.getElementById('vLamCheck');
const vDiscount=document.getElementById('vDiscount');
const vPrice=document.getElementById('vPrice');
const visitBtn=document.getElementById('visitBtn');

const pPaper=document.getElementById('pPaper');
const pColor=document.getElementById('pColor');
const pFormat=document.getElementById('pFormat');
const pQty=document.getElementById('pQty');
const pSide=document.getElementById('pSide');
const pCut=document.getElementById('pCut');
const pCutQuick=document.getElementById('pCutQuick');
const pPaperButtons=document.getElementById('pPaperButtons');
const pColorButtons=document.getElementById('pColorButtons');
const pFormatButtons=document.getElementById('pFormatButtons');
const pSideButtons=document.getElementById('pSideButtons');
const pDiscount=document.getElementById('pDiscount');
const pPrice=document.getElementById('pPrice');
const printBtn=document.getElementById('printBtn');

const wMaterial=document.getElementById('wMaterial');
const wLam=document.getElementById('wLam');
const wEye=document.getElementById('wEye');
const wEyeStep=document.getElementById('wEyeStep');
const wCut=document.getElementById('wCut');
const wMount=document.getElementById('wMount');
const wPreset=document.getElementById('wPreset');
const wWidth=document.getElementById('wWidth');
const wHeight=document.getElementById('wHeight');
const wQty=document.getElementById('wQty');
const wDiscount=document.getElementById('wDiscount');
const wPrice=document.getElementById('wPrice');
const wideBtn=document.getElementById('wideBtn');
const wMaterialButtons=document.getElementById('wMaterialButtons');
const wPresetButtons=document.getElementById('wPresetButtons');
const customSize=document.getElementById('customSize');
const eyeWrap=document.getElementById('eyeWrap');
const eyeStepWrap=document.getElementById('eyeStepWrap');

const lType=document.getElementById('lType');
const lSize=document.getElementById('lSize');
const lSizeWrap=document.getElementById('lSizeWrap');
const lQty=document.getElementById('lQty');
const lQtyLabel=document.getElementById('lQtyLabel');
const lSheetsWrap=document.getElementById('lSheetsWrap');
const lSheets=document.getElementById('lSheets');
const lDiscount=document.getElementById('lDiscount');
const lPrice=document.getElementById('lPrice');
const lamBtn=document.getElementById('lamBtn');
const lTypeButtons=document.getElementById('lTypeButtons');
const lSizeButtons=document.getElementById('lSizeButtons');

const bfType=document.getElementById('bfType');
const bfQty=document.getElementById('bfQty');
const bfSide=document.getElementById('bfSide');
const bfSideWrap=document.getElementById('bfSideWrap');
const bfDiscount=document.getElementById('bfDiscount');
const bfPrice=document.getElementById('bfPrice');
const bfBtn=document.getElementById('bfBtn');
const bfTypeButtons=document.getElementById('bfTypeButtons');
const bfQtyButtons=document.getElementById('bfQtyButtons');
const bfSideButtons=document.getElementById('bfSideButtons');

const sType=document.getElementById('sType');
const sMugWrap=document.getElementById('sMugWrap');
const sMugType=document.getElementById('sMugType');
const sTshirtWrap=document.getElementById('sTshirtWrap');
const sTshirtType=document.getElementById('sTshirtType');
const sBadgeWrap=document.getElementById('sBadgeWrap');
const sBadgeSize=document.getElementById('sBadgeSize');
const sMagQtyWrap=document.getElementById('sMagQtyWrap');
const sMagQty=document.getElementById('sMagQty');
const sQtyWrap=document.getElementById('sQtyWrap');
const sQty=document.getElementById('sQty');
const sMetersWrap=document.getElementById('sMetersWrap');
const sMeters=document.getElementById('sMeters');
const sDiscount=document.getElementById('sDiscount');
const sPrice=document.getElementById('sPrice');
const sBtn=document.getElementById('sBtn');
const sTypeButtons=document.getElementById('sTypeButtons');
const sMugTypeButtons=document.getElementById('sMugTypeButtons');
const sTshirtTypeButtons=document.getElementById('sTshirtTypeButtons');
const sBadgeSizeButtons=document.getElementById('sBadgeSizeButtons');
const sMagQtyButtons=document.getElementById('sMagQtyButtons');

const priceFilm=document.getElementById('priceFilm');
const priceBanner=document.getElementById('priceBanner');
const pricePlastic=document.getElementById('pricePlastic');
const priceLamW=document.getElementById('priceLamW');
const priceEye=document.getElementById('priceEye');
const priceCut=document.getElementById('priceCut');
const priceMount=document.getElementById('priceMount');

const order=document.getElementById('order');
const total=document.getElementById('total');
const orderPanel=document.querySelector('.order');
const orderToggle=document.getElementById('orderToggle');
const orderDetails=document.getElementById('orderDetails');
const copyOrderBtn=document.getElementById('copyOrderBtn');
const designPrice=document.getElementById('designPrice');
const designAddBtn=document.getElementById('designAddBtn');
const designCalcPrice=document.getElementById('designCalcPrice');

let orders=[];
let editIndex=null;

const VISIT_QTY={
  digital:[100,200,300,500],
  digital_mat:[50,100],
  offset:[500,1000,2000,3000,5000,7000]
};

const BF_QTY={
  booklet_a4_offset:[500,1000],
  booklet_a4_digital:[50,100],
  flyer_a6_offset:[1000,2000,3000,5000],
  flyer_a6_digital:[50,100,200,300]
};

const MAG_QTY={
  magnet_acrylic:[10,50,100,150,200],
  magnet_vinyl:[16,48,96,192,384]
};

function num(el, fallback=0){
  const v=parseFloat(el.value);
  return Number.isFinite(v)?v:fallback;
}

function priceInput(id){
  const el=document.getElementById(id);
  return el?num(el,0):0;
}

function rangePrice(ranges, value){
  for(const r of ranges){
    if(value>=r.min && value<=r.max)return r.price;
  }
  return null;
}

const choiceBindings=[];
function setupChoice(selectEl, containerEl, key){
  if(!selectEl || !containerEl)return;
  const binding={selectEl,containerEl,key};
  choiceBindings.push(binding);
  renderChoice(binding);
  containerEl.addEventListener('click',(e)=>{
    const btn=e.target.closest(`[data-choice-${key}]`);
    if(!btn || btn.disabled)return;
    const next=btn.getAttribute(`data-choice-${key}`);
    selectEl.value=next;
    selectEl.dispatchEvent(new Event('change',{bubbles:true}));
    syncChoice(binding);
  });
}

function renderChoice(binding){
  if(!binding)return;
  const {selectEl,containerEl,key}=binding;
  containerEl.innerHTML=[...selectEl.options].map(o=>`<button type="button" class="choice-btn" data-choice-${key}="${o.value}">${o.text}</button>`).join('');
  syncChoice(binding);
}

function syncChoice(binding){
  if(!binding)return;
  const {selectEl,containerEl,key}=binding;
  const current=selectEl.value;
  [...containerEl.querySelectorAll('.choice-btn')].forEach(btn=>{
    const val=btn.getAttribute(`data-choice-${key}`);
    const opt=[...selectEl.options].find(o=>o.value===val);
    btn.classList.toggle('active',val===current);
    btn.disabled=!!(opt && opt.disabled);
  });
}

function syncAllChoices(){
  choiceBindings.forEach(syncChoice);
}

function bindDiscountQuick(){
  const blocks=[...document.querySelectorAll('.discount-quick')];
  blocks.forEach(block=>{
    const inputId=block.dataset.target;
    const input=document.getElementById(inputId);
    if(!input)return;

    const refresh=()=>{
      const raw=String(input.value).replace(',','.');
      const current=Number(raw);
      [...block.querySelectorAll('[data-discount]')].forEach(btn=>{
        btn.classList.toggle('active',Number(btn.dataset.discount)===current);
      });
    };

    block.addEventListener('click',(e)=>{
      const btn=e.target.closest('[data-discount]');
      if(!btn)return;
      input.value=btn.dataset.discount;
      input.dispatchEvent(new Event('input',{bubbles:true}));
      refresh();
    });

    input.addEventListener('input',refresh);
    input.addEventListener('change',refresh);
    refresh();
  });
}

function bindPrintCutQuick(){
  if(!pCutQuick || !pCut)return;
  const btns=[...pCutQuick.querySelectorAll('[data-pcut]')];
  const refresh=()=>{
    const current=Number(String(pCut.value).replace(',','.'));
    btns.forEach(btn=>btn.classList.toggle('active',Number(btn.dataset.pcut)===current));
  };
  pCutQuick.addEventListener('click',(e)=>{
    const btn=e.target.closest('[data-pcut]');
    if(!btn)return;
    pCut.value=btn.dataset.pcut;
    pCut.dispatchEvent(new Event('input',{bubbles:true}));
    refresh();
  });
  pCut.addEventListener('input',refresh);
  pCut.addEventListener('change',refresh);
  refresh();
}

function bindDesignService(){
  if(!designPrice || !designAddBtn)return;
  const quick=[...document.querySelectorAll('[data-design]')];

  const refresh=()=>{
    const current=Number(String(designPrice.value).replace(',','.'));
    quick.forEach(btn=>btn.classList.toggle('active',Number(btn.dataset.design)===current));
    if(designCalcPrice){
      designCalcPrice.innerText=current>0?`Цена: ${Math.round(current)} ₽`:'Цена: -';
    }
    designAddBtn.disabled=!(current>0);
  };

  quick.forEach(btn=>{
    btn.addEventListener('click',()=>{
      designPrice.value=btn.dataset.design;
      refresh();
    });
  });

  designPrice.addEventListener('input',refresh);
  designPrice.addEventListener('change',refresh);
  designAddBtn.addEventListener('click',saveDesign);
  refresh();
}

function saveDesign(){
  if(!designPrice)return;
  const price=Math.round(num(designPrice,0));
  if(price<=0)return;
  saveItem({type:'design',title:'Дизайн',desc:'Услуга дизайна',price,params:{price}});
}

const tabButtons=[...document.querySelectorAll('.tab-btn')];
const tabPanels=[...document.querySelectorAll('.tab-panel')];
function switchTab(name){
  tabButtons.forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  tabPanels.forEach(p=>p.classList.toggle('active',p.id===`tab-${name}`));
}

function openSettings(){
  if(settingsModal)settingsModal.classList.add('active');
}

function closeSettings(){
  if(settingsModal)settingsModal.classList.remove('active');
}

function toggleCustom(){
  customSize.classList.toggle('hidden',wPreset.value!=='custom');
}

function getVisitPriceType(){
  if(vType.value==='offset')return 'offset';
  return vLamCheck.checked?'digital_mat':'digital';
}

function syncVisitButtons(){
  const type=vType.value;
  const side=vSide.value;
  [...vTypeButtons.querySelectorAll('.choice-btn')].forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.vtype===type);
  });
  [...vSideButtons.querySelectorAll('.choice-btn')].forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.vside===side);
  });
  [...vQtyButtons.querySelectorAll('.choice-btn')].forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.vqty===vQty.value);
  });
  if(vLamBtn){
    vLamBtn.classList.toggle('active',!!vLamCheck.checked);
    vLamBtn.disabled=!!vLamCheck.disabled;
  }
}

function populateVisitQty(){
  const type=getVisitPriceType();
  const list=VISIT_QTY[type]||[];
  const prev=vQty.value;
  vQty.innerHTML=list.map(q=>`<option value="${q}">${q}</option>`).join('');
  vQty.value=list.includes(parseInt(prev,10))?prev:(list[0]?String(list[0]):'');
  vQtyButtons.innerHTML=list.map(q=>`<button type="button" class="choice-btn" data-vqty="${q}">${q}</button>`).join('');
  const isOffset=(type==='offset');
  vSide.disabled=isOffset;
  vLamCheck.disabled=(vType.value==='offset');
  if(vType.value==='offset')vLamCheck.checked=false;
  [...vSideButtons.querySelectorAll('.choice-btn')].forEach(btn=>{btn.disabled=isOffset;});
  syncVisitButtons();
}

function computeVisitPrice(){
  const type=getVisitPriceType();
  const qty=parseInt(vQty.value,10);
  let base=null;
  if(type==='offset'){
    base=priceInput(`vO${qty}`);
  }else{
    const side=vSide.value;
    if(type==='digital')base=priceInput(`vD${qty}${side==='single'?'S':'D'}`);
    if(type==='digital_mat')base=priceInput(`vLM${qty}${side==='single'?'S':'D'}`);
  }
  if(!base)return null;
  return Math.round(base*(1+(num(vDiscount,0)/100)));
}

function updatePrintControls(){
  const paper=pPaper.value;
  const a3Option=[...pFormat.options].find(o=>o.value==='A3');
  if(paper==='80'){
    pColor.disabled=false;
    if(a3Option)a3Option.disabled=true;
    if(pFormat.value==='A3')pFormat.value='A4';
  }else{
    pColor.value='color';
    pColor.disabled=true;
    if(a3Option)a3Option.disabled=false;
  }
  syncAllChoices();
}

function getPrintPricePerSide(){
  const qty=parseInt(pQty.value,10);
  if(!qty || qty<1)return null;
  const format=pFormat.value;
  const paper=pPaper.value;
  const color=pColor.value;

  if(paper==='80'){
    if(format!=='A4')return null;
    if(color==='bw'){
      return rangePrice([
        {min:1,max:10,price:priceInput('p80_1_10_bw')},
        {min:11,max:50,price:priceInput('p80_11_50_bw')},
        {min:51,max:100,price:priceInput('p80_51_100_bw')},
        {min:101,max:500,price:priceInput('p80_101_500_bw')}
      ],qty);
    }
    return rangePrice([
      {min:1,max:10,price:priceInput('p80_1_10_c')},
      {min:11,max:50,price:priceInput('p80_11_50_c')},
      {min:51,max:100,price:priceInput('p80_51_100_c')},
      {min:101,max:500,price:priceInput('p80_101_500_c')}
    ],qty);
  }

  if(paper==='115'){
    if(color!=='color')return null;
    if(format==='A4'){
      return rangePrice([
        {min:1,max:4,price:priceInput('p115_a4_1_4')},
        {min:5,max:20,price:priceInput('p115_a4_5_20')},
        {min:21,max:100,price:priceInput('p115_a4_20_100')},
        {min:101,max:500,price:priceInput('p115_a4_101_500')}
      ],qty);
    }
    return rangePrice([
      {min:1,max:2,price:priceInput('p115_a3_1_2')},
      {min:3,max:20,price:priceInput('p115_a3_3_20')},
      {min:21,max:100,price:priceInput('p115_a3_20_100')},
      {min:101,max:500,price:priceInput('p115_a3_101_500')}
    ],qty);
  }

  if(paper==='250'){
    if(color!=='color')return null;
    if(format==='A4'){
      return rangePrice([
        {min:1,max:4,price:priceInput('p250_a4_1_4')},
        {min:5,max:20,price:priceInput('p250_a4_5_20')},
        {min:21,max:500,price:priceInput('p250_a4_21_500')}
      ],qty);
    }
    return rangePrice([
      {min:1,max:2,price:priceInput('p250_a3_1_2')},
      {min:3,max:20,price:priceInput('p250_a3_3_20')},
      {min:21,max:500,price:priceInput('p250_a3_21_500')}
    ],qty);
  }

  return null;
}

function computePrintPrice(){
  const perSide=getPrintPricePerSide();
  if(perSide===null)return null;
  const qty=parseInt(pQty.value,10);
  const sides=num(pSide,1);
  const printBase=perSide*qty*sides;
  const cutAdd=Math.max(0,num(pCut,0));
  return Math.round((printBase+cutAdd)*(1+(num(pDiscount,0)/100)));
}


function updateLaminationControls(){
  const type=lType.value;
  const isSpiral=(type==='spiral_plastic' || type==='spiral_metal');
  lSizeWrap.classList.toggle('hidden',type==='hard_cover');
  lSize.disabled=(type==='hard_cover');
  lSheetsWrap.classList.toggle('hidden',!isSpiral);
  lQtyLabel.textContent=isSpiral?'Количество изделий':'Количество';
  syncAllChoices();
}
function computeLaminationPrice(){
  const type=lType.value;
  const qty=Math.max(1,parseInt(lQty.value,10)||1);
  const sheets=Math.max(1,parseInt(lSheets.value,10)||1);
  const size=lSize.value;
  let per=null;

  if(type==='lam_gloss'){
    if(size==='ltA4'){
      per=rangePrice([
        {min:1,max:10,price:priceInput('lG_ltA4_1_10')},
        {min:11,max:999999,price:priceInput('lG_ltA4_10p')}
      ],qty);
    }else{
      const suf=size==='A4'?'A4':'A3';
      per=rangePrice([
        {min:1,max:10,price:priceInput(`lG_1_10_${suf}`)},
        {min:11,max:30,price:priceInput(`lG_11_30_${suf}`)},
        {min:31,max:50,price:priceInput(`lG_31_50_${suf}`)},
        {min:51,max:999999,price:priceInput(`lG_50p_${suf}`)}
      ],qty);
    }
    if(per===null)return null;
    return Math.round(per*qty*(1+(num(lDiscount,0)/100)));
  }

  if(type==='lam_matte'){
    if(size==='ltA4')return null;
    const suf=size==='A4'?'A4':'A3';
    per=rangePrice([
      {min:1,max:10,price:priceInput(`lM_1_10_${suf}`)},
      {min:11,max:50,price:priceInput(`lM_11_50_${suf}`)},
      {min:51,max:999999,price:priceInput(`lM_50p_${suf}`)}
    ],qty);
    if(per===null)return null;
    return Math.round(per*qty*(1+(num(lDiscount,0)/100)));
  }

  if(type==='spiral_plastic'){
    if(size==='ltA4')return null;
    const suf=size==='A4'?'A4':'A3';
    per=rangePrice([
      {min:1,max:50,price:priceInput(`spP_0_50_${suf}`)},
      {min:51,max:100,price:priceInput(`spP_50_100_${suf}`)},
      {min:101,max:200,price:priceInput(`spP_100_200_${suf}`)},
      {min:201,max:300,price:priceInput(`spP_200_300_${suf}`)}
    ],sheets);
    if(per===null)return null;
    return Math.round(per*qty*(1+(num(lDiscount,0)/100)));
  }

  if(type==='spiral_metal'){
    if(size==='ltA4')return null;
    const suf=size==='A4'?'A4':'A3';
    per=rangePrice([
      {min:1,max:50,price:priceInput(`spM_0_50_${suf}`)},
      {min:51,max:100,price:priceInput(`spM_50_100_${suf}`)}
    ],sheets);
    if(per===null)return null;
    return Math.round(per*qty*(1+(num(lDiscount,0)/100)));
  }

  if(type==='hard_cover'){
    per=priceInput('hard_cover');
    if(!per)return null;
    return Math.round(per*qty*(1+(num(lDiscount,0)/100)));
  }

  return null;
}

function populateBfQty(){
  const list=BF_QTY[bfType.value]||[];
  const current=parseInt(bfQty.value,10);
  bfQty.innerHTML=list.map(q=>`<option value="${q}">${q}</option>`).join('');
  if(list.includes(current))bfQty.value=String(current);
  else bfQty.value=list[0]?String(list[0]):'';
  renderChoice(choiceBindings.find(b=>b.selectEl===bfQty));
  const isFlyerOffset=(bfType.value==='flyer_a6_offset');
  const isFlyerDigital=(bfType.value==='flyer_a6_digital');
  bfSideWrap.classList.toggle('hidden',!(isFlyerOffset||isFlyerDigital));
  bfSide.disabled=!(isFlyerOffset||isFlyerDigital);
  [...bfSideButtons.querySelectorAll('.choice-btn')].forEach(btn=>{btn.disabled=bfSide.disabled;});
  syncAllChoices();
}

function computeBfPrice(){
  const type=bfType.value;
  const qty=parseInt(bfQty.value,10);
  let base=null;
  if(type==='booklet_a4_offset')base=priceInput(`bOff_${qty}`);
  if(type==='booklet_a4_digital')base=priceInput(`bDig_${qty}`);
  if(type==='flyer_a6_offset'){
    if(qty===5000){
      base=bfSide.value==='double'?priceInput('fOff_5000_44'):priceInput('fOff_5000_40');
    }else{
      base=priceInput(`fOff_${qty}`);
    }
  }
  if(type==='flyer_a6_digital')base=priceInput(`fDig_${qty}_${bfSide.value==='single'?'S':'D'}`);
  if(!base)return null;
  return Math.round(base*(1+(num(bfDiscount,0)/100)));
}

function updateSouvenirControls(){
  const t=sType.value;
  sMugWrap.classList.toggle('hidden',t!=='mug');
  sTshirtWrap.classList.toggle('hidden',t!=='tshirt');
  sBadgeWrap.classList.toggle('hidden',t!=='badge');
  sMagQtyWrap.classList.toggle('hidden',!(t==='magnet_acrylic'||t==='magnet_vinyl'));
  sQtyWrap.classList.toggle('hidden',t==='uvdtf' || t==='magnet_acrylic' || t==='magnet_vinyl');
  sMetersWrap.classList.toggle('hidden',t!=='uvdtf');

  if(t==='magnet_acrylic' || t==='magnet_vinyl'){
    const list=MAG_QTY[t]||[];
    const current=parseInt(sMagQty.value,10);
    sMagQty.innerHTML=list.map(q=>`<option value="${q}">${q}</option>`).join('');
    if(list.includes(current))sMagQty.value=String(current);
    else sMagQty.value=list[0]?String(list[0]):'';
    renderChoice(choiceBindings.find(b=>b.selectEl===sMagQty));
  }
  syncAllChoices();
}

function computeSouvenirPrice(){
  const t=sType.value;
  const qty=Math.max(1,parseInt(sQty.value,10)||1);
  let total=null;

  if(t==='mug'){
    const type=sMugType.value;
    let per=null;
    if(type==='white'){
      per=rangePrice([
        {min:1,max:1,price:priceInput('mugW_1')},
        {min:4,max:10,price:priceInput('mugW_4_10')},
        {min:11,max:20,price:priceInput('mugW_10_20')},
        {min:21,max:50,price:priceInput('mugW_20_50')},
        {min:51,max:999999,price:priceInput('mugW_50p')}
      ],qty);
    }
    if(type==='color'){
      if(qty!==1)return null;
      per=priceInput('mugC_1');
    }
    if(type==='chameleon'){
      if(qty!==1)return null;
      per=priceInput('mugCh_1');
    }
    if(!per)return null;
    total=per*qty;
  }

  if(t==='plate'){
    const per=priceInput('plate_1');
    if(!per)return null;
    total=per*qty;
  }

  if(t==='tshirt'){
    if(qty>10)return null;
    let per=null;
    if(sTshirtType.value==='sub_1')per=priceInput('tshirt_sub_1');
    if(sTshirtType.value==='sub_2')per=priceInput('tshirt_sub_2');
    if(sTshirtType.value==='dtf_no')per=priceInput('tshirt_dtf_no');
    if(sTshirtType.value==='dtf_with')per=priceInput('tshirt_dtf_with');
    if(!per)return null;
    total=per*qty;
  }

  if(t==='magnet_acrylic'){
    const q=parseInt(sMagQty.value,10);
    const per=priceInput(`magA_${q}`);
    if(!per)return null;
    total=per*q;
  }

  if(t==='magnet_vinyl'){
    const q=parseInt(sMagQty.value,10);
    const per=priceInput(`magV_${q}`);
    if(!per)return null;
    total=per*q;
  }

  if(t==='badge'){
    const size=sBadgeSize.value;
    const per=rangePrice([
      {min:1,max:3,price:priceInput(`badge${size}_1_3`)},
      {min:4,max:10,price:priceInput(`badge${size}_4_10`)},
      {min:11,max:19,price:priceInput(`badge${size}_11_19`)},
      {min:20,max:99,price:priceInput(`badge${size}_20_99`)},
      {min:100,max:299,price:priceInput(`badge${size}_100_299`)},
      {min:300,max:499,price:priceInput(`badge${size}_300_499`)},
      {min:500,max:999,price:priceInput(`badge${size}_500_999`)},
    ],qty);
    if(!per)return null;
    total=per*qty;
  }

  if(t==='uvdtf'){
    const meters=Math.max(0,parseFloat(sMeters.value)||0);
    const per=priceInput('uvdtf_per_m');
    const min=priceInput('uvdtf_min');
    if(!per || meters<=0)return null;
    total=Math.max(per*meters,min);
  }

  if(total===null)return null;
  return Math.round(total*(1+(num(sDiscount,0)/100)));
}

function getWideDims(){
  if(wPreset.value==='custom')return {w:num(wWidth,1),h:num(wHeight,1)};
  if(wPreset.value==='A0')return {w:0.841,h:1.189};
  if(wPreset.value==='A1')return {w:0.594,h:0.841};
  if(wPreset.value==='A2')return {w:0.420,h:0.594};
  return {w:1,h:1};
}

function computeWidePrice(){
  const dims=getWideDims();
  const area=dims.w*dims.h;
  const per=2*(dims.w+dims.h);
  let matPrice=num(priceFilm);
  if(wMaterial.value==='banner')matPrice=num(priceBanner);
  if(wMaterial.value==='plastic')matPrice=num(pricePlastic);
  let wBase=area*matPrice*num(wQty,0);
  if(wLam.checked)wBase+=area*num(priceLamW)*num(wQty,0);
  if(wMaterial.value==='banner'){
    eyeWrap.style.display='block';
    eyeStepWrap.style.display='block';
    if(wEye.checked){
      const step=Math.max(num(wEyeStep,40),1);
      wBase+=Math.ceil((per*100)/step)*num(priceEye)*num(wQty,0);
    }
  }else{
    wEye.checked=false;
    eyeWrap.style.display='none';
    eyeStepWrap.style.display='none';
  }
  if(wCut.checked)wBase+=per*num(priceCut)*num(wQty,0);
  if(wMount.checked)wBase+=per*num(priceMount)*num(wQty,0);
  return Math.round(wBase*(1+(num(wDiscount,0)/100)));
}

function calc(){
  syncVisitButtons();
  syncAllChoices();
  const visitPrice=computeVisitPrice();
  if(visitPrice===null){vPrice.innerText='Цена: -';visitBtn.disabled=true;}else{vPrice.innerText='Цена: '+visitPrice+' ₽';visitBtn.disabled=false;}

  const printPrice=computePrintPrice();
  if(printPrice===null){pPrice.innerText='Цена: -';printBtn.disabled=true;}else{pPrice.innerText='Цена: '+printPrice+' ₽';printBtn.disabled=false;}

  const lamPrice=computeLaminationPrice();
  if(lamPrice===null){lPrice.innerText='Цена: -';lamBtn.disabled=true;}else{lPrice.innerText='Цена: '+lamPrice+' ₽';lamBtn.disabled=false;}

  const bfPriceVal=computeBfPrice();
  if(bfPriceVal===null){bfPrice.innerText='Цена: -';bfBtn.disabled=true;}else{bfPrice.innerText='Цена: '+bfPriceVal+' ₽';bfBtn.disabled=false;}

  const sPriceVal=computeSouvenirPrice();
  if(sPriceVal===null){sPrice.innerText='Цена: -';sBtn.disabled=true;}else{sPrice.innerText='Цена: '+sPriceVal+' ₽';sBtn.disabled=false;}

  wPrice.innerText='Цена: '+computeWidePrice()+' ₽';
}

function saveVisit(){
  const price=computeVisitPrice();
  if(price===null)return;
  const type=getVisitPriceType();
  const isOffset=(type==='offset');
  const isLam=(type==='digital_mat');
  const qty=vQty.value;
  const sideLabel=(vSide.value==='single'?'4+0':'4+4');
  let title='Визитки';
  if(isOffset)title='Визитки (офсет)';
  if(!isOffset && isLam)title='Визитки (цифровая, мат. ламинация)';
  if(!isOffset && !isLam)title='Визитки (цифровая)';
  const desc=isOffset?`${qty} шт`:`${qty} шт, ${sideLabel}`;
  saveItem({type:'visit',title,desc,price,params:{type,qty,side:vSide.value,lam:isLam,disc:vDiscount.value}});
}

function savePrint(){
  const price=computePrintPrice();
  if(price===null)return;
  const paperLabel=pPaper.options[pPaper.selectedIndex].text;
  const colorLabel=(pColor.value==='bw'?'ч/б':'цветная');
  const cutVal=Math.max(0,num(pCut,0));
  const cutLabel=cutVal>0?`, резка: ${Math.round(cutVal)} ₽`:'';
  const desc=`${paperLabel}, ${pFormat.value}, ${colorLabel}, ${pQty.value} шт${cutLabel}`;
  saveItem({type:'print',title:'Печать',desc,price,params:{paper:pPaper.value,color:pColor.value,format:pFormat.value,qty:pQty.value,side:pSide.value,cut:pCut.value,disc:pDiscount.value}});
}


function saveWide(){
  const price=computeWidePrice();
  saveItem({type:'wide',title:'Широкоформат',desc:`${wMaterial.options[wMaterial.selectedIndex].text}, ${wQty.value} шт`,price,
    params:{material:wMaterial.value,preset:wPreset.value,w:wWidth.value,h:wHeight.value,qty:wQty.value,disc:wDiscount.value,
    lam:wLam.checked,eye:wEye.checked,eyeStep:wEyeStep.value,cut:wCut.checked,mount:wMount.checked}});
}
function saveLam(){
  const price=computeLaminationPrice();
  if(price===null)return;
  const qty=lQty.value;
  const sizeLabel=lType.value==='hard_cover'?'':`, ${lSize.options[lSize.selectedIndex].text}`;
  const sheetsLabel=lSheetsWrap.classList.contains('hidden')?'':`, листов: ${lSheets.value}`;
  const title=lType.options[lType.selectedIndex].text;
  const desc=`${qty} шт${sizeLabel}${sheetsLabel}`;
  saveItem({type:'lam',title,desc,price,params:{type:lType.value,qty,size:lSize.value,sheets:lSheets.value,disc:lDiscount.value}});
}

function saveBf(){
  const price=computeBfPrice();
  if(price===null)return;
  const title=bfType.options[bfType.selectedIndex].text;
  const sideLabel=bfSide.value==='single'?'4+0':'4+4';
  const desc=`${bfQty.value} шт${bfSideWrap.classList.contains('hidden')?'':`, ${sideLabel}`}`;
  saveItem({type:'bf',title,desc,price,params:{type:bfType.value,qty:bfQty.value,side:bfSide.value,disc:bfDiscount.value}});
}

function saveSouvenir(){
  const price=computeSouvenirPrice();
  if(price===null)return;
  const title=sType.options[sType.selectedIndex].text;
  let desc='';
  if(sType.value==='mug')desc=`${sMugType.options[sMugType.selectedIndex].text}, ${sQty.value} шт`;
  if(sType.value==='plate')desc=`${sQty.value} шт`;
  if(sType.value==='tshirt')desc=`${sTshirtType.options[sTshirtType.selectedIndex].text}, ${sQty.value} шт`;
  if(sType.value==='magnet_acrylic')desc=`${sMagQty.value} шт`;
  if(sType.value==='magnet_vinyl')desc=`${sMagQty.value} шт`;
  if(sType.value==='badge')desc=`${sBadgeSize.value} мм, ${sQty.value} шт`;
  if(sType.value==='uvdtf')desc=`${sMeters.value} пог.м`;
  saveItem({type:'souvenir',title,desc,price,params:{t:sType.value}});
}

function saveItem(item){
  if(editIndex!==null)orders[editIndex]=item;else orders.push(item);
  render();
  editIndex=null;
  visitBtn.innerText=printBtn.innerText=wideBtn.innerText='Добавить';
  lamBtn.innerText=bfBtn.innerText=sBtn.innerText='Добавить';
  if(designAddBtn)designAddBtn.innerText='Добавить';
}

function editItem(i){
  const o=orders[i];
  editIndex=i;
  if(o.type==='visit'){
    switchTab('visit');
    vType.value=(o.params.type==='offset'?'offset':'digital');
    vLamCheck.checked=!!o.params.lam;
    populateVisitQty();
    vQty.value=o.params.qty;
    vSide.value=o.params.side;
    syncVisitButtons();
    vDiscount.value=o.params.disc;
    visitBtn.innerText='Изменить';
  }
  if(o.type==='print'){
    switchTab('print');
    pPaper.value=o.params.paper;
    pColor.value=o.params.color;
    updatePrintControls();
    pFormat.value=o.params.format;
    pQty.value=o.params.qty;
    pSide.value=o.params.side;
      if(pCut)pCut.value=(o.params.cut??0);
      pDiscount.value=o.params.disc;
    printBtn.innerText='Изменить';
  }
  if(o.type==='wide'){
    switchTab('wide');
    const p=o.params;
    wMaterial.value=p.material;
    wPreset.value=p.preset;
    wWidth.value=p.w;
    wHeight.value=p.h;
    wQty.value=p.qty;
    wDiscount.value=p.disc;
    wLam.checked=p.lam;
    wEye.checked=p.eye;
    wEyeStep.value=p.eyeStep;
    wCut.checked=p.cut;
    wMount.checked=p.mount;
    toggleCustom();
    wideBtn.innerText='Изменить';
  }
  if(o.type==='design'){
    switchTab('design');
    if(designPrice)designPrice.value=o.params.price;
    if(designAddBtn)designAddBtn.innerText='Изменить';
  }
  calc();
}

function delItem(i){
  orders.splice(i,1);
  render();
}

function buildOrderCopyText(){
  const lines=['Заказ:'];
  orders.forEach((o,i)=>{
    lines.push(`${i+1}. ${o.title} — ${o.desc} — ${o.price} ₽`);
  });
  lines.push('');
  lines.push(`Итого: ${total.innerText}`);
  return lines.join('\n');
}

async function copyOrderText(){
  if(!orders.length)return;
  const text=buildOrderCopyText();
  let ok=false;

  try{
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(text);
      ok=true;
    }
  }catch(_e){}

  if(!ok){
    const ta=document.createElement('textarea');
    ta.value=text;
    ta.style.position='fixed';
    ta.style.opacity='0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try{ok=document.execCommand('copy');}catch(_e){ok=false;}
    document.body.removeChild(ta);
  }

  if(copyOrderBtn){
    const prev=copyOrderBtn.innerText;
    copyOrderBtn.innerText=ok?'Скопировано':'Не удалось скопировать';
    setTimeout(()=>{copyOrderBtn.innerText=prev;},1200);
  }
}
function updateOrderToggle(){
  if(!orderToggle || !orderPanel)return;
  const isCollapsed=orderPanel.classList.contains('collapsed');
  orderToggle.innerText=`${isCollapsed?'Показать':'Скрыть'} позиции (${orders.length})`;
}

function bindOrderToggle(){
  if(!orderToggle || !orderPanel || !orderDetails)return;
  orderToggle.addEventListener('click',()=>{
    orderPanel.classList.toggle('collapsed');
    updateOrderToggle();
  });
  updateOrderToggle();
}
function render(){
  order.innerHTML='';
  let sum=0;
  orders.forEach((o,i)=>{
    sum+=o.price;
    order.innerHTML+=`<div class="order-row"><div>${o.title}<br><small>${o.desc}</small></div><div>${o.price} ₽</div><div><span class=edit onclick=editItem(${i})>✎</span><span class=del onclick=delItem(${i})>✖</span></div></div>`;
  });
  total.innerText=sum+' ₽';
  if(copyOrderBtn)copyOrderBtn.disabled=orders.length===0;
  updateOrderToggle();
}

function bindCalc(){
  const inputs=[vType,vQty,vSide,vLamCheck,vDiscount,pPaper,pColor,pFormat,pQty,pSide,pCut,pDiscount,wMaterial,wLam,wEye,wEyeStep,wCut,wMount,wPreset,wWidth,wHeight,wQty,wDiscount,
    lType,lSize,lQty,lSheets,lDiscount,bfType,bfQty,bfSide,bfDiscount,sType,sMugType,sTshirtType,sBadgeSize,sMagQty,sQty,sMeters,sDiscount,
    priceFilm,priceBanner,pricePlastic,priceLamW,priceEye,priceCut,priceMount];
  inputs.forEach(el=>{if(!el)return;el.addEventListener('input',calc);el.addEventListener('change',calc);});

  vType.addEventListener('change',()=>{populateVisitQty();calc();});
  vLamCheck.addEventListener('change',()=>{populateVisitQty();calc();});
  if(vLamBtn){
    vLamBtn.addEventListener('click',()=>{
      if(vLamBtn.disabled)return;
      vLamCheck.checked=!vLamCheck.checked;
      populateVisitQty();
      calc();
    });
  }
  vTypeButtons.addEventListener('click',(e)=>{
    const btn=e.target.closest('[data-vtype]');
    if(!btn)return;
    vType.value=btn.dataset.vtype;
    populateVisitQty();
    calc();
  });
  vSideButtons.addEventListener('click',(e)=>{
    const btn=e.target.closest('[data-vside]');
    if(!btn || btn.disabled)return;
    vSide.value=btn.dataset.vside;
    syncVisitButtons();
    calc();
  });
  vQtyButtons.addEventListener('click',(e)=>{
    const btn=e.target.closest('[data-vqty]');
    if(!btn)return;
    vQty.value=btn.dataset.vqty;
    syncVisitButtons();
    calc();
  });
  pPaper.addEventListener('change',()=>{updatePrintControls();calc();});
  lType.addEventListener('change',()=>{updateLaminationControls();calc();});
  bfType.addEventListener('change',()=>{populateBfQty();calc();});
  sType.addEventListener('change',()=>{updateSouvenirControls();calc();});

  const priceInputs=[...settingsModal.querySelectorAll('input')];
  priceInputs.forEach(el=>el.addEventListener('input',calc));
}

setupChoice(pPaper,pPaperButtons,'ppaper');
setupChoice(pColor,pColorButtons,'pcolor');
setupChoice(pFormat,pFormatButtons,'pformat');
setupChoice(pSide,pSideButtons,'pside');
setupChoice(wMaterial,wMaterialButtons,'wmaterial');
setupChoice(wPreset,wPresetButtons,'wpreset');
setupChoice(lType,lTypeButtons,'ltype');
setupChoice(lSize,lSizeButtons,'lsize');
setupChoice(bfType,bfTypeButtons,'bftype');
setupChoice(bfQty,bfQtyButtons,'bfqty');
setupChoice(bfSide,bfSideButtons,'bfside');
setupChoice(sType,sTypeButtons,'stype');
setupChoice(sMugType,sMugTypeButtons,'smug');
setupChoice(sTshirtType,sTshirtTypeButtons,'stshirt');
setupChoice(sBadgeSize,sBadgeSizeButtons,'sbadge');
setupChoice(sMagQty,sMagQtyButtons,'smagqty');

populateVisitQty();
updatePrintControls();
updateLaminationControls();
populateBfQty();
updateSouvenirControls();

tabButtons.forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
if(priceBtn)priceBtn.addEventListener('click',openSettings);
if(settingsModal){
  settingsModal.addEventListener('click',(e)=>{if(e.target===settingsModal)closeSettings();});
}

switchTab('visit');
bindCalc();
bindDiscountQuick();
bindPrintCutQuick();
bindDesignService();
bindOrderToggle();
if(copyOrderBtn)copyOrderBtn.addEventListener('click',copyOrderText);
calc();

window.switchTab=switchTab;
window.openSettings=openSettings;
window.closeSettings=closeSettings;






















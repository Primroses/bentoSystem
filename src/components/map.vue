<template>
<div>
  <input checked type="radio" id="radio-1" name="radio-1-set" class="regular-radio"/>  
  <label for="radio-1"></label>  
  <label class="inputlabel" for="radio-1">微信支付</label> 
  <input type="radio" id="radio-2" name="radio-2-set" class="regular-radio"> 
  <label for="radio-2"></label>  
  <label class="inputlabel" for="radio-2">支付宝支付</label> 
</div>
</template>
<script>
export default {
  data() {

  },
  methods: {

  }
};
</script>

<style>
 .regular-radio {  
    display: none;  
}  
  
.regular-radio + label {  
    -webkit-appearance: none;  
    background-color: RGB(248,248,249);  
    padding: 9px;  
    border-radius: 50px;  
    display: inline-block;  
    position: relative;  
}  
  
.regular-radio:checked + label:after {  
    content: ' ';  
    width: 12px;  
    height: 12px;  
    border-radius: 50px;  
    position: absolute;  
    top: 3px;  
    background: #E72F17;  
    text-shadow: 0px;  
    left: 3px;  
    font-size: 32px;  
}  
  
.regular-radio:checked + label {  
    background-color: #e9ecee;  
}  
</style>
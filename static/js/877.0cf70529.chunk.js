"use strict";(self.webpackChunktest_ui=self.webpackChunktest_ui||[]).push([[877],{28877:function(n,r,t){t.a(n,(async function(n,e){try{t.r(r),t.d(r,{Hash:function(){return _.kb},Instruction:function(){return _.vr},Instructions:function(){return _.td},Message:function(){return _.v0},Pubkey:function(){return _.Yb},SystemInstruction:function(){return _.vU},__wbg_buffer_7af23f65f6c64548:function(){return _.EF},__wbg_call_ae78342adc33730a:function(){return _._3},__wbg_debug_fda1f49ea6af7a1d:function(){return _.Z1},__wbg_done_040f966faa9a72b3:function(){return _.Zn},__wbg_error_09919627ac0992f5:function(){return _.gk},__wbg_error_8ff19d586a987aef:function(){return _.pt},__wbg_get_a9cab131e3152c49:function(){return _.Rb},__wbg_info_c8f1b00be4ef10bc:function(){return _.g5},__wbg_instanceof_Uint8Array_edb92795fc0c63b4:function(){return _.Cp},__wbg_instruction_new:function(){return _.EL},__wbg_isArray_6721f2e508996340:function(){return _._8},__wbg_iterator_4832ef1f15b0382b:function(){return _.vz},__wbg_length_0acb1cf9bbaf8519:function(){return _.Oo},__wbg_log_e8ba7b992c7ad0eb:function(){return _.kq},__wbg_new_693216e109162396:function(){return _.Ih},__wbg_new_94fb1279cf6afea5:function(){return _.j1},__wbg_new_cc9018bd6f283b6f:function(){return _.cb},__wbg_newwithlength_e80fb11cf19c1628:function(){return _.Yr},__wbg_next_bf3d83fc18df496e:function(){return _.ID},__wbg_next_cabb70b365520721:function(){return _.Ge},__wbg_pubkey_new:function(){return _.bJ},__wbg_push_40c6a90f1805aa90:function(){return _.JX},__wbg_set_561aac756158708c:function(){return _.GW},__wbg_set_f25e869e4565d2a2:function(){return _.Ip},__wbg_stack_0ddaca5d1abfb52f:function(){return _.yq},__wbg_value_419afbd9b9574c4c:function(){return _.fg},__wbg_values_b1b9e8c63dbe01c2:function(){return _.PN},__wbg_warn_0227db1aa6989248:function(){return _.lX},__wbindgen_debug_string:function(){return _.fY},__wbindgen_is_function:function(){return _.o$},__wbindgen_is_object:function(){return _.Wl},__wbindgen_is_undefined:function(){return _.XP},__wbindgen_json_parse:function(){return _.t$},__wbindgen_json_serialize:function(){return _.r1},__wbindgen_memory:function(){return _.oH},__wbindgen_number_get:function(){return _.M1},__wbindgen_number_new:function(){return _.pT},__wbindgen_object_drop_ref:function(){return _.ug},__wbindgen_string_get:function(){return _.qt},__wbindgen_string_new:function(){return _.h4},__wbindgen_throw:function(){return _.Or},claim_address:function(){return _.V_},fee_collector_address:function(){return _.SQ},guardian_set_address:function(){return _.hh},init:function(){return _.S1},parse_guardian_set:function(){return _.MK},parse_posted_message:function(){return _.hs},parse_state:function(){return _.kc},parse_vaa:function(){return _.Wv},post_message_ix:function(){return _.kX},post_vaa_ix:function(){return _.Eb},set_fees_ix:function(){return _._0},state_address:function(){return _.IY},transfer_fees_ix:function(){return _.OZ},update_guardian_set_ix:function(){return _.AX},upgrade_contract_ix:function(){return _.hr},verify_signatures_ix:function(){return _.R$}});var _=t(84769),i=n([_]);_=(i.then?(await i)():i)[0],e()}catch(o){e(o)}}))},84769:function(n,r,t){t.a(n,(async function(e,_){try{t.d(r,{kX:function(){return Y},Eb:function(){return J},AX:function(){return T},_0:function(){return C},OZ:function(){return Z},hr:function(){return $},R$:function(){return z},hh:function(){return B},MK:function(){return D},IY:function(){return F},kc:function(){return G},SQ:function(){return R},V_:function(){return H},hs:function(){return L},Wv:function(){return K},S1:function(){return V},kb:function(){return v},vr:function(){return h},td:function(){return m},v0:function(){return k},Yb:function(){return A},vU:function(){return x},r1:function(){return tn},ug:function(){return en},t$:function(){return _n},EL:function(){return on},h4:function(){return un},bJ:function(){return cn},qt:function(){return an},XP:function(){return fn},M1:function(){return bn},pT:function(){return dn},Z1:function(){return sn},pt:function(){return ln},g5:function(){return gn},kq:function(){return wn},lX:function(){return pn},Ih:function(){return yn},yq:function(){return vn},gk:function(){return hn},j1:function(){return mn},o$:function(){return kn},Wl:function(){return An},Ge:function(){return xn},ID:function(){return Sn},Zn:function(){return jn},fg:function(){return On},vz:function(){return Wn},Rb:function(){return In},_3:function(){return qn},Yr:function(){return En},GW:function(){return Nn},_8:function(){return Xn},JX:function(){return Pn},PN:function(){return Un},EF:function(){return Yn},cb:function(){return Jn},Ip:function(){return Tn},Oo:function(){return Cn},Cp:function(){return Zn},fY:function(){return $n},Or:function(){return zn},oH:function(){return Mn}});var i=t(12597);n=t.hmd(n);var o=e([i]);i=(o.then?(await o)():o)[0];var u=new Array(32).fill(void 0);function S(n){return u[n]}u.push(void 0,null,!0,!1);var c=0,a=null;function j(){return null!==a&&a.buffer===i.memory.buffer||(a=new Uint8Array(i.memory.buffer)),a}var f=new("undefined"===typeof TextEncoder?(0,n.require)("util").TextEncoder:TextEncoder)("utf-8"),b="function"===typeof f.encodeInto?function(n,r){return f.encodeInto(n,r)}:function(n,r){var t=f.encode(n);return r.set(t),{read:n.length,written:t.length}};function O(n,r,t){if(void 0===t){var e=f.encode(n),_=r(e.length);return j().subarray(_,_+e.length).set(e),c=e.length,_}for(var i=n.length,o=r(i),u=j(),a=0;a<i;a++){var d=n.charCodeAt(a);if(d>127)break;u[o+a]=d}if(a!==i){0!==a&&(n=n.slice(a)),o=t(o,i,i=a+3*n.length);var s=j().subarray(o+a,o+i);a+=b(n,s).written}return c=a,o}var d=null;function W(){return null!==d&&d.buffer===i.memory.buffer||(d=new Int32Array(i.memory.buffer)),d}var s=u.length;function I(n){n<36||(u[n]=s,s=n)}function q(n){var r=S(n);return I(n),r}var l=new("undefined"===typeof TextDecoder?(0,n.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});function E(n,r){return l.decode(j().subarray(n,n+r))}function N(n){s===u.length&&u.push(u.length+1);var r=s;return s=u[r],u[r]=n,r}function X(n){return void 0===n||null===n}l.decode();var g=null;function P(n){var r=typeof n;if("number"==r||"boolean"==r||null==n)return""+n;if("string"==r)return'"'+n+'"';if("symbol"==r){var t=n.description;return null==t?"Symbol":"Symbol("+t+")"}if("function"==r){var e=n.name;return"string"==typeof e&&e.length>0?"Function("+e+")":"Function"}if(Array.isArray(n)){var _=n.length,i="[";_>0&&(i+=P(n[0]));for(var o=1;o<_;o++)i+=", "+P(n[o]);return i+="]"}var u,c=/\[object ([^\]]+)\]/.exec(toString.call(n));if(!(c.length>1))return toString.call(n);if("Object"==(u=c[1]))try{return"Object("+JSON.stringify(n)+")"}catch(a){return"Object"}return n instanceof Error?n.name+": "+n.message+"\n"+n.stack:u}function U(n,r){var t=r(1*n.length);return j().set(n,t/1),c=n.length,t}function Y(n,r,t,e,_,o,u){var a=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),f=c,b=O(r,i.__wbindgen_malloc,i.__wbindgen_realloc),d=c,s=O(t,i.__wbindgen_malloc,i.__wbindgen_realloc),l=c,g=O(e,i.__wbindgen_malloc,i.__wbindgen_realloc),w=c,p=U(o,i.__wbindgen_malloc),y=c,v=O(u,i.__wbindgen_malloc,i.__wbindgen_realloc),h=c;return q(i.post_message_ix(a,f,b,d,s,l,g,w,_,p,y,v,h))}function J(n,r,t,e){var _=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),o=c,u=O(r,i.__wbindgen_malloc,i.__wbindgen_realloc),a=c,f=O(t,i.__wbindgen_malloc,i.__wbindgen_realloc),b=c,d=U(e,i.__wbindgen_malloc),s=c;return q(i.post_vaa_ix(_,o,u,a,f,b,d,s))}function T(n,r,t){var e=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),_=c,o=O(r,i.__wbindgen_malloc,i.__wbindgen_realloc),u=c,a=U(t,i.__wbindgen_malloc),f=c;return q(i.update_guardian_set_ix(e,_,o,u,a,f))}function C(n,r,t){var e=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),_=c,o=O(r,i.__wbindgen_malloc,i.__wbindgen_realloc),u=c,a=U(t,i.__wbindgen_malloc),f=c;return q(i.set_fees_ix(e,_,o,u,a,f))}function Z(n,r,t){var e=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),_=c,o=O(r,i.__wbindgen_malloc,i.__wbindgen_realloc),u=c,a=U(t,i.__wbindgen_malloc),f=c;return q(i.transfer_fees_ix(e,_,o,u,a,f))}function $(n,r,t,e){var _=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),o=c,u=O(r,i.__wbindgen_malloc,i.__wbindgen_realloc),a=c,f=O(t,i.__wbindgen_malloc,i.__wbindgen_realloc),b=c,d=U(e,i.__wbindgen_malloc),s=c;return q(i.upgrade_contract_ix(_,o,u,a,f,b,d,s))}function z(n,r,t,e,_,o){var u=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),a=c,f=O(r,i.__wbindgen_malloc,i.__wbindgen_realloc),b=c,d=O(_,i.__wbindgen_malloc,i.__wbindgen_realloc),s=c,l=U(o,i.__wbindgen_malloc),g=c;return q(i.verify_signatures_ix(u,a,f,b,t,N(e),d,s,l,g))}function M(n,r){return j().subarray(n/1,n/1+r)}function B(n,r){try{var t=i.__wbindgen_add_to_stack_pointer(-16),e=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),_=c;i.guardian_set_address(t,e,_,r);var o=W()[t/4+0],u=W()[t/4+1],a=M(o,u).slice();return i.__wbindgen_free(o,1*u),a}finally{i.__wbindgen_add_to_stack_pointer(16)}}function D(n){var r=U(n,i.__wbindgen_malloc),t=c;return q(i.parse_guardian_set(r,t))}function F(n){try{var r=i.__wbindgen_add_to_stack_pointer(-16),t=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),e=c;i.state_address(r,t,e);var _=W()[r/4+0],o=W()[r/4+1],u=M(_,o).slice();return i.__wbindgen_free(_,1*o),u}finally{i.__wbindgen_add_to_stack_pointer(16)}}function G(n){var r=U(n,i.__wbindgen_malloc),t=c;return q(i.parse_state(r,t))}function R(n){try{var r=i.__wbindgen_add_to_stack_pointer(-16),t=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),e=c;i.fee_collector_address(r,t,e);var _=W()[r/4+0],o=W()[r/4+1],u=M(_,o).slice();return i.__wbindgen_free(_,1*o),u}finally{i.__wbindgen_add_to_stack_pointer(16)}}function H(n,r){try{var t=i.__wbindgen_add_to_stack_pointer(-16),e=O(n,i.__wbindgen_malloc,i.__wbindgen_realloc),_=c,o=U(r,i.__wbindgen_malloc),u=c;i.claim_address(t,e,_,o,u);var a=W()[t/4+0],f=W()[t/4+1],b=M(a,f).slice();return i.__wbindgen_free(a,1*f),b}finally{i.__wbindgen_add_to_stack_pointer(16)}}function L(n){var r=U(n,i.__wbindgen_malloc),t=c;return q(i.parse_posted_message(r,t))}function K(n){var r=U(n,i.__wbindgen_malloc),t=c;return q(i.parse_vaa(r,t))}function Q(n,r){if(!(n instanceof r))throw new Error("expected instance of "+r.name);return n.ptr}function V(){i.init()}var w=new Uint32Array(2),p=new BigUint64Array(w.buffer),y=null;function nn(n,r){for(var t=r(4*n.length),e=(null!==y&&y.buffer===i.memory.buffer||(y=new Uint32Array(i.memory.buffer)),y),_=0;_<n.length;_++)e[t/4+_]=N(n[_]);return c=n.length,t}function rn(n,r){try{return n.apply(this,r)}catch(t){i.__wbindgen_exn_store(N(t))}}var v=function(){function n(r){try{var t=i.__wbindgen_add_to_stack_pointer(-16);i.hash_constructor(t,N(r));var e=W()[t/4+0],_=W()[t/4+1];if(W()[t/4+2])throw q(_);return n.__wrap(e)}finally{i.__wbindgen_add_to_stack_pointer(16)}}return n.__wrap=function(r){var t=Object.create(n.prototype);return t.ptr=r,t},n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();i.__wbg_hash_free(n)},n.prototype.toString=function(){try{var n=i.__wbindgen_add_to_stack_pointer(-16);i.hash_toString(n,this.ptr);var r=W()[n/4+0],t=W()[n/4+1];return E(r,t)}finally{i.__wbindgen_add_to_stack_pointer(16),i.__wbindgen_free(r,t)}},n.prototype.equals=function(r){return Q(r,n),0!==i.hash_equals(this.ptr,r.ptr)},n.prototype.toBytes=function(){try{var n=i.__wbindgen_add_to_stack_pointer(-16);i.hash_toBytes(n,this.ptr);var r=W()[n/4+0],t=W()[n/4+1],e=M(r,t).slice();return i.__wbindgen_free(r,1*t),e}finally{i.__wbindgen_add_to_stack_pointer(16)}},n}(),h=function(){function n(){}return n.__wrap=function(r){var t=Object.create(n.prototype);return t.ptr=r,t},n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();i.__wbg_instruction_free(n)},n}(),m=function(){function n(){var r=i.instructions_constructor();return n.__wrap(r)}return n.__wrap=function(r){var t=Object.create(n.prototype);return t.ptr=r,t},n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();i.__wbg_instructions_free(n)},n.prototype.push=function(n){Q(n,h);var r=n.ptr;n.ptr=0,i.instructions_push(this.ptr,r)},n}(),k=function(){function n(){}return n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();i.__wbg_message_free(n)},Object.defineProperty(n.prototype,"recent_blockhash",{get:function(){var n=i.__wbg_get_message_recent_blockhash(this.ptr);return v.__wrap(n)},set:function(n){Q(n,v);var r=n.ptr;n.ptr=0,i.__wbg_set_message_recent_blockhash(this.ptr,r)},enumerable:!1,configurable:!0}),n}(),A=function(){function n(r){try{var t=i.__wbindgen_add_to_stack_pointer(-16);i.pubkey_constructor(t,N(r));var e=W()[t/4+0],_=W()[t/4+1];if(W()[t/4+2])throw q(_);return n.__wrap(e)}finally{i.__wbindgen_add_to_stack_pointer(16)}}return n.__wrap=function(r){var t=Object.create(n.prototype);return t.ptr=r,t},n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){var n=this.__destroy_into_raw();i.__wbg_pubkey_free(n)},n.prototype.toString=function(){try{var n=i.__wbindgen_add_to_stack_pointer(-16);i.pubkey_toString(n,this.ptr);var r=W()[n/4+0],t=W()[n/4+1];return E(r,t)}finally{i.__wbindgen_add_to_stack_pointer(16),i.__wbindgen_free(r,t)}},n.prototype.isOnCurve=function(){return 0!==i.pubkey_isOnCurve(this.ptr)},n.prototype.equals=function(r){return Q(r,n),0!==i.pubkey_equals(this.ptr,r.ptr)},n.prototype.toBytes=function(){try{var n=i.__wbindgen_add_to_stack_pointer(-16);i.pubkey_toBytes(n,this.ptr);var r=W()[n/4+0],t=W()[n/4+1],e=M(r,t).slice();return i.__wbindgen_free(r,1*t),e}finally{i.__wbindgen_add_to_stack_pointer(16)}},n.createWithSeed=function(r,t,e){try{var _=i.__wbindgen_add_to_stack_pointer(-16);Q(r,n);var o=O(t,i.__wbindgen_malloc,i.__wbindgen_realloc),u=c;Q(e,n),i.pubkey_createWithSeed(_,r.ptr,o,u,e.ptr);var a=W()[_/4+0],f=W()[_/4+1];if(W()[_/4+2])throw q(f);return n.__wrap(a)}finally{i.__wbindgen_add_to_stack_pointer(16)}},n.createProgramAddress=function(r,t){try{var e=i.__wbindgen_add_to_stack_pointer(-16),_=nn(r,i.__wbindgen_malloc),o=c;Q(t,n),i.pubkey_createProgramAddress(e,_,o,t.ptr);var u=W()[e/4+0],a=W()[e/4+1];if(W()[e/4+2])throw q(a);return n.__wrap(u)}finally{i.__wbindgen_add_to_stack_pointer(16)}},n.findProgramAddress=function(r,t){try{var e=i.__wbindgen_add_to_stack_pointer(-16),_=nn(r,i.__wbindgen_malloc),o=c;Q(t,n),i.pubkey_findProgramAddress(e,_,o,t.ptr);var u=W()[e/4+0],a=W()[e/4+1];if(W()[e/4+2])throw q(a);return q(u)}finally{i.__wbindgen_add_to_stack_pointer(16)}},n}(),x=function(){function n(){}return n.prototype.__destroy_into_raw=function(){var n=this.ptr;return this.ptr=0,n},n.prototype.free=function(){this.__destroy_into_raw()},n.createAccount=function(n,r,t,e,_){Q(n,A),Q(r,A),p[0]=t;var o=w[0],u=w[1];p[0]=e;var c=w[0],a=w[1];Q(_,A);var f=i.systeminstruction_createAccount(n.ptr,r.ptr,o,u,c,a,_.ptr);return h.__wrap(f)},n.createAccountWithSeed=function(n,r,t,e,_,o,u){Q(n,A),Q(r,A),Q(t,A);var a=O(e,i.__wbindgen_malloc,i.__wbindgen_realloc),f=c;p[0]=_;var b=w[0],d=w[1];p[0]=o;var s=w[0],l=w[1];Q(u,A);var g=i.systeminstruction_createAccountWithSeed(n.ptr,r.ptr,t.ptr,a,f,b,d,s,l,u.ptr);return h.__wrap(g)},n.assign=function(n,r){Q(n,A),Q(r,A);var t=i.systeminstruction_assign(n.ptr,r.ptr);return h.__wrap(t)},n.assignWithSeed=function(n,r,t,e){Q(n,A),Q(r,A);var _=O(t,i.__wbindgen_malloc,i.__wbindgen_realloc),o=c;Q(e,A);var u=i.systeminstruction_assignWithSeed(n.ptr,r.ptr,_,o,e.ptr);return h.__wrap(u)},n.transfer=function(n,r,t){Q(n,A),Q(r,A),p[0]=t;var e=w[0],_=w[1],o=i.systeminstruction_transfer(n.ptr,r.ptr,e,_);return h.__wrap(o)},n.transferWithSeed=function(n,r,t,e,_,o){Q(n,A),Q(r,A);var u=O(t,i.__wbindgen_malloc,i.__wbindgen_realloc),a=c;Q(e,A),Q(_,A),p[0]=o;var f=w[0],b=w[1],d=i.systeminstruction_transferWithSeed(n.ptr,r.ptr,u,a,e.ptr,_.ptr,f,b);return h.__wrap(d)},n.allocate=function(n,r){Q(n,A),p[0]=r;var t=w[0],e=w[1],_=i.systeminstruction_allocate(n.ptr,t,e);return h.__wrap(_)},n.allocateWithSeed=function(n,r,t,e,_){Q(n,A),Q(r,A);var o=O(t,i.__wbindgen_malloc,i.__wbindgen_realloc),u=c;p[0]=e;var a=w[0],f=w[1];Q(_,A);var b=i.systeminstruction_allocateWithSeed(n.ptr,r.ptr,o,u,a,f,_.ptr);return h.__wrap(b)},n.createNonceAccount=function(n,r,t,e){Q(n,A),Q(r,A),Q(t,A),p[0]=e;var _=w[0],o=w[1];return q(i.systeminstruction_createNonceAccount(n.ptr,r.ptr,t.ptr,_,o))},n.advanceNonceAccount=function(n,r){Q(n,A),Q(r,A);var t=i.systeminstruction_advanceNonceAccount(n.ptr,r.ptr);return h.__wrap(t)},n.withdrawNonceAccount=function(n,r,t,e){Q(n,A),Q(r,A),Q(t,A),p[0]=e;var _=w[0],o=w[1],u=i.systeminstruction_withdrawNonceAccount(n.ptr,r.ptr,t.ptr,_,o);return h.__wrap(u)},n.authorizeNonceAccount=function(n,r,t){Q(n,A),Q(r,A),Q(t,A);var e=i.systeminstruction_authorizeNonceAccount(n.ptr,r.ptr,t.ptr);return h.__wrap(e)},n}();function tn(n,r){var t=S(r),e=O(JSON.stringify(void 0===t?null:t),i.__wbindgen_malloc,i.__wbindgen_realloc),_=c;W()[n/4+1]=_,W()[n/4+0]=e}function en(n){q(n)}function _n(n,r){return N(JSON.parse(E(n,r)))}function on(n){return N(h.__wrap(n))}function un(n,r){return N(E(n,r))}function cn(n){return N(A.__wrap(n))}function an(n,r){var t=S(r),e="string"===typeof t?t:void 0,_=X(e)?0:O(e,i.__wbindgen_malloc,i.__wbindgen_realloc),o=c;W()[n/4+1]=o,W()[n/4+0]=_}function fn(n){return void 0===S(n)}function bn(n,r){var t=S(r),e="number"===typeof t?t:void 0;(null!==g&&g.buffer===i.memory.buffer||(g=new Float64Array(i.memory.buffer)),g)[n/8+1]=X(e)?0:e,W()[n/4+0]=!X(e)}function dn(n){return N(n)}function sn(n){console.debug(S(n))}function ln(n){console.error(S(n))}function gn(n){console.info(S(n))}function wn(n){console.log(S(n))}function pn(n){console.warn(S(n))}function yn(){return N(new Error)}function vn(n,r){var t=O(S(r).stack,i.__wbindgen_malloc,i.__wbindgen_realloc),e=c;W()[n/4+1]=e,W()[n/4+0]=t}function hn(n,r){try{console.error(E(n,r))}finally{i.__wbindgen_free(n,r)}}function mn(){return N(new Array)}function kn(n){return"function"===typeof S(n)}function An(n){var r=S(n);return"object"===typeof r&&null!==r}function xn(n){return N(S(n).next)}function Sn(){return rn((function(n){return N(S(n).next())}),arguments)}function jn(n){return S(n).done}function On(n){return N(S(n).value)}function Wn(){return N(Symbol.iterator)}function In(){return rn((function(n,r){return N(Reflect.get(S(n),S(r)))}),arguments)}function qn(){return rn((function(n,r){return N(S(n).call(S(r)))}),arguments)}function En(n){return N(new Array(n>>>0))}function Nn(n,r,t){S(n)[r>>>0]=q(t)}function Xn(n){return Array.isArray(S(n))}function Pn(n,r){return S(n).push(S(r))}function Un(n){return N(S(n).values())}function Yn(n){return N(S(n).buffer)}function Jn(n){return N(new Uint8Array(S(n)))}function Tn(n,r,t){S(n).set(S(r),t>>>0)}function Cn(n){return S(n).length}function Zn(n){return S(n)instanceof Uint8Array}function $n(n,r){var t=O(P(S(r)),i.__wbindgen_malloc,i.__wbindgen_realloc),e=c;W()[n/4+1]=e,W()[n/4+0]=t}function zn(n,r){throw new Error(E(n,r))}function Mn(){return N(i.memory)}_()}catch(S){_(S)}}))},12597:function(n,r,t){t.a(n,(async function(e,_){try{var i,o=e([i=t(84769)]),[i]=o.then?(await o)():o;await t.v(r,n.id,"b45dacd6463014309c83",{"./bridge_bg.js":{__wbindgen_json_serialize:i.r1,__wbindgen_object_drop_ref:i.ug,__wbindgen_json_parse:i.t$,__wbg_instruction_new:i.EL,__wbindgen_string_new:i.h4,__wbg_pubkey_new:i.bJ,__wbindgen_string_get:i.qt,__wbindgen_is_undefined:i.XP,__wbindgen_number_get:i.M1,__wbindgen_number_new:i.pT,__wbg_debug_fda1f49ea6af7a1d:i.Z1,__wbg_error_8ff19d586a987aef:i.pt,__wbg_info_c8f1b00be4ef10bc:i.g5,__wbg_log_e8ba7b992c7ad0eb:i.kq,__wbg_warn_0227db1aa6989248:i.lX,__wbg_new_693216e109162396:i.Ih,__wbg_stack_0ddaca5d1abfb52f:i.yq,__wbg_error_09919627ac0992f5:i.gk,__wbg_new_94fb1279cf6afea5:i.j1,__wbindgen_is_function:i.o$,__wbindgen_is_object:i.Wl,__wbg_next_cabb70b365520721:i.Ge,__wbg_next_bf3d83fc18df496e:i.ID,__wbg_done_040f966faa9a72b3:i.Zn,__wbg_value_419afbd9b9574c4c:i.fg,__wbg_iterator_4832ef1f15b0382b:i.vz,__wbg_get_a9cab131e3152c49:i.Rb,__wbg_call_ae78342adc33730a:i._3,__wbg_newwithlength_e80fb11cf19c1628:i.Yr,__wbg_set_561aac756158708c:i.GW,__wbg_isArray_6721f2e508996340:i._8,__wbg_push_40c6a90f1805aa90:i.JX,__wbg_values_b1b9e8c63dbe01c2:i.PN,__wbg_buffer_7af23f65f6c64548:i.EF,__wbg_new_cc9018bd6f283b6f:i.cb,__wbg_set_f25e869e4565d2a2:i.Ip,__wbg_length_0acb1cf9bbaf8519:i.Oo,__wbg_instanceof_Uint8Array_edb92795fc0c63b4:i.Cp,__wbindgen_debug_string:i.fY,__wbindgen_throw:i.Or,__wbindgen_memory:i.oH}}),_()}catch(u){_(u)}}),1)}}]);
//# sourceMappingURL=877.0cf70529.chunk.js.map
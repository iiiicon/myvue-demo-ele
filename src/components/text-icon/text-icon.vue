<template>
	<!--<span v-show="item.type > 0" class="icon" :class="classMap[item.type]">-->
		<span class="icon" v-show="item.type>=0" :class="[classMap[item.type], sizeClass]" ></span>
	</span>
</template>

<script type="text/emacscript-6">
export default {
	props: {
		item: {
			type: Object
		},
		sizeClass: {
			type: String,
			default: 'big'
		}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	},
	computed() {

	}
};

</script>
<style lang="stylus">
	@import '../../common/stylus/mixin.styl';

	.icon
		display: inline-block
		vertical-align: top
		&.small
			width: 12px
			height: 12px
			margin-right: 2px
			background-size: 12px 12px
			background-repeat: no-repeat
		&.decrease.small
			bg-image('./images/decrease_3')
		&.discount.small
			bg-image('./images/discount_3')
		&.guarantee.small
			bg-image('./images/guarantee_3')
		&.invoice.small
			bg-image('./images/invoice_3')
		&.special.small
			bg-image('./images/special_3')
		&.w16
			width: 16px
			height: 16px
			margin-right: 6px
			background-size: 16px 16px
			background-repeat: no-repeat	
		&.decrease.w16
			bg-image('./images/decrease_4')
		&.discount.w16
			bg-image('./images/discount_4')
		&.guarantee.w16
			bg-image('./images/guarantee_4')
		&.invoice.w16
			bg-image('./images/invoice_4')
		&.special.w16
			bg-image('./images/special_4')
</style>


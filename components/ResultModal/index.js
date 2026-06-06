Component({
  properties: {
    visible: Boolean,
    title: {
      type: String,
      value: "结果"
    },
    content: String,
    confirmText: {
      type: String,
      value: "知道了"
    },
    showCancel: Boolean,
    cancelText: {
      type: String,
      value: "取消"
    }
  },
  methods: {
    handleConfirm() {
      this.triggerEvent("confirm")
    },
    handleCancel() {
      this.triggerEvent("cancel")
    }
  }
})

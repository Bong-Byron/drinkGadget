Component({
  properties: {
    text: String,
    type: {
      type: String,
      value: "primary"
    },
    disabled: Boolean
  },
  methods: {
    handleTap() {
      if (this.data.disabled) return
      this.triggerEvent("tap")
    }
  }
})

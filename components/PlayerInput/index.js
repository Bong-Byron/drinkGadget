Component({
  properties: {
    title: {
      type: String,
      value: "玩家名单"
    },
    placeholder: {
      type: String,
      value: "每行输入一个玩家昵称"
    },
    min: {
      type: Number,
      value: 2
    },
    max: {
      type: Number,
      value: 12
    }
  },
  data: {
    value: "",
    names: []
  },
  methods: {
    handleInput(event) {
      const value = event.detail.value
      const names = value
        .split(/[\n,，、\s]+/)
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, this.data.max)
      this.setData({ value, names })
      this.triggerEvent("change", { names, value })
    }
  }
})

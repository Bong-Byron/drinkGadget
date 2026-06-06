Component({
  properties: {
    icon: String,
    iconPath: String,
    title: String,
    desc: String,
    path: String
  },
  methods: {
    handleTap() {
      this.triggerEvent("select", {
        path: this.data.path,
        title: this.data.title
      })
    }
  }
})

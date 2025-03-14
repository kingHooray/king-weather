const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 保存代码时，是否要触发 ESLint 检查。
    lintOnSave: false,
})

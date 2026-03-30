function limitRequest(urls= [], limit = 5) {
    return new Promise((resolve, reject) => {
        if (urls.length === 0) {
            resolve([])
            return
        }
        const total = urls.length
        let currentIndex = 0
        let completedCount = 0
        const results = []
        const run = async () => {
            if (currentIndex >= total) return
            const index = currentIndex++
            const url = urls[index]

            try {
                const res = await axios.post(url)
                results[index] = { success: true, data: res}
            } catch (err) {
                results[index] = {success: false, error: err}
            } finally {
                completedCount++
                if (completedCount === total) {
                    resolve(results)
                } else {
                    run()
                }
            }
        }

        for (let i = 0; i < limit; i++) {
            run()
        }
    })
}
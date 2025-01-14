import * as core from '@actions/core'
import * as github from '@actions/github'

const token = core.getInput('token')
const client = new github.GitHub(token)

async function main() {
    var baseBranch = 'develop'
    console.log(`Merging ${baseBranch} into branches with open pull requests`)
    const pullsResponse = await client.pulls.list({
        ...github.context.repo,
        base: baseBranch,
        state: 'open',
    })
    const prs = pullsResponse.data
    console.log(`Got ${prs.length} branches to update`)
    prs.forEach(function (pr) {
        console.log(pr)
    })
    await Promise.all(
        prs.map((pr) => {
            client.pulls.updateBranch({
                ...github.context.repo,
                pull_number: pr.number,
            })
        }),
    )
}

main()

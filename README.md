# Gol Ya Pooch

A static championship archive with freestyle and traditional Olympic standings, player portraits, and game results. Open `index.html` for an offline preview.

## Publish on GitHub Pages

1. Extract this ZIP. Upload its contents to the top level of your GitHub repository and commit to `main`. Keep the `assets` folder intact. You should see `index.html` on the repository's main file list.
2. Open **Settings → Pages**. Choose **Deploy from a branch**, select **main** and **/(root)**, then click **Save**.
3. After deployment finishes, open the site link in **Settings → Pages**. Later commits to the selected branch update the site automatically.

## Update the archive

- Edit the freestyle scores in `archive.js` in Efe, Amir, Sina order. The earlier championship is recorded separately with Sina as the winner and its score unavailable.
- Enter Olympic scores as pairs of points scored and conceded under the respective player's name.
- The podiums and player stats use those records. Update the featured title count and freestyle recap in `index.html` when adding championships.

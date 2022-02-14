import searchService from '../services/searchService';

const searchController = {
    //search
    handleSearch: async (req, res) => {
        try {
            let { keyword, priceFrom, priceTo } = req.query;
            let info = await searchService.search(keyword, priceFrom, priceTo);
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Success',
                info
            })
        } catch (err) {
            return res.status(500).json({
                errCode: 1,
                errMessage: 'Server error',
            })
        }
    },

}

module.exports = searchController

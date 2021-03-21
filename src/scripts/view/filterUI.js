class FilterUI {
    constructor(NewsList) {
        this.newsListUI = new NewsList();
        this.form = document.forms['form'];
        this.endpointSelect = this.form.elements['endpoint'];
        this.countrySelect = this.form.elements['country'];
        this.languageSelect = this.form.elements['language'];
        this.sortBySelect = this.form.elements['sortBy'];
        this.categorySelect = this.form.elements['category'];
        this.qInput = this.form.elements['q'];
        this.fromInput = this.form.elements['from']
        this.toInput = this.form.elements['to']
        this.endpoint = null;
        this.formArea = null;
        this.init()
    }



    init() {
        this.endpointSelect.addEventListener('change', this.onChangeEndpointSelect);
        this.showCurrentFilters();
        this.form.addEventListener('submit', this.onSubmitHandler);
        this.fromInput.addEventListener('change', this.onDateChangeHandler);
        this.toInput.addEventListener('change', this.onDateChangeHandler);
    }

    onDateChangeHandler({target}) {
        const minDate = new Date(new Date().getTime() - 2419200000);
        const maxDate = new Date().getTime();
        const currentDate = new Date(this.value).getTime();

        if(currentDate < minDate){
            this.value = new Date(minDate).toISOString().split('T')[0]
        } else if(currentDate > maxDate) {
            this.value = new Date(maxDate).toISOString().split('T')[0]
        }
    }

    onChangeEndpointSelect = () => {
        this.showCurrentFilters()
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(this.toValueInput, this.fromValueInput)
        this.newsListUI.renderNewsArticles(this.endpoint, this.getDataToRequest())

    }

    getDataToRequest() {
        return this.endpoint === 'everything'
            ?
            this.getQueryEverythingToRequest()
            :
            this.getQueryTopHeadlinesToRequest()
    }

    getQueryEverythingToRequest() {
        return {
            language: this.languageValue,
            sortBy: this.sortValue,
            q: this.qValue
        }
    }


    getQueryTopHeadlinesToRequest() {
        return {
            category: this.categoryValue,
            q: this.qValue,
            country: this.countryValue
        }
    }

    showCurrentFilters() {
        this.endpoint = this.endpointValue;
        Array.prototype.slice.call(this.form.elements)
            .filter(el => el.dataset.endpoint)
            .forEach(el => {
                if (el.dataset.endpoint == this.endpoint) {
                    el.parentElement.classList.remove('hidden')
                } else {
                    el.parentElement.classList.add('hidden')
                }
            })
    }

    get endpointValue() {
        return this.endpointSelect.value
    }

    get countryValue() {
        return this.countrySelect.value
    }

    get languageValue() {
        return this.languageSelect.value
    }

    get sortValue() {
        return this.sortBySelect.value
    }

    get fromValueInput() {
        return this.fromInput.value
    }

    get toValueInput() {
        return this.toInput.value
    }

    get categoryValue() {
        return this.categorySelect.value
    }

    get qValue() {
        return this.qInput.value
    }
}

export default FilterUI
const DEFAULT_IMAGE = '/../img/cantfind.jpg';

export const productsCategory = {
    1: '견과류',
    2: '음료',
    3: '스포츠',
    4: '화장품',
    5: '컴퓨터',
};

const productStore = {

    _product: [
        { 'id': 1, 'title': '가온 호두', 'categoryId': '1', 'categoryName': '견과류', 'detail': '호두는 가온호두!', 'img': '/../img/nut.jpg', 'price': '10000' },
        { 'id': 2, 'title': '건강담은 고소한 견과', 'categoryId': '1', 'categoryName': '견과류', 'detail': '건강을 담은 고소한 견과입니다.', 'img': '/../img/nut2.jpg', 'price': '15000' },
        { 'id': 3, 'title': '김동곤 명인 티백', 'categoryId': '2', 'img': '/../img/tea.jpg', 'categoryName': '음료', 'detail': '종류별로 드실 수 있습니다', 'price': '10000' },
        { 'id': 4, 'title': '카카오 킥보드', 'categoryId': '3', 'img': '/../img/kickboard.jpg', 'categoryName': '스포츠', 'detail': '씽씽~', 'price': '100000' },
        { 'id': 5, 'title': '비첩 자생 에센스', 'categoryId': '4', 'img': '/../img/cosmetic.png', 'categoryName': '화장품', 'detail': '피부가 점점 좋아지고있어요', 'price': '50000' },
        { 'id': 6, 'title': 'SSD', 'categoryId': '5', 'img': '/../img/삼성.jpg', 'categoryName': '컴퓨터', 'detail': '가볍고 빨라~', 'price': '40000' },
        { 'id': 7, 'title': '농구공', 'categoryId': '3', 'img': '/../img/농구공.png', 'categoryName': '스포츠', 'detail': '프로들이 사용하는 농구공입니다.', 'price': '80000' },
        { 'id': 8, 'title': '조던 농구화', 'categoryId': '3', 'img': '/../img/농구화.jpg', 'categoryName': '스포츠', 'detail': '조던 농구화!!!!', 'price': '180000' },
    ],

    get products() {
        return this._product;
    },

    getProduct(id) {
        return this.products.find(product => product.id == id);
    },

    getProductTitle(title) {
        return this.products.find(product => product.title == title);
    },

    createProduct({ title, categoryId, categoryName, detail, img, price }) {
        this._product = [
            ...this._product,
            {
                id: this._product.length + 1,
                title,
                categoryId,
                categoryName,
                detail,
                img: DEFAULT_IMAGE,
                price,
            }
        ];
    },
};

export const cartList = {
    
    _cartList : [],

    get cartLists() {
        return this._cartList;
    },

    setCartLists(cartListArray) { // 전체 장바구니 리스트 반환
        return this._cartList = cartListArray;
    },

    setCartListPurchase(id) {   // 구매 할 상품인지
        return this._cartList[id-1].purchase = !this._cartList[id-1].purchase; 
    },

    createCartList(productId, title, categoryId, categoryName, img, price) {
        this._cartList = [
            ...this._cartList,
            {
                id: this._cartList.length + 1,
                productId,
                title,
                categoryId,
                categoryName,
                img,
                price,
                purchase : true,
            }
        ];
    }
}

export default productStore;
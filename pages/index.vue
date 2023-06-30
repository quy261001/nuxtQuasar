<template>
    <q-table class="table-main" bordered title="PRODUCT" :rows="rows" :columns="columns" row-key="id" :loading="isLoading"
        flat v-model:selected="selected" selection="multiple">
        <template #body-cell-image="props">
            <td class="flex items-center">
                <q-img :loading="true" :src="props.value" alt="Product Image" class="product-image " />
            </td>
        </template>

    </q-table>
    <q-card class="p-5 flex justify-end space-x-5">
        <q-btn color="primary" label="Save" :disable="isDisable" @click="showDialog = true" />
        <q-btn @click="handleCancel" color="primary" label="Cancel" :disable="isDisable" />
    </q-card>
    <q-dialog v-model="showDialog">
        <q-card class="p-2 min-w-[1/2]">
            <div class="text-end">
                <q-btn @click="showDialog = false" icon="close" flat></q-btn>
            </div>
            <h4 class="text-[#ff1a75] text-[42px] font-bold text-center pb-5">Thông tin Sản Phẩm</h4>
            <q-separator inset></q-separator>
            <q-card-section class="border-b border-[#ccc]" v-for="item in selected">
                <div class="grid grid-cols-2">
                    <q-img class="image-dialog w-full m-x-auto m-y-0" :src="item.image" />
                    <div class="infoProduct flex flex-col gap-5">
                        <p><span>Title: </span>{{ item.title }}</p>
                        <p><span>Category: </span>{{ item.category }}</p>
                        <p><span>Price: </span>{{ item.price }}$</p>
                        <p><span>Count: </span> {{ item.rating.count }}</p>
                        <p class="flex items-center gap-2"><span>Rate:</span><q-rating disable color="yellow" size="sm" v-model="item.rating.rate"></q-rating></p>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions class="justify-end">
                <q-btn color="primary" label="accept"></q-btn>
                <q-btn color="primary" label="cancel"></q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
  
<script setup>
const isLoading = ref(true);
const selected = ref()
const showDialog = ref(false)
let { data: product } = useAsyncData('product', () => $fetch('https://fakestoreapi.com/products'));

const isDisable = computed(() => {
    return selected.value?.length ? false : true
})
const handleCancel = () => {
    selected.value = [];
}
const columns = reactive([
    {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: true
    },
    {
        name: 'title',
        required: true,
        label: 'Title',
        align: 'left',
        field: 'title',
        sortable: true
    },
    {
        name: 'price',
        required: true,
        label: 'Price',
        align: 'left',
        field: 'price',
        sortable: true
    },
    {
        name: 'category',
        required: true,
        label: 'Category',
        align: 'left',
        field: 'category',
        sortable: true
    },
    {
        name: 'description',
        required: true,
        label: 'Description',
        align: 'left',
        field: 'description',
        sortable: true
    },
    {
        name: 'image',
        label: 'Image',
        align: 'center',
        field: 'image',
    }
]);

const rows = reactive([]);

watchEffect(() => {
    if (product.value) {
        rows.splice(0, rows.length, ...product.value);
        isLoading.value = false;
    }
});
</script>
  
<style lang="scss">
.image-dialog {
    width: 250px;
    height: 250px;

    img {
        object-fit: contain !important;
        width: 100%;
        height: 100%;
    }
}

.infoProduct {
    p {
        font-size: 19px;
        margin: 0 !important;

        span {
            font-size: 20px;
            font-weight: 700;
        }
    }

}

.table-main {
    max-height: 70vh;

    .q-table__top {
        justify-content: center;
        border-bottom: 1px solid #000;

        .q-table__title {
            font-size: 50px;
            font-weight: 700;
        }
    }

    .q-table {
        th {
            height: 80px;
            font-size: 14px;
            font-weight: 700;
        }

        td {
            font-size: 14px;
            height: 80px;
            margin: 0 auto;
            cursor: pointer;
            max-width: 150px;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .q-table__bottom {
        font-size: 14px;
        display: flex;
    }

    .product-image img {
        object-fit: contain !important;
        margin: 0 auto;
        width: 60px;
        height: 60px;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #CCC;
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #CCC;
    }
}
</style>
  
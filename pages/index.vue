<template>
    <div>
        <q-btn color="primary" label="Settings" icon="settings" @click="showSettingsDialog = true" />
        <q-table v-table-resizable separator="vertical" class="table-main" bordered title="AirLine" :rows="rows" :columns="visibleColumns" row-key="id"
            :loading="isLoading" flat v-model:selected="selected" selection="multiple" v-model:pagination="pagination" :rows-per-page-options="[2,5,10,0]">
        </q-table>
        <q-dialog v-model="showSettingsDialog">
            <q-card class="q-pa-md min-w-[70%]">
                <q-card-section>
                    <h4 class="mb-2">Table settings</h4>
                    <h6 class="ml-4 mb-4">View columns</h6>
                    <q-option-group class="groupOption grid grid-cols-4 gap-2" v-model="tempSelectedColumns" :options="columnOptions" type="checkbox"
                        label="Select Columns" />
                </q-card-section>
                <q-card-actions align="right" class="q-mt-md">
                    <q-btn color="primary" label="Apply" @click="acceptSettings" />
                    <q-btn class="text-[#000]" label="Reset" @click="acceptSettings" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
  
<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
const isLoading = ref(true);
const selected = ref();
const pagination = ref({
    page: 1,
    rowsPerPage: 5
})
let { data: airline, refresh} = await useAsyncData(
    'airline',
    () => $fetch(`https://api.instantwebtools.net/v1/passenger?page=0&size=10`)
);

const columns = reactive([
    {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: true,
        sort: (a: number, b: number) => {
            return a - b
        }
    },
    {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: 'name',
        sortable: true
    },
    {
        name: 'country',
        required: true,
        label: 'Country',
        align: 'left',
        field: 'country',
        sortable: true
    },
    {
        name: 'slogan',
        required: true,
        label: 'Slogan',
        align: 'left',
        field: 'slogan',
        sortable: true
    },
    {
        name: 'head_quaters',
        required: true,
        label: 'Headquarters',
        align: 'left',
        field: 'head_quaters',
        sortable: true
    },
    {
        name: 'logo',
        label: 'Logo',
        align: 'center',
        field: 'logo',
        format: (value) => `${value}`
    }
]);

const rows = reactive([]);
const showSettingsDialog = ref(false);
const tempSelectedColumns = ref(columns.map(column => column.field));

const columnOptions = columns.map((column) => ({
    label: column.label,
    value: column.field,
}));
let visibleColumns = reactive([...columns])
const acceptSettings = () => {
    visibleColumns = columns.filter((column) => tempSelectedColumns.value.includes(column.field));
    showSettingsDialog.value = false;
};

watchEffect(() => {
    if (airline.value) {
        rows.splice(0, rows.length, ...airline.value.data.map((item) => item.airline[0]));
        isLoading.value = false;
    }
});
</script>
  
<style lang="scss">
.groupOption  {
    .q-checkbox__inner--truthy .q-checkbox__bg {
        background: #000;
        border: 2px solid #000;
    }
}
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
        width: 100%;
        height: 100%;
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
  
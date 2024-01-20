import EditComponent from "./Component";

const EditContainer = ({categorys, category, route}) =>{

    return (
        <EditComponent categorys={categorys} category={category} route={route} />
    );
}

export default EditContainer;
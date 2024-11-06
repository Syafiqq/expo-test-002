import {Text} from "react-native";
import {withDatabase} from "@nozbe/watermelondb/react";
import {Database} from "@nozbe/watermelondb";
import {useEffect, useState} from "react";

function TodoCatalogueCount({database}: { database: Database }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const todosCollection = database.get("todos");
    const subscription = todosCollection.query()
      .observeCount(true)
      .subscribe({
        next: count => {
          setCount(count);
        }
      })
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Text numberOfLines={1}>Count: {count}</Text>
  )
}

export default withDatabase(TodoCatalogueCount);
